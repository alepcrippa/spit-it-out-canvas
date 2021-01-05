
var font = 'Georgia';
var fontSizeMin = 4;
let mic, vol, vol_1; //Volume per dimensione lettere

class Agent{
  constructor(x0,y0){
    this.vector = myp5.createVector(x0, y0);//myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = myp5.random(1, 5);//lunghezza parola, sarebbe dasostituire con la lunghezza reale
    this.isOutside = false;
    this.angle;
    this.letterIndex = 0;
  }

update(strokeWidth) {
  //pezzo preso dal codice che disegnava le scritte al click del mouse, con qualche modifica
  myp5.fill(0)
  // mic = new p5.AudioIn();
  // mic.start();
  //
  // vol = myp5.round(mic.getLevel(), 2);
  // vol_1 = myp5.map(vol, 0, 1, 5, 100);
  //
    var d = myp5.dist(x,y, this.vector.x, this.vector.y);
      //myp5.textFont(font, fontSizeMin);
      myp5.textSize(fontSizeMin * vol_1);
    var newLetter = letters.charAt(counter);
    stepSize = myp5.textWidth(newLetter);

    if (d > stepSize) {
      var angle = myp5.atan2(myp5.mouseY - y, myp5.mouseX - x);
      x=this.vector.x;
      y=this.vector.y;
      myp5.push();
      myp5.translate(x, y);
      myp5.rotate(this.angle + myp5.random(angleDistortion));
      myp5.text(newLetter, 0, 0);
      myp5.pop();

      counter++;
      if (counter >= letters.length) counter = 0;

      x = x + myp5.cos(angle) * stepSize;
      y = y + myp5.sin(angle) * stepSize;
  }
  //

  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;
  this.isOutside = this.vector.x < 0 || this.vector.x > myp5.width || this.vector.y < 0 || this.vector.y > myp5.height;
  if (this.isOutside) {
    this.vector.set(myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
  }
  myp5.strokeWeight(strokeWidth * this.stepSize);
  this.vectorOld = this.vector.copy();
  this.isOutside = false;
};

update1(noiseScale, noiseStrength, strokeWidth) {
  this.angle = myp5.noise(this.vector.x / noiseScale , this.vector.y / noiseScale) * noiseStrength;
  this.update(strokeWidth);
};

};
