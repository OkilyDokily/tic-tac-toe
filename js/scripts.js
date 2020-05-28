//business logic

function Game(){
  this.currentPlayer = "X";
  this.winner = "";
}

Game.prototype.switchPlayer(){
  if (this.currentPlayer === "X"){
    this.currentPlayer = "Y"
  }
  else {
    this.currentPlayer = "X"
  }
}

Game.prototype.determineWinner = function(){
  for(var i = 0; i <= 2; i++){
    if (board.boardState[i].every((val, i, arr) => val === arr[0] )){
     this.winner = this.currentPlayer;
      break;
    }
    if (board.boardState[0][i] === board.boardState[1][i] === board.boardState[2][i]){
      this.winner = this.currentPlayer;
      break;
    } 
  }
  if(board.boardState[0][0] === board.boardState[1][1] === board.boardState[2][2]){
    this.winner = this.currentPlayer;
  }

  if(board.boardState[0][2] === board.boardState[1][1] === board.boardState[2][0]){
    this.winner = this.currentPlayer;
  }
  
}

let game = new Game();

function Move(x,y){
  this.x = x;
  this.y = y;
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
    this.boardState[move.y][move.x] = game.currentPlayer;
  }
  //call these everytime a new space is occupied
  game.determineWinner();
  if(!(game.winner === "")){
    console.log(game.winner + " wins!!")
    return;
  }
  game.switchUser();
}

let board = new Board();

function go(x,y){
  let move = new Move(x,y)
  board.addOccupiedSpace(move)
}

$(document).ready(function(){

})