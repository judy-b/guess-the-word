const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector("input");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector("p .remaining");
const numGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

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
    const letter = input.value;
    console.log(letter);
    input.innerText = "";
});