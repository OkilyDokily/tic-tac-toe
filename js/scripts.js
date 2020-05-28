//business logic

function Game(){
  this.currentUser = "X";
  this.winner = "";
}
Game.prototype.switchUser(){
  if (this.currentUser === "X"){
    this.currentUser = "Y"
  }
  else {
    this.currenUser = "X"
  }
}

function Board(){
  this.boardState = [["","",""],["","",""],["","",""]];
}




$(document).ready(function(){

})