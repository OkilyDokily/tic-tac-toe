//business logic
class Game {
  constructor() {
    this.currentPlayer = "X";
    this.winner = "";
    this.winLine = -1;
    this.computer = "";
  }
  //automatically switch player after each turn called by board.addOccupiedSpace();
  switchPlayer() {
    if (this.currentPlayer === "X") {
      this.currentPlayer = "O";
    }
    else {
      this.currentPlayer = "X";
      if (this.computer === "easy") {
        goComputerEasy();
      }
      else if (this.computer === "hard"){
        goComputerHard();
      }
    }
  }
  determineWinner() {
    for (let i = 0; i <= 2; i++) {
      if (board.boardState[i].every((val, i, arr) => val === this.currentPlayer)) {
        this.winner = this.currentPlayer;
        this.winLine = i;
        return;
      }
      if ([board.boardState[0][i], board.boardState[1][i], board.boardState[2][i]].every((val, i, arr) => val === this.currentPlayer)) {
        this.winner = this.currentPlayer;
        this.winLine = i + 3;
        return;
      }
    }
    if ([board.boardState[0][0], board.boardState[1][1], board.boardState[2][2]].every((val, i, arr) => val === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      this.winLine = 6;
      return;
    }
    if ([board.boardState[0][2], board.boardState[1][1], board.boardState[2][0]].every((val, i, arr) => val === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      this.winLine = 7;
      return;
    }
  }

  resetGame(){
    game.currentPlayer = "X"
    game.winner = ""
    game.computer = "";
    board.boardState = [["","",""],["","",""],["","",""]];
    turn = 1;
  }
}


function Move(x,y){
  this.x = x;
  this.y = y;
}

class Board {
  constructor() {
    this.boardState = [["", "", ""], ["", "", ""], ["", "", ""]];
  }
  isAlreadyOccupied(move) {
    if (this.boardState[move.y][move.x] === "") {
      return false;
    }
    return true;
  }
  //calls isalready occupied to prevent movement
  addOccupiedSpace(move) {
    if (!board.isAlreadyOccupied(move)) {
      this.boardState[move.y][move.x] = game.currentPlayer;
      //call these everytime a new space is occupied
      game.determineWinner();
      game.switchPlayer();
    }
  }
}

let board = new Board();
let game = new Game();
//==============================================================
//===============================================================
//call these at the start of each turn.
//all these functions call the go function
function go(x,y){
  let move = new Move(x,y)
  if(!(game.computer === "") && game.currentPlayer === "X"){
    $("div#game div:nth-child("+ (((y*3) + x) + 1) + ")").text("X");
  }
  board.addOccupiedSpace(move)
}

function goComputerEasy(){
  if (game.winner == ""){
    //create an array of available random spaces
    let emptySpaces = board.boardState.flat().map(function(item,i){
      if(item === ""){
        return i;
      }
      else{return item}
    }).filter(function(item){
      return !(item === "X" || item === "O")
    });
    //pick a random space from the array
    let length = emptySpaces.length;
    let random = Math.floor(Math.random() * length )
    let choice = emptySpaces[random];

    let y = Math.floor((choice / 3));
    let x = choice - (y * 3);

    go(x,y);
  }
}

let turn = 1;
function goComputerHard(){
  //the code emphasises going to various corners on the first moves
  //if two moves on the same line are the same then block or complete the line with call to isTwo()
  //if all else fails make a random move with a call to goComputerEasy();
  if(game.winner === ""){
    if (turn === 1){
      go(0,0);
      turn++;
      return;
    }
    if (turn === 2){
      turn++;
      let move = new Move(2,2);
      if(board.isAlreadyOccupied(move)){
        go(0,2);
      }
      else{
        go(2,2);
      }
      return;
    }
    if (turn === 3){
      turn++;

      let choice = !(isTwo("X") === false) ? isTwo("X"): isTwo("O");
     
      let topRight = new Move(2,0)
      let bottomLeft = new Move(0,2);
      if(!(choice === false)){
        go(choice.emptySpace.x,choice.emptySpace.y)
      }
      else
      if (!(board.isAlreadyOccupied(topRight))){
        go(topRight.x,topRight.y)
      }
      else{
        go(bottomLeft.x,bottomLeft.y)
      }
     
    }
    else {
      let choice = !(isTwo("X") === false) ? isTwo("X"): isTwo("O");
      if (!(choice === false)){
        go(choice.emptySpace.x,choice.emptySpace.y);
      }
      else{
        goComputerEasy();
      }
    }
  }
}
//
//AI algorithm//////////////////////////////////////////////
////////////////////////////////////////////////////////////
function isTwo(player) {
  for (let i = 0; i <= 2; i++) {
    if (board.boardState[i].filter(item => item === player).length === 2 && board.boardState[i].some(item => item === "")){
      let index = board.boardState[i].findIndex(item => item === "");
      let move = new Move(index,i);
      return {player:player, emptySpace:move}
    }

    let line = [board.boardState[0][i], board.boardState[1][i], board.boardState[2][i]];
    if (line.filter(item => item === player).length === 2 && line.some(item => item === "")){
      let index = line.findIndex(item => item === "");
      let move = new Move(i, index);
      return {player:player, emptySpace:move}
    }  
  }

  let line = [board.boardState[0][0], board.boardState[1][1], board.boardState[2][2]]
  if (line.filter(item => item === player).length === 2 && line.some(item => item === "")){
    let index = line.findIndex(item => item === "");
    let move = new Move(index, index);
    return {player:player,emptySpace: move}
  }
  line = [board.boardState[0][2], board.boardState[1][1], board.boardState[2][0]]
  if (line.filter(item => item ===player).length === 2 && line.some(item => item === "")){
    let index = line.findIndex(item => item === "");
    let move = new Move(2 - index ,index)
    return {player:player,emptySpace:move}
  }

  return false;
}

//===================================================================================================
//===================================================================================================
//===================================================================================================
// front end logic  section
// front end logic
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
    game.resetGame();
    removeUI();
  })

  $("#easy").click(function(){
    game.resetGame();
    removeUI();
    game.computer = "easy";
    goComputerEasy();
  })

  $("#hard").click(function(){
    game.resetGame();
    removeUI();
    game.computer = "hard";
    goComputerHard();
  })

  function removeUI(){
    $("#game div").text("");
    $("#winner").text("");
    $("#cross").hide();

  }
  function displayCross(){
    $("#cross").css("transform", "rotateY(0deg) rotate(0deg)")
    switch (game.winLine){
      case 0:
        $("#cross").css({"height":"10px","width":"300px","left":6,"bottom":265});
        break;
      case 1:
        $("#cross").css({"height":"10px","width":"300px","left":6,"bottom":160});
        break;
      case 2:
        $("#cross").css({"height":"10px","width":"300px","left":6,"bottom":60});
        break;
      case 3:
        $("#cross").css({"width":"10px","height":"300px","left":45,"bottom":312});
        break;
      case 4:
        $("#cross").css({"width":"10px","height":"300px","left":150,"bottom":312})
        break;
      case 5:
        $("#cross").css({"width":"10px","height":"300px","left":250,"bottom":312})
        break;
      case 6:
        //diagonal from top left to bottom right
        $("#cross").css({"width":"10px","height":"300px","left":150,"bottom":312,"transform": "rotateY(0deg) rotate(-45deg)"})
        break;
      case 7:
        //diagonal from top right to bottom left.
        $("#cross").css({"height":"10px","width":"300px","left":6,"bottom":160,"transform":"rotateY(0deg) rotate(-45deg)"})
    }
    $("#cross").show();
    
  }
})
