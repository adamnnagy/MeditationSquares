function introText() {
  this.line1 = 'Press ASDF and JKL; for music';
  this.line2 = 'Press QWER and UIOP for effects';
  this.alpha = 255;
}

introText.prototype.display = function () {
  push();
  fill(255, this.alpha);
  noStroke();
  textAlign(CENTER);
  textSize(50);
  textFont('Helvetica');
  text(this.line1, 0,  -windowHeight/2);
  text(this.line2, 0, - windowHeight/2 + 200);
  pop();
};

introText.prototype.fade = function () {
  if (this.alpha > 0) {
    this.alpha -= 0.5;
  } else {
    return false;
  }
};
