function Card(image, face_up) {
  this.image = image;
  this.face_up = false;
}

Card.prototype.turn = function () {
  this.face_up = !this.face_up;
  return this.face_up;
};

Card.prototype.notEqual = function (card1) {
  if (this.image != card1.image){
    this.turn();
    card1.turn();
  }
  return (this.image != card1.image);
};

exports.cardModule = Card;
