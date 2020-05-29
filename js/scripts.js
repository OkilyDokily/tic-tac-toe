//business logic

function Game(){
  this.currentPlayer = "X";
  this.winner = "";
}

Game.prototype.switchPlayer = function(){
  if (this.currentPlayer === "X"){
    this.currentPlayer = "O"
  }
  else {
    this.currentPlayer = "X"
  }
}

Game.prototype.determineWinner = function(){
  for(var i = 0; i <= 2; i++){
    if (board.boardState[i].every((val, i, arr) => val === this.currentPlayer )){
     this.winner = this.currentPlayer;
      break;
    }
   
    if ([board.boardState[0][i], board.boardState[1][i], board.boardState[2][i]].every((val, i, arr) => val === this.currentPlayer)){
      this.winner = this.currentPlayer;
      break;
    } 
  }
  if([board.boardState[0][0],board.boardState[1][1],board.boardState[2][2]].every((val, i, arr) => val === this.currentPlayer)){
    this.winner = this.currentPlayer;
  }

  if([board.boardState[0][2],board.boardState[1][1],board.boardState[2][0]].every((val, i, arr) => val === this.currentPlayer )){
    this.winner = this.currentPlayer;
  }
  
}

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
  if(!board.isAlreadyOccupied(move)){
    this.boardState[move.y][move.x] = game.currentPlayer;
  }
  //call these everytime a new space is occupied
  game.determineWinner();
  game.switchPlayer();
}

let board = new Board();
let game = new Game();

//call this at the start of each turn.
function go(x,y){
  let move = new Move(x,y)
  board.addOccupiedSpace(move)
}

function resetGame(){
  game.currentPlayer = "X"
  game.winner = ""
  board.boardState = [["","",""],["","",""],["","",""]];
}

$(document).ready(function(){
 
  $("div#game").on("click","div",function(e){
    e.preventDefault();
    if(game.winner === ""){
    let length = $(this).prevAll().length;
    let y = Math.floor((length / 3));
    let x = length - (y * 3);

    let move = new Move(x,y)
    
    if(!board.isAlreadyOccupied(move)){
      $(this).text(game.currentPlayer);
      go(x,y);
      if(!(game.winner === "")){
        $("div#winner").text(game.winner + " wins!!")
      }
    }
  }
  })
   
  $("#restart").click(function(){
    resetGame();
    removeText();
  })
  function removeText(){
    $("#game div").text("");
  }
})
