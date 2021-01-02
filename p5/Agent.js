

var Agent = function() {
  this.vector = myp5.createVector(myp5.random(myp5.width), myp5.random(myp5.height));
  this.vectorOld = this.vector.copy();
  this.stepSize = myp5.random(1, 5);
  this.isOutside = false;
  this.angle;
};

Agent.prototype.update = function(strokeWidth) {

  //pezzo preso dal codice che disegnava le scritte al click del mouse, con qualche modifica
  myp5.fill(0)
   // if (myp5.mouseIsPressed && myp5.mouseButton == myp5.LEFT) {
    var d = myp5.dist(x,y, this.vector.x, this.vector.y);
    myp5.textSize(20);
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
    // }
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
  //myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
  this.vectorOld = this.vector.copy();
  this.isOutside = false;
};

Agent.prototype.update1 = function(noiseScale, noiseStrength, strokeWidth) {
  this.angle = myp5.noise(this.vector.x / noiseScale , this.vector.y / noiseScale) * noiseStrength;
  this.update(strokeWidth);
};

Agent.prototype.update2 = function(noiseScale, noiseStrength, strokeWidth) {
  this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
  this.angle = (this.angle - myp5.floor(this.angle)) * noiseStrength;
  this.update(strokeWidth);
};
