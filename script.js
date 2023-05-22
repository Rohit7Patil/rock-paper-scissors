const pScore = document.querySelector(".player-score");
const cScore = document.querySelector(".computer-score");
const finalResult = document.querySelector(".final-result");
const detailResult = document.querySelector(".detail-result");
const btnRock = document.querySelector(".rock");
const btnPaper = document.querySelector(".paper");
const btnScissors = document.querySelector(".scissors");

var playerScore = 0;
var compScore = 0;
var playerChoice;
var compChoice = { Value: "" };
var playerChoiceInt;
var compChoiceInt;

function computerPlay(compChoice) {
    let choiceNum = Math.floor(Math.random() * 3);
    if (choiceNum === 0) {
        compChoice.Value = "rock";
    } else if (choiceNum === 1) {
        compChoice.Value = "paper";
    } else if (choiceNum === 2) {
        compChoice.Value = "scissors";
    }
    return choiceNum;
}

function playRound(playerChoiceInt, compChoiceInt, compChoice, playerChoice) {
    let win_array = [
        [0, 2, 1], // rock > scissors > paper (0 > 2 > 1)
        [1, 0, 2], // paper > rock > scissors (1 > 0 > 2)
        [2, 1, 0], // scissors > paper > rock (2 > 1 > 0)
    ];
    let result = win_array[playerChoiceInt][compChoiceInt];
    if (result === 0) {
        finalResult.textContent = "Tie!";
        finalResult.classList.add("tie");
        finalResult.classList.remove("lose", "won");
        detailResult.innerHTML = `You: <b>${playerChoice}</b> Computer: <b>${compChoice.Value}</b>`;
    } else if (result === 1) {
        finalResult.textContent = "You Win!";
        finalResult.classList.add("won");
        finalResult.classList.remove("lose", "tie");
        detailResult.innerHTML = `You: <b>${playerChoice}</b> Computer: <b>${compChoice.Value}</b>`;
        playerScore += 1;
    } else if (result === 2) {
        finalResult.textContent = "You Lose!";
        finalResult.classList.add("lose");
        finalResult.classList.remove("won", "tie");
        detailResult.innerHTML = `You: <b>${playerChoice}</b> Computer: <b>${compChoice.Value}</b>`;
        compScore += 1;
    }
}

function getPlayerChoice(e) {
    playerChoice = e.target.className;
    const start = document.querySelector(".start");
    start.style.display = "none";

    if (e.target.className == "rock") {
        playerChoiceInt = 0;
    } else if (e.target.className == "paper") {
        playerChoiceInt = 1;
    } else if (e.target.className == "scissors") {
        playerChoiceInt = 2;
    }
    compChoiceInt = computerPlay(compChoice);
    playRound(playerChoiceInt, compChoiceInt, compChoice, playerChoice);

    pScore.textContent = playerScore;
    cScore.textContent = compScore;
}

btnRock.addEventListener("click", getPlayerChoice);
btnPaper.addEventListener("click", getPlayerChoice);
btnScissors.addEventListener("click", getPlayerChoice);

finalWinner();
