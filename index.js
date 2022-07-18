const cards = document.querySelectorAll(".card");
let firstCard;
let secondCard;
let tryAgain;
let turnedCards = [];

random();

function turnCard(card) {
  if (tryAgain) return;
  this.classList.add("turn");

  if (!firstCard) {
    firstCard = this;
  }
  if (firstCard === this) {
    return;
  } else {
    secondCard = this;
    match();
  }
}

function match() {
  let firstCardData = firstCard.dataset.card;
  let secondCardData = secondCard.dataset.card;
  let match = firstCardData === secondCardData;
  if (match) {
    firstCard.removeEventListener("click", turnCard);
    secondCard.removeEventListener("click", turnCard);
    turnedCards.push(firstCard.dataset, secondCard.dataset);
    resetCards();
    if (turnedCards.length === 12) {
      newGame();
    }
  } else {
    tryAgain = true;
    reset();
  }
}

function newGame() {
  setTimeout(() => {
    cards.forEach(card => card.classList.remove("turn"));
    cards.forEach(card => card.addEventListener("click", turnCard));

    random();
  }, 2000);
  turnedCards = [];
}

function random() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function reset() {
  setTimeout(() => {
    firstCard.classList.remove("turn");
    secondCard.classList.remove("turn");

    resetCards();
    tryAgain = false;
  }, 2000);
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

cards.forEach(card => card.addEventListener("click", turnCard));
