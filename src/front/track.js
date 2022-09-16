const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

const startVideo = () => {
    handTrack.startVideo(video).then(function (status) {
        if (status) {
            console.log("Video started. Now tracking")
            runDetection()
        } else {
            console.log("Please enable video")
        }
    });
}

const runDetection = () => {
    model.detect(video).then(predictions => {
        //console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
            requestAnimationFrame(runDetection);
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    console.log("Starting video")
    startVideo();
});

console.log('Loading model')

robot.setMouseDelay(2);

