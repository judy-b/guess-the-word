// this is the unordered list of letters the player has guessed that will display on screen
const guessedLettersList = document.querySelector(".guessed-letters");
// the button the player will use to make a guess
const guessButton = document.querySelector(".guess");
// where they type their letter to guess
const input = document.querySelector("input");
// this is where the dots/letters will display and update until all the letters have been guessed
const wordProgress = document.querySelector(".word-in-progress");
// the paragraph that tells the player the number of remaining guesses
const remainingGuesses = document.querySelector("p .remaining");
// the span around the number of guesses left in the above paragraph
const numGuesses = document.querySelector("span");
// a message that will display on screen in response to the players guess
const message = document.querySelector(".message");
// when the game ends, they can press this button to play again
const playAgainButton = document.querySelector(".play-again");
// the array of letters the user has guessed
const guessedLetters = []
// the number of remaining guesses
let guessesLeft = 8
let word = "magnolia"

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text();
    const wordsArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomIndex].trim();
    updateProgress(word);
}
getWord();

const updateProgress = function (word) {
    const placeholderLetters = []
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordProgress.innerText = placeholderLetters.join("");
}

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const response = input.value;
    const letter = validateInput(response);
    if (letter) {
        makeGuess(letter);
    }
    input.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "Please input a letter."
    } else if (input.length >= 2) {
        message.innerText = "Please only enter 1 letter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from a to z."
    } else {
        return input
    }
}

const makeGuess = function (letter) {
    const upperLetter = letter.toUpperCase()
    if (guessedLetters.includes(upperLetter)) {
        message.innerText = "You've already guessed that letter.";
    } else {
        guessedLetters.push(upperLetter);
        updateGuessedLetters();
        countRemainingGuesses(letter);
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
}

const updateGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
}

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedWord = []
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedWord.push(letter);
        } else {
            updatedWord.push("●")
        }
    };
    wordProgress.innerText = updatedWord.join("");
    checkForWin();
}

const checkForWin = function () {
    if (wordProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class= "highlight">You guessed the correct word! Congrats!</p>';
    }
};

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    const wordArray = upperWord.split("");
    if (wordArray.includes(guess.toUpperCase())) {
        message.innerText = "This letter is in the word!";
    } else {
        message.innerText = "This letter is not in the word";
        guessesLeft -= 1;
    }
    if (guessesLeft === 0) {
        message.innerText = `You ran out of guesses. The game is over. The word was ${word}`;
    } else if (guessesLeft === 1) {
        numGuesses.innerText = "1 guess"
    } else {
        numGuesses.innerText = `${guessesLeft} guesses`
    }
}