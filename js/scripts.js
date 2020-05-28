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

Game.prototype.isWinner = function(){
  for(var i = 0; i <= 2; i++){
    if (board.boardState[i].every((val, i, arr) => val === arr[0] )){
      game.winner = currentUser;
      break;
    }
    if (board.boardState[0][i] === board.boardState[1][i] === board.boardState[2][i]){
      game.winner == currentUser;
      break;
    } 
  }
  
}

let game = new Game();
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
  if(!board.isAlreadyOccupied){
    this.boardState[move.y][move.x] = move.currentUser;
  }
  //call these everytime a new space is occupied
  if (game.isWinner()){
    return;
  }
  game.switchUser();
  

}


$(document).ready(function(){

})