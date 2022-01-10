import React, { useState, useRef, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

function App() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 800, height: 470 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const takePhoto = () => {
        let width = 804;
        let height = 460;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let myContext = photo.getContext("2d");
        myContext.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let myContext = photo.getContext("2d");
        myContext.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    };

    const downloadPhoto = () => {
        let cnv = document.getElementById("canvas");
        let dwn = document.getElementById("downloadLink");
        dwn.setAttribute("href", cnv.toDataURL("image/png", 1));
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div className="App">
            <h1>React Webcam</h1>
            <div className="camera">
                <video ref={videoRef} className="videoFrame"></video>

                <canvas
                    ref={photoRef}
                    id="canvas"
                    className={"result " + (hasPhoto ? "hasPhoto" : "")}
                ></canvas>
            </div>
            <div className="buttons">
                <button
                    className="snapButton"
                    disabled={hasPhoto ? true : false}
                    onClick={takePhoto}
                >
                    SNAP
                </button>
                <button
                    className="backButton"
                    disabled={hasPhoto ? false : true}
                    onClick={closePhoto}
                >
                    BACK
                </button>
                <button disabled={hasPhoto ? false : true}>
                    <a
                        onClick={downloadPhoto}
                        href=""
                        id="downloadLink"
                        className="downloadLink"
                        download="Webcam_Image"
                    >
                        <FiDownload />
                    </a>
                </button>
            </div>
        </div>
    );
}

export default App;
