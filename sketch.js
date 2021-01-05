// M_1_5_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * noise values (noise 2d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */


var x = 0;
var y = 0;
var stepSize = 5.0;

//var font = 'Georgia';
var letters = 'ciao'
//'Così tra questa immensità s\'annega il pensier mio: e il naufragar m\'è dolce in questo mare.'
//'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;

var sketch = function(p) {
  var agents = [];
  var init = 0;
  var agentCount = 1; // initial agents
  var maxAgentCount = 3; // max agents
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
