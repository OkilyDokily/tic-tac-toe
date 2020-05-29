//business logic

function Game(){
  this.currentPlayer = "X";
  this.winner = "";
  this.winLine = -1;
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
     this.winLine = i;
      break;
    }
   
    if ([board.boardState[0][i], board.boardState[1][i], board.boardState[2][i]].every((val, i, arr) => val === this.currentPlayer)){
      this.winner = this.currentPlayer;
      this.winLine = i + 3;
      break;
    } 
  }
  if([board.boardState[0][0],board.boardState[1][1],board.boardState[2][2]].every((val, i, arr) => val === this.currentPlayer)){
    this.winner = this.currentPlayer;
    this.winLine = 6;
  }

  if([board.boardState[0][2],board.boardState[1][1],board.boardState[2][0]].every((val, i, arr) => val === this.currentPlayer )){
    this.winner = this.currentPlayer;
    this.winLine = 7;
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
        displayCross();
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
    $("#winner").text("");
  }
  function displayCross(){
    switch (game.winLine){
      case 0:
        $("#cross").css("height","10px")
        $("#cross").css("width","300px")
        $("#cross").css("left",6)
        $("#cross").css("bottom",265)
        break;
      case 1:
        $("#cross").css("height","10px")
        $("#cross").css("width","300px")
        $("#cross").css("left",6)
        $("#cross").css("bottom",160)
        break;
      case 2:
        $("#cross").css("height","10px")
        $("#cross").css("width","300px")
        $("#cross").css("left",6)
        $("#cross").css("bottom",60)
        break;
      case 3:
        $("#cross").css("width","10px")
        $("#cross").css("height","300px")
        $("#cross").css("left",45)
        $("#cross").css("bottom",312)
        break;
      case 4:
        $("#cross").css("width","10px")
        $("#cross").css("height","300px")
        $("#cross").css("left",150)
        $("#cross").css("bottom",312)
        break;
      case 5:
        $("#cross").css("width","10px")
        $("#cross").css("height","300px")
        $("#cross").css("left",250)
        $("#cross").css("bottom",312)
        break;
      case 6:
        //diaganol from top left to bottom right
        $("#cross").css("width","10px")
        $("#cross").css("height","300px")
        $("#cross").css("left",150)
        $("#cross").css("bottom",312)
        $("#cross").css("transform", "rotateY(0deg) rotate(-45deg)")
        break;
        break;
      case 7:
        //diaganol from top right to bottom left.
        $("#cross").css("height","10px")
        $("#cross").css("width","300px")
        $("#cross").css("left",6)
        $("#cross").css("bottom",160)
        $("#cross").css("transform", "rotateY(0deg) rotate(-45deg)")  
    }
    $("#cross").show();
    
  }
})
