const cardsArray = [
  '🎸', '📼', '📺', '☎️', '📻', '💾', '📷', '🎮',
  '🎸', '📼', '📺', '☎️', '📻', '💾', '📷', '🎮'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  shuffle(cardsArray);
  cardsArray.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.innerHTML = '<span class="emoji">?</span>';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.querySelector('.emoji').textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === cardsArray.length / 2) {
      setTimeout(() => alert('You matched all pairs! 🎉'), 300);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.querySelector('.emoji').textContent = '?';
    secondCard.querySelector('.emoji').textContent = '?';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

window.onload = () => {
  createBoard();
};
