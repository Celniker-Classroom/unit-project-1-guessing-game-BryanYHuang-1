// add javascript here
let answer = 0; 
let guessCount = 0; 
let totalWins = 0; 
let totalGuesses = 0; 
let scores = 0; 

const playerName = prompt("Please type your name below."); 

//Play
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level"); 
    let range = 3; 
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            range = parseInt(radios[i].value); 
        }
    }

    //pick answer
    answer = Math.floor(Math.random() * range) + 1; 

    //Disable & Enable buttons and radio choices
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range; 
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
    let guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        document.getElementById("msg").textContent = "Please enter a valid number.";
        return;
    }
    guessCount++;
    if (guess === answer){
        document.getElementById("msg").textContent = "Correct! You won in " + guessCount + " guesses.";
        totalWins++;
        document.getElementById("wins").textContent = "Total wins: " + totalWins;
        // disable buttons
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("giveUpBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        // enable radios
        let levelRadios = document.getElementsByName("level");
        for (let i=0; i< levelRadios.length; i++){
            levelRadios[i].disabled = false;
        }
        guessCount = 0;
    } else if (guess < answer){
        document.getElementById("msg").textContent = "Too low!";
    } else {
        document.getElementById("msg").textContent = "Too high!";
    }
});

// Give up button
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "The answer was " + answer + ". You gave up after " + guessCount + " guesses.";
    // disable buttons
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    // enable radios
    let levelRadios = document.getElementsByName("level");
    for (let i=0; i< levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
    guessCount = 0;
}); 