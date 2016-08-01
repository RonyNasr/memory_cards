(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Card(image, face_up) {
  this.image = image;
  this.face_up = false;
}

Card.prototype.turn = function () {
  this.face_up = !face_up;
  return face_up;
};

Card.prototype.check = function (card1) {
  if (this.image != card1.image){
    this.turn();
    card1.turn();
  }
};

exports.cardModule = Card;

},{}],2:[function(require,module,exports){
var Card = require('./../js/memory.js').cardModule;

cards =[];

function listCards() {
  for (var i = 0; i < 5; i++) {
    cards.push(new Card("img_"+ (i+1)+".jpg"));
    cards.push(new Card("img_"+ (i+1)+".jpg"));
  }
  cards = cards.sort(function(a, b){return 0.5 - Math.random();});

  htmlText ="";
  for (var i = 0; i < cards.length; i++) {
    htmlText += '<div class="col-sm-3 card" id="'+ i +'">' +
    '<img src="../img/' + cards[i].image; + '"/>' +
    '</div>';
  }
  return htmlText;
}


$(document).ready(function() {
  var turn_count = 0;
  var previous_id = -1;
  $("#game").append(listCards());

  $(".card").click(function(event){
      event.preventDefault();
      card_id = parseInt(this.id());

      cards[card_id].turn();
      turn_count++;

      if (turn_count == 2){
        cards[card_id].check(cards[previous_id]);
        previous_id = -1;
        turn_count = 0;
      }else if (turn_count == 1) {
        previous_id = card_id;
      }

  });

});

},{"./../js/memory.js":1}]},{},[2]);
