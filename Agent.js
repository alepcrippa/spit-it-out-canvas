
var font = 'Georgia';
var fontSizeMin = 4;

class Agent{
  constructor(x0,y0){
    this.vector = myp5.createVector(x0, y0);//myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = myp5.random(1, 5);//lunghezza parola, sarebbe dasostituire con la lunghezza reale 
    this.isOutside = false;
    this.angle;
  }

//QUESTO è COME DISTANZIA LE LETTERE NELL'ALTRO FILE

// Shape.prototype.draw = function() {
//   if (this.pendulumPath.length) { //SE CI SONO LE SCRITTE e quindi variabile != 0
//     noStroke();
//     fill(this.pendulumPathColor);
//     this.letterIndex = 0;
//     this.pendulumPath.forEach(function(pos, posIndex) {
//       var newLetter = letters.charAt(this.letterIndex);//?
// // tenere le tettere distanziate
// var nextPosIndex = this.pendulumPath.findIndex(function(nextPos, nextPosIndex) {
// if (nextPosIndex > posIndex) {
//   var d = p5.Vector.dist(nextPos, pos);//distanza
//   textSize(max(fontSizeMin, d));//dimensione delle lettere dipende dalla distanza tra loro
//   return d > textWidth(newLetter);
// } });
//
// var nextPos = this.pendulumPath[nextPosIndex];
//
// if (nextPos) {//scrivi la lettera vera e propria
//     var angle = atan2(nextPos.y - pos.y, nextPos.x - pos.x); //tangente
//     push();
//     translate(pos.x, pos.y);
//     rotate(angle);
//     text(newLetter, 0, 0);
//     pop();
//     this.letterIndex++;
//     if (this.letterIndex >= letters.length) {
//       this.letterIndex = 0;
//     }
//   }

update(strokeWidth) {
  //pezzo preso dal codice che disegnava le scritte al click del mouse, con qualche modifica
  myp5.fill(0)
    var d = myp5.dist(x,y, this.vector.x, this.vector.y);
      //myp5.textFont(font, fontSizeMin);
      myp5.textSize(9);
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
