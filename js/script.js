const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector("input");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector("p .remaining");
const numGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessedLetters = []

const word = "magnolia";

const updateProgress = function (word) {
    const placeholderLetters = []
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordProgress.innerText = placeholderLetters.join("");
}
updateProgress(word);

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
    }
    console.log(guessedLetters);
}