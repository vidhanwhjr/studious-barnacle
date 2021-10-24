var prediction = "";

Webcam.set({
    width: 300,
    height:300,
    image_format: 'png',
    png_quality: 90
})

var camera = document.getElementById("cam");
Webcam.attach('#cam');

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snap_pic' src = "+ data_uri +">"
    })
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NJDvyXZTS/model.json', Modelloaded);

function Modelloaded(){
    console.log("Model loaded!");
}

function speak(){
  var synth = window.speechSynthesis;
  speak_data = " you are" + prediction;
  var utterthis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
}

function check(){
    var Captured_image = document.getElementById("snap_pic");
    classifier.classify(Captured_image, gotresults);
}
 function gotresults(error,results){
     if (error){
         console.error(error)
     }
     else {
         prediction = results[0].label;
         document.getElementById("result_emotion").innerHTML = prediction;
         speak();

         if (prediction == "sad"){
             document.getElementById("emoji_icon").innerHTML = "&#128532;";
         }
         else if (prediction == "Smile")
        {
            document.getElementById("emoji_icon").innerHTML = "&#128522;";
        }
     }
 }