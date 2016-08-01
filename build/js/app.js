(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                  '<img id="back_' + i + '" src="./img/back.jpg"/>'+
                  '<img class="front_img" id="front_' + i + '" src="./img/' + cards[i].image  + '"/>'+
                  '</div>';
  }
  return htmlText;
}


$(document).ready(function() {
  var turn_count = 0;
  var previous_id = -1;
  var click_counter = 0;
  $("#game").append(listCards());

  $(".card").click(function(event){
      event.preventDefault();
      card_id = parseInt(this.id);

    if(card_id !== previous_id){
      cards[card_id].turn();
      $("img#back_" + card_id).hide();
      $("img#front_" + card_id).show();
      click_counter++;
      turn_count++;
      previous_id = (turn_count==1)?card_id:previous_id;

      setTimeout(function () {
          if (turn_count == 2){
            if (cards[card_id].notEqual(cards[previous_id])){
              $("img#back_" + card_id).show();
              $("img#front_" + card_id).hide();
              $("img#back_" + previous_id).show();
              $("img#front_" + previous_id).hide();
            }
            previous_id = -1;
            turn_count = 0;
          }else{
            if (check(cards)){
              alert("you have won after " + (click_counter/2) +" tries");
              location.reload();
            }
          }
      },1000);
    }
  });

});

function check(all_cards) {
  for (var i=0; i< all_cards.length; i++){
    if(all_cards[i].face_up === false){
      return false;
    }
  }
  return true;
}

},{"./../js/memory.js":1}]},{},[2]);
