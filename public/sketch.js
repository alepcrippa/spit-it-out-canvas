/**

 * KEYS
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png

 */

var mycanvas

var x = 0;
var y = 0;
var stepSize = 0.01;

var font = 'typekaR';
var letters = 'ciao ';
var agents = [];
var init = 0;
var agentCount = 0; // initial agents
var maxAgentCount = 10; // max agents
var noiseScale = 500; // you can modify it to change the vorticity of the flux
var noiseStrength = 10;
var strokeWidth = 0.3;
var fontSizeMin = 14;
var overlayAlpha = 12; //quanto spariscono le scritte (scala 0-255)

//impostazioni riconoscimento vocale //
var speechRec;
var lang = 'en-US'; //|| 'it-IT'
var vol_map;
var vol2 = 1;
var spoke = false;
var vol_zero;
var vol_text=4;


//impostazioni firebase
var readData = []; //read data container
var texts;

function setup() {
  //FIREBASE SETTINGS
  database = firebase.database(); //start database
  texts = database.ref('texts'); //start collection
  //END FIREBASE SETTINGS
  mycanvas = createCanvas(windowWidth, windowHeight / 100 * 85);
  mycanvas.parent('canvas');

  speechRec = new p5.SpeechRec(lang, gotSpeech);
  mic = new p5.AudioIn();
  mic.start();

  colorMode(RGB, 150, 150, 150); //colorMode(mode, max1, max2, max3, [maxA])
  textFont(font, fontSizeMin);

  //load data from storage
  texts.once("value", gotData);
  texts.on("value", updateData); //The “value” event is triggered when changes are made to the database

  var micBtn = document.getElementById('panel').contentWindow.document.getElementById('micBtn');
  micBtn.addEventListener('mousedown', startMic);
  micBtn.addEventListener('mouseup', stopMic);

  mycanvas.mousePressed(writeOnCanvas);

  document.getElementById('panel').contentWindow.document.getElementById('arrowPanel4').addEventListener('click', closePanel) //chiudi pannello

}; //fine setup


function draw() {
  frameRate(9); // questo per far brutalmente rallentare le scritte
  // //volume
  vol = round(mic.getLevel(), 2);
  vol_map = map(vol, 0, 1, 10, 200);
   console.log("volume " + vol_map);

  // if (getAudioContext().state !== 'running') {
  //   text('non funziona audio', width / 2, height / 2);
  // } else {
  //   text('audio abilitato', width / 2, height / 2);
  // }

  //console.log("vol0 " + vol_zero);
  console.log("vol_text " + vol_text);
  if (vol_map > vol_zero+8){
    vol_text = vol_map;
    vol_zero =undefined;
     console.log("vol_map > vol_zero !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  }

  //fill('rgba(255,255,255, overlayAlpha)');
  noStroke();
  fill(255, overlayAlpha)
  rect(0, 0, width, height, overlayAlpha);

  // Draw agents
  for (var i = 0; i < agentCount; i++) {
    agents[i].update(noiseScale, noiseStrength, strokeWidth);
  }
} //fine draw;

function gotData(data) { //load data from server
  var texts = data.val(); //The val() function returns an object.
  var keys = Object.keys(texts); // Grab the keys to iterate over the object
  agentCount = keys.length;
  for (var i = 0; i < keys.length; i++) { //for each object
    var userText = texts[keys[i]]; //assign his data to var userText
    agents[i] = new Agent(userText.xPos, userText.yPos, color(userText.rCol, userText.gCol, userText.bCol), userText.letters, userText.vol_text);
  }
}

function updateData(data) { //update text list
  var texts = data.val();
  var keys = Object.keys(texts);
  agentCount = keys.length;
  for (var i = keys.length - 1; i < keys.length; i++) { //select last object
    var userText = texts[keys[i]];
    agents[i] = new Agent(userText.xPos, userText.yPos, color(userText.rCol, userText.gCol, userText.bCol), userText.letters, userText.vol_text);
  }
}


function writeOnCanvas() {
  if (spoke==true) {
  var rCol=document.getElementById('panel').contentWindow.document.getElementById('slider1').value
  var gCol=document.getElementById('panel').contentWindow.document.getElementById('slider2').value
  var bCol=document.getElementById('panel').contentWindow.document.getElementById('slider3').value

  agents[agentCount] = new Agent(mouseX, mouseY, color(rCol, gCol, bCol), letters, vol_text);
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  //write data
  var data = { //crate user data
    xPos: mouseX,
    yPos: mouseY,
    rCol: rCol,
    gCol: gCol,
    bCol: bCol,
    letters: letters,
    vol_text: vol_text
  }
  texts.push(data); //push user data to the firebase collection
  spoke = false;
  let phrase=document.getElementById('panel').contentWindow.document.getElementById('phrase');
  phrase.innerHTML=""
  phrase.style.padding= '0 0 0 0';
  }
  parent.document.getElementById('panel').style.display = 'none';
}

function startMic() {
  vol_zero = vol_map;
  console.log("listening");
  // mic.start();
  let continuous = false; //continua a registrare
  let interim = false;
  spoke = true;
  speechRec.start(continuous, interim);
  document.getElementById('panel').contentWindow.document.getElementById('micBtn').style.backgroundImage = "url('../assets/image/04.2_Mic.gif')"
}

function stopMic() {
  // speechRec.stop();
  document.getElementById('panel').contentWindow.document.getElementById('micBtn').style.backgroundImage = "url('../assets/image/04.1_Mic fermo.png')"
  console.log("stop")
}

function gotSpeech() {
  if (speechRec.resultValue) {
    let text = speechRec.resultString;
    letters = text + ' ';
    let phrase = document.getElementById('panel').contentWindow.document.getElementById('phrase');
    phrase.innerHTML = "' " + speechRec.resultString + " '"
    phrase.style.padding = '0 20px 20px 20px';
    console.log(speechRec.resultString)
    console.log("sono nella funzione gotspeech");
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('myDiaryPage', 'png');
  if (key == ' ') {
    var newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight / 100 * 85);
}

function closePanel() {
  parent.document.getElementById('panel').contentWindow.document.getElementById('avanti').setAttribute('src', '../assets/image/avanzamento-03-03.png');
  parent.document.getElementById('panel').style.display = 'none';
  location.reload()
}
