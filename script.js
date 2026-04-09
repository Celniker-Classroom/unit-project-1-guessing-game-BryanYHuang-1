// add javascript here
let answer = 0; 
let guessCount = 0; 
let totalWins = 0; 
let totalGuesses = 0; 
let scores = []; 
let gameActive = false; 
let range = 3; 

let playerName = prompt("Please type your name below."); 
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

//update score when win
function updateScore(score, isWin = true){
    if (isWin) totalWins ++; 
    totalGuesses += score; 

    document.getElementById("wins").textContent = "Total wins: " + totalWins; 
    document.getElementById("avgScore").textContent = "Average Score: " + (totalWins > 0 ? (totalGuesses/totalWins).toFixed(1) : "N/A"); 
    document.getElementById("avgGuesses").textContent = "Average Guesses: " + (totalWins > 0 ? (totalGuesses/totalWins).toFixed(1) : "N/A"); 
    scores.push(score); 
    
    scores.sort(function(a, b){return a - b});

    let leaderboard = document.getElementsByName("leaderboard"); 
    for (let i = 0; i < leaderboard.length; i++){
        if (i < scores.length){
            leaderboard[i].textContent = scores[i]; 
        }
        else {
            leaderboard[i].textContent = "--";
        }
    }
}

//reset button function
function resetButtons(){
    document.getElementById("guessBtn").disabled = true; 
    document.getElementById("giveUpBtn").disabled = true; 
    document.getElementById("playBtn").disabled = false; 

    let levelRadios = document.getElementsByName("level"); 
    for (let i=0; i< levelRadios.length; i++){
        levelRadios[i].disabled = false; 
    }
}

//Play
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level"); 
    range = 3; 
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            range = parseInt(radios[i].value); 
        }
    }

    //pick answer
    answer = Math.floor(Math.random() * range) + 1; 
    guessCount = 0; 
    gameActive = true;

    //Disable & Enable buttons and radio choices
    document.getElementById("msg").textContent = capitalized + ", guess a number between 1 and " + range; 
    document.getElementById("guess").value=""; 
    document.getElementById("guessBtn").disabled = false; 
    document.getElementById("giveUpBtn").disabled = false; 
    document.getElementById("playBtn").disabled = true; 

    let levelRadios = document.getElementsByName("level"); 
    for (let i=0; i< levelRadios.length; i++){
        levelRadios[i].disabled = true; 
    }
}); 


// Guess button
document.getElementById("guessBtn").addEventListener("click", function(){
    if (!gameActive) {
        // If game is not active (after correct guess), clicking guess button resets for next round
        resetButtons();
        return;
    }
    
    let input = document.getElementById("guess").value; 
    let num = parseInt(input);
    if (isNaN(num)){
        document.getElementById("msg").textContent = "Please enter a valid number!"; 
        return; 
    }

    guessCount ++; 
    let diff = Math.abs(num - answer);
    if (num === answer){
        document.getElementById("msg").textContent = "Correct! " + capitalized + " got it in " + guessCount + " guesses!";
        gameActive = false;
        resetButtons(); 
        updateScore(guessCount);
        guessCount = 0;
    }
    //higher
    else if (num < answer){
        let temp = ""; 
        if (diff <= 2){
            temp = "Hot!"
        }
        else if (diff <= 5){
            temp = "Warm!"
        }
        else{
            temp = "Cold!"
        }
        document.getElementById("msg").textContent = "Too low! " + temp; 
    }
    //lower
    else{
            let temp = ""; 
            if (diff <= 2){
                temp = "Hot!"
            }
            else if (diff <= 5){
                temp = "Warm!"
            }
            else{
                temp = "Cold!"
            }
            document.getElementById("msg").textContent = "Too high! " + temp; 
        }
}); 

// Give Up button
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "The answer was " + answer + ". Better luck next time!";
    gameActive = false;
    updateScore(range, false);
    // Reset buttons for next round
    resetButtons(); 
}); 