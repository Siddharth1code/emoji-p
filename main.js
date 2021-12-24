Webcam.attach('#camera');

Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");

function take_snapshot()
{
  Webcam.snap(function(data_uri) 
  { 
      document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
     });
}
console.log('ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GNwSaqcxu/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model loaded");
}

function speak()
{
    var synth= window.speechSynthesis;

    speak_data_1="first pridection"+ prediction_1;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rare=0.5;
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('selfie_image');
    classifier.classify(img, gotresults);
}

function gotresults(error,results)
{
    if(error)
        {
            console.error(error);
        }
        else
        {
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            prediction_1=results[0].label;
            speak();
            if(results[0].label == "victory")
            {
                document.getElementById("update_emoji").innerHTML ="&#9996;";
            }

            if(results[0].label == "thumbs up")
            {
                document.getElementById("update_emoji").innerHTML ="&#128077;";
            }
            
            if(results[0].label == "nice")
            {
                document.getElementById("update_emoji").innerHTML ="&#128076;";
            }

            
        }
}