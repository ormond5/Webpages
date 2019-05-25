var OGboard;
const humanPlayer = '0';
const compPlayer = 'X'; //Might make this read in input later on;
const winCombos = [
  //The ways someone can win
  [0,1,2],[3,4,5],[6,7,8], [0,3,6],
  [1,4,7],[2,5,8],[0,4,8],[6,4,2]]

const cells = document.querySelectorAll(".Cell");

startGame();

function startGame() {
  document.querySelector('.endgame').style.display = 'none';
  OGboard = Array.from(Array(9).keys());
  //Fancy way to make the array be labeld as 0-9
  for (var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click',humanClick,false);
  }
}
function humanClick(square) {
  if (typeof OGboard[square.target.id] == 'number'){
    //if this spot is open then go head.
    turn(square.target.id, humanPlayer);
    if (!checkTie()) turn(bestSpot(),compPlayer);
  }

}
function turn(squareId, player) {
  OGboard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(OGboard, player);
  if(gameWon) gameOver(gameWon);
}
function checkWin(board,player){
  //Find all the places on the board that are already filled
  //reduce method will go through every elemet of the board array and do something
//a = accumulator is the value that we get back.
//e is the element in the border that we are going through and I is the index.
  let plays = board.reduce((a,e,i) =>
  (e=== player)? a.concat(i) : a, []); // we put a in an empty array
  let gameWon = null;
  for (let[index,win] of winCombos.entries()){
    //need to loop through every win combo
    if (win.every(elem => plays.indexOf(elem) > -1)){
//every = everyelement in win
    gameWon = {index, player: player};
    break;
      };
    }
  return gameWon;
}
function gameOver(gameWon) {
  //go through every index of the win winCombos
  for (let index of winCombos [gameWon.index]){
    document.getElementById(index).style.backgroundColor =
    gameWon.player == humanPlayer? "blue": "red";
  }
  for (var i = 0; i < cells.length; i++)
  {
      cells[i].removeEventListener('click',humanClick,false);
  }
  declareWinner(gameWon.player == humanPlayer ? "You Win!" : "You Lose");
}
//Creating basic AI
function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;

}
function emptySquares() {
  return OGboard.filter(s => typeof s == 'number');
}
function bestSpot(){
  return minimax(OGboard,compPlayer).index;
  //calling the minimax algorithm function
}
function checkTie() {
  if (emptySquares().length == 0)
    {
      for(var i = 0; i < cells.length; i++)
      {
        cells[i].style.backgroundColor = "green";
        cells[i].removeEventListener('click',humanClick,false);
      }
      declareWinner('Tie Game!');
      return true;
    }
    return false;
}
function minimax(newBoard,player) {

  var availSpots = emptySquares();

  if (checkWin(newBoard,humanPlayer)){
    return {score:-10};
  }else if (checkWin(newBoard,compPlayer)){
    return {score:10};
  }else if (availSpots.length === 0){
    return {score:0};
  }

  var moves = [];
  for (var i = 0; i < availSpots.length; i++){
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

      if (player == humanPlayer){
          var result = minimax(newBoard,humanPlayer);
          move.score = result.score;
      }else {
        var result = minimax(newBoard,compPlayer);
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }
  var bestMove;
  if (player === compPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
      }
    }
  }else {
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
