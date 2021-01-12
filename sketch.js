/**
 * noise values (noise 2d) are used to animate a bunch of agents.
 *
 * KEYS
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 *
 * to do
 *
 */


var x = 0;
var y = 0;
var stepSize = 0.01;

var font = 'Georgia';
var letters = 'ciao ';
//'Così tra questa immensità s\'annega il pensier mio: e il naufragar m\'è dolce in questo mare.'
var fontSizeMin = 14;

//impostazioni riconoscimento vocale //
let lang = 'en-US'; //|| 'it-IT'
let speechRec = new p5.SpeechRec(lang, gotSpeech);
let vol_map;
let vol2 =1;

var sketch = function(p) {
  var agents = [];
  var init = 0;
  var agentCount = 0; // initial agents
  var maxAgentCount = 10; // max agents
  var noiseScale = 500; // you can modify it to change the vorticity of the flux
  var noiseStrength = 10;
  var overlayAlpha = 0.04;
  //var agentAlpha = 10;
  var strokeWidth = 0.3;


  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    mic = new p5.AudioIn();
    mic.start();


    p.colorMode(p.HSB, 360, 100, 100); //colorMode(mode, max1, max2, max3, [maxA])
    p.textFont(font, fontSizeMin);

    b1 = p.createButton('microfono');
    b1.position(p.width / 2 * 1.7, p.height / 2 * 0.1);
    b1.mousePressed(listener);
    b1.id('startBtn');



//togliere le seguenti tre righe se si vuole inserire tutti gli agents cliccando
    for (var i = 0; i < agentCount; i++) { //così ci sono già di default #agentCount agents
      agents[i] = new Agent(p.random(p.width), p.random(p.height), p.color(p.random(360), 80, 60), letters, vol_map);
    }

  };

  p.draw = function() {
    p.frameRate(9); // questo per far brutalmente rallentare le scritte
    // //volume
    vol = p.round(mic.getLevel(), 2);
    vol_map = p.map(vol, 0, 1, 1,150);
    console.log("volume " + vol_map);

    if ( p.getAudioContext().state !== 'running') {
          p.text('non funziona audio', p.width/2, p.height/2);
      } else {
        p.text('audio abilitato',  p.width/2, p.height/2);
      }


    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    if (agentCount > maxAgentCount){
      init = agentCount - maxAgentCount;
    }
    for (var i = init; i < agentCount; i++) {
      agents[i].update(noiseScale, noiseStrength, strokeWidth);
    }

  } //fine draw;

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };

  p.mouseClicked = function(){
    agentCount++;
    //console.log(agentCount + " agents");
    agents[agentCount-1] = new Agent(p.mouseX, p.mouseY, p.color(p.random(360), 80, 60), letters, vol_map);
    if (p.getAudioContext().state !== 'running') {
      p.getAudioContext().resume();
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

listener = function(){
  let continuous = true; //continua a registrare
  let interim = false;
  speechRec.start(continuous, interim);
}

}; //fine sketch

var myp5 = new p5(sketch);

function gotSpeech() {
  if (speechRec.resultValue) {
     let text = speechRec.resultString;
     letters = text + ' ';
     console.log(speechRec.resultString)
  }
}
