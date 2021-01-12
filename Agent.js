
var font = 'Georgia';
var fontSizeMin = 4;
let mic, vol, vol_1; //Volume per dimensione lettere

class Agent{
  constructor(x0,y0, color, string, vol){
    this.pos = myp5.createVector(x0, y0); //posizione attuale
    this.nextPos = this.pos.copy(); //posizione successiva
    this.stepSize = myp5.random(1, 5);
    this.isOutside = false;
    this.angle;
    this.letterIndex = 0; //serve per prendere le lettere in ordine
    this.col = color;
    this.privateLetters = string;
    this.lettersLength = string.length;
    this.vol = vol;
  }

  update(noiseScale, noiseStrength, strokeWidth) { //è la funzione che disegna
    var newLetter = this.privateLetters.charAt(this.letterIndex);
    myp5.fill(this.col)
    var d = 0;
    this.pos = this.nextPos.copy();
    myp5.textSize(myp5.max(fontSizeMin*this.vol, d));

    while(d <= myp5.textWidth(newLetter)){ //questo ciclo while serve a trovare la giusta nextPos
    this.angle = myp5.noise(this.nextPos.x / noiseScale , this.nextPos.y / noiseScale) * noiseStrength;
    this.nextPos.x = this.nextPos.x + myp5.cos(this.angle) * stepSize;
    this.nextPos.y = this.nextPos.y + myp5.sin(this.angle) * stepSize;
    this.isOutside = this.nextPos.x < 0 || this.nextPos.x > myp5.width || this.nextPos.y < 0 || this.nextPos.y > myp5.height;
    if (this.isOutside) {
      this.nextPos.set(myp5.random(myp5.width), myp5.random(myp5.height));
      this.pos = this.nextPos.copy();
      this.nextPos.x = this.nextPos.x + myp5.cos(this.angle) * stepSize;
      this.nextPos.y = this.nextPos.y + myp5.sin(this.angle) * stepSize;
      this.letterIndex = 0;
    }
    this.isOutside = false;
    d = p5.Vector.dist(this.nextPos, this.pos);
  } //fine while

    newLetter = this.privateLetters.charAt(this.letterIndex);
    // myp5.textSize(myp5.max(fontSizeMin*this.vol, d));
    myp5.push();
    myp5.translate(this.pos.x, this.pos.y);
    let angle = myp5.atan2(this.nextPos.y - this.pos.y, this.nextPos.x - this.pos.x);
    myp5.rotate(angle);
    myp5.text(newLetter, 0, 0);
    myp5.pop();

    this.letterIndex++; //quando la frase finisce ricomincia
      if (this.letterIndex >= this.lettersLength) {
        this.letterIndex = 0;
    }

  } //fine update
}; //fine classe Agent
