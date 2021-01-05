var x = 0;
var y = 0;
var stepSize = 5;

//var font = 'Georgia';
var letters = 'ciao'
//'Così tra questa immensità s\'annega il pensier mio: e il naufragar m\'è dolce in questo mare.'
//'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';


var angleDistortion = 0.0;
var counter = 0;

var sketch = function(p) {
  var agents = [];
  var init = 0;
  var agentCount = 1; // initial agents
  var maxAgentCount = 50; // max agents
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
    console.log(vol_1);
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
};

var myp5 = new p5(sketch);
