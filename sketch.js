
/**
  * KEYS
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */

let b1, b2, b3, b4;
let p;
let btn_text = 'AVANTI';
var x = 0;
var y = 0;
var stepSize = 5.0;

//impostazioni riconoscimento vocale ////
let lang = 'en-US'; //|| 'it-IT'
let speechRec = new p5.SpeechRec(lang, gotSpeech);


var letters = ' ciao '
//var letters = 'Così tra questa immensità s\'annega il pensier mio: e il naufragar m\'è dolce in questo mare.'
//'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';

var angleDistortion = 0.0;
var counter = 0;

var sketch = function(p) {
  var agents = [];
  var init = 0;
  var agentCount = 50; // initial agents
  var maxAgentCount = 100; // max agents
  var noiseScale = 500; // you can modify it to change the vorticity of the flux
  var noiseStrength = 10;
  var overlayAlpha = 5;
  var agentAlpha = 10;
  var strokeWidth = 0.3;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent(p.random(p.width), p.random(p.height));
    }

    b1 = p.createButton('inserisci pensiero');
    b1.position(p.width / 2 * 1.7, p.height / 2 * 0.1);
    b1.mousePressed(popUp);
    b1.id('startBtn');
  };

  p.draw = function() {
    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(0, agentAlpha);
    if (agentCount > maxAgentCount){
      init = agentCount - maxAgentCount;
    }
    for (var i = init; i < agentCount; i++) {
      agents[i].update1(noiseScale, noiseStrength, strokeWidth);
    }
  };

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
    console.log("clicked")
    console.log(agentCount);
    agents[agentCount-1] = new Agent(p.mouseX, p.mouseY);
  }

  function popUp() {
    p.push();
    p.rectMode('center');
    p.fill('#8a2be2');
    p.rect(p.width / 2, p.height / 2, p.width / 2.5, p.height / 2, 20)
    p.push();
    //bottone avanti
    b2 = createButton('avanti');
    b2.position(width / 2 - 80, height / 3 * 2);
    b2.mousePressed(go);
    b2.id('goBtn');
  }
};

function gotSpeech() {
  if (speechRec.resultValue) {
     let text = speechRec.resultString;
     letters = text;
    //  p.position(width/2*0.8, height/2);
    console.log(speechRec.resultString)
  }
}



var myp5 = new p5(sketch);
