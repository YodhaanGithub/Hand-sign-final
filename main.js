Webcam.set({
    height:400,
    width: 400,
    image_formatP:'png',
    png_quality: 90
})

camera = document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JA3gr4xr1/model.json',modelLoaded);

function modelLoaded() {
           console.log("model has been loaded");
}
prediction_1 = "";
prediction_2 = "";
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is" + prediction_1;
    speak_data_2 = "and the second prediction is" + prediction_2
    var voice = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    voice.rate = 0.5;
    synth.speak(voice);
}

function check ()
{
   img = document.getElementById('captured_image');
   classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("emotion1").innerHTML = results[0].label;
        document.getElementById("emotion2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 =  results[1].label;
        speak();
        if (results[0].label == "Good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        if (results[0].label == "Not Good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078";
        }
        if (results[0].label == "Rockin")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304";
        }
        if (results[0].label == "Great")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076";
        }

        if (results[1].label == "Good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        if (results[1].label == "Not Good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078";
        }
        if (results[1].label == "Rockin")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304";
        }
        if (results[1].label == "Great")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076";
        }
    }
}