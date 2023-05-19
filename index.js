class WordGuessGame {
  constructor() {
    this.words = [
      "dongbin",
      "hyeji",
      "jaehyung",
      "sungyeon",
      "sungi",
      "taegyeong",
      "seokjun",
      "yeonghoon",
      "jibin",
      "seokho",
      "hyeonwoo",
      "gangwoo",
      "taewook",
    ];
    this.selectedWord = "";
    this.guessesRemaining = 10;
    this.guessedLetters = [];
  }

  startGame() {
    this.selectedWord = this.getRandomWord();
    this.displayWordBlank();
    this.bindEvents();
  }

  getRandomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  displayWordBlank() {
    const wordBlank = document.getElementById("word-blank");
    wordBlank.innerText = "■".repeat(this.selectedWord.length);
  }

  bindEvents() {
    const guessButton = document.getElementById("guess-button");
    guessButton.addEventListener("click", this.handleGuess.bind(this));

    const guessInput = document.getElementById("guess-input");
    guessInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.handleGuess();
      }
    });
  }

  handleGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase().trim();

    if (!guess || this.guessedLetters.includes(guess)) {
      guessInput.value = "";
      return;
    }

    this.guessedLetters.push(guess);
    this.displayGuessedLetters();
    this.updateWordBlank();

    if (this.checkWin()) {
      this.displayResult(this.selectedWord);
      setTimeout(() => {
        alert("성공! 다시시작?");
        location.reload();
      }, 500);
    } else {
      this.guessesRemaining--;
      if (this.guessesRemaining === 0) {
        this.displayResult("실패");
        setTimeout(() => {
          alert("바보!");
          location.reload();
        }, 500);
      }
    }

    guessInput.value = "";
  }

  displayGuessedLetters() {
    const guessesElement = document.getElementById("guesses");
    guessesElement.innerText = `입력한 단어: ${this.guessedLetters.join(", ")}`;
  }

  updateWordBlank() {
    const wordBlank = document.getElementById("word-blank");
    const newWordBlank = [...this.selectedWord]
      .map((letter) => (this.guessedLetters.includes(letter) ? letter : "■"))
      .join("");
    wordBlank.innerText = newWordBlank;
  }

  checkWin() {
    return [...this.selectedWord].every((letter) =>
      this.guessedLetters.includes(letter)
    );
  }

  displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.innerText = result;
  }
}

const game = new WordGuessGame();
game.startGame();
