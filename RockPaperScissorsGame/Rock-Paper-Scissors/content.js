
let userScore = 0;
let computerScore =0;
const userScore_domspan = document.getElementById("user-score");
const computerScore_domspan = document.getElementById("computer-score");
const scoreboard_div = document.querySelector(".score-board");
//he querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
const result_div_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");


function getComputerChoice(){
const choices = ['r', 'p', 's'];
const randNum = Math.floor(Math.random()*3);
return choices[randNum];
}
//console.log(getComputerChoice());
function convertToWord(letter){
  if (letter == 'r')return "Rock";
  if (letter == 'p')return "Paper";
  return "Scissors";
}
function check(){
  if (userScore == 10){
    console.log("Congrats you won! Here is your prize");
  }else if (computerScore == 10){
    console.log("Dang Im sorry! Better luck next time! ");
  }
}
function win(user,computer){
  userScore++;
  userScore_domspan.innerHTML = userScore;
  const smallwordUser = "user".fontsize(3).sup();
  const smallwordComp = "computer".fontsize(3).sup();
//This is ES6 `${}`
  result_div_p.innerHTML = `${convertToWord(user)}${(smallwordUser)} beats  ${convertToWord(computer)}${smallwordComp} . You Win!`;
 const userChoice_Div = document.getElementById(user);
 
  check();
}

function lose(user,computer) {
  computerScore++;
  computerScore_domspan.innerHTML = computerScore;
  const smallwordUser = "user".fontsize(3).sup();
  const smallwordComp = "computer".fontsize(3).sup();
  //This is ES6 `${}`
  result_div_p.innerHTML = `${convertToWord(user)}${(smallwordUser)} beats  ${convertToWord(computer)}${smallwordComp} . You Lost!`;
}
function draw(user,computer) {
  const smallwordUser = "user".fontsize(3).sup();
  const smallwordComp = "computer".fontsize(3).sup();
  //This is ES6 `${}`
  result_div_p.innerHTML = `${convertToWord(user)}${(smallwordUser)} matches  ${convertToWord(computer)}${smallwordComp} . It's a draw!`;

}

function game(userChoice){
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice){
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}
function main() {
  rock_div.addEventListener('click',function() {
    game("r");
  })

  paper_div.addEventListener('click', function(){
      game("p");
  })
  scissors_div.addEventListener('click', function(){
      game("s");
  })
}


main();
