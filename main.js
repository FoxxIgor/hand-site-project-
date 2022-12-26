//*https://teachablemachine.withgoogle.com/models/JIKN2jDpg/model.json
result = "";
result2 = "";
Webcam.set({ //O set esta colocando alguns atributos dentro da camera.
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})
camera = document.getElementById("camera");
Webcam.attach(camera); // vai colocar a webcam na camera
function takeSnapshot(){  // coloca a foto na div photoDiv
    Webcam.snap(function(data_uri){
        document.getElementById("photoDiv").innerHTML="<img src='"+data_uri+"' id='photo'>";
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JIKN2jDpg/model.json", loaded);

function loaded(){ // fala quando foi carregado
    console.log("carregado!");
}
function check(){ // vai checar a imagem
    console.log("checando");
    img = document.getElementById("photo");
    classifier.classify(img, gotResults); // pega o modelo e pega a foto e vai para gotresults
}
function gotResults(error, results){
    if(error){ // se for error vai executar o que estiver dentro, se não for error vai executar o else
        console.error(error);
    }
    else{ // se n for error vai pr o else que vai ajustar para falar qual e a emoção
        console.log(results);
        document.getElementById("response1").innerHTML=results[0].label;
        document.getElementById("response2").innerHTML=results[1].label;
        result1=results[0].label;
        result2=results[1].label;
        if(results[0].label == "Joinha Para Baixo"){
            document.getElementById("emoji1").innerHTML="&#128078;";
        }
        else if(results[0].label == "Mão Normal"){
            document.getElementById("emoji1").innerHTML="&#9995;";
        }
        else{
            document.getElementById("emoji1").innerHTML="&#128077;";
        }

        if(results[1].label == "Joinha Para Baixo"){
            document.getElementById("emoji2").innerHTML="&#128078;";
        }
        else if(results[1].label == "Mão Normal"){
            document.getElementById("emoji2").innerHTML="&#9995;";
        }
        else{
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
    };
}