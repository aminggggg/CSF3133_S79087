// ---- Global variables ----
let gameStarted = false;                 
let wins = 0, losses = 0, draws = 0;     
let results = [];                        
let round = 0;                           

// Start the game: validate the name, show welcome message and start time
function startGame() {
  let name = document.getElementById("playerName").value;
  document.getElementById("welcome").textcontent = "";
  // Validation: the name must not be empty
  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
  document.getElementById("startTime").innerHTML = "Game started: " + Date();
  gameStarted = true;
}

// Return a random choice for the computer
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];   
}

// Play one round
function playRound(playerChoice) {
  // The game must be started first
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }
  let computerChoice = getComputerChoice();
  let result;

  // Decide the result: rock beats scissors, scissors beats paper, paper beats rock
  if (playerChoice === computerChoice) {
    result = "Draw";
  } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
             (playerChoice === "scissors" && computerChoice === "paper") ||
             (playerChoice === "paper" && computerChoice === "rock")) {
    result = "Win";
  } else {
    result = "Lose";
  }

  // Change the images
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  // Show the result and change its colour
  let resultEl = document.getElementById("result");
  resultEl.innerHTML = "You " + result + "! (" + playerChoice + " vs " + computerChoice + ")";
  if (result === "Win") {
    resultEl.style.color = "green";
    wins++;
  } else if (result === "Lose") {
    resultEl.style.color = "red";
    losses++;
  } else {
    resultEl.style.color = "grey";
    draws++;
  }

  // Update the scoreboard
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store the result and add a row to the history table
  results.push(result);
  round++;
  document.getElementById("history").innerHTML +=
    "<tr><td>" + round + "</td><td>" + playerChoice + "</td><td>" + computerChoice +
    "</td><td>" + result + "</td></tr>";
}

// Show the summary using a for loop to count wins
function showSummary() {
  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }
  let percent = 0;
  if (results.length > 0) {
    percent = Math.round(winCount / results.length * 100);   // rounded win percentage
  }
  document.getElementById("summary").innerHTML =
    "You played " + results.length + " rounds and won " + percent + "%";
}

// Reset everything back to the start
function resetGame() {
  wins = 0; losses = 0; draws = 0; round = 0;
  results = [];
  gameStarted = false;

  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;

  // Keep only the header row of the history table
  document.getElementById("history").innerHTML =
    "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";

  // Clear welcome message and start time
  document.getElementById("welcome").innerHTML = "";
  document.getElementById("startTime").innerHTML = "";

  // Clear player name
  document.getElementById("playerName").value = "";
}