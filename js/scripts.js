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
    this.currentUser = "X"
  }
}

function Move(x,y, currentUser){
  this.x = x;
  this.y = y;
  this.currentUser = currentUser; 
}

function Board(){
  this.boardState = [["","",""],["","",""],["","",""]];
}

Board.prototype.isAlreadyOccupied = function(move){
  if (this.boardState[move.y][move.x] === "")
  {
    return false;
  }
  return true;
}

Board.prototype.addOccupiedSpace = function(move){
  this.boardState[move.y][move.x] = move.currentUser; 
}




$(document).ready(function(){

})