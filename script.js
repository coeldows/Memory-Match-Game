let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let cardsArray = [];

const emojiSet = [
  '🎸', '📼', '📺', '☎️', '📻', '💾', '📷', '🎮', '📹', '🧮',
  '📼', '📟', '🕹️', '📠', '📡', '🖥️', '💿', '🖨️', '📀', '📁',
  '🎞️', '📂', '🧲', '📓', '📚', '🎧', '📀', '🖱️', '🗃️', '🔌',
  '🪀', '📷', '📡', '🎤', '🎛️', '📔', '📷', '🧮', '🧲', '📀'
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard(level) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${level}, 100px)`;
  const totalCards = level * level;
  const selectedEmojis = emojiSet.slice(0, totalCards / 2);
  cardsArray = [...selectedEmojis, ...selectedEmojis];
  shuffle(cardsArray);

  cardsArray.forEach((emoji) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.innerHTML = '<span class="emoji">?</span>';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  matchedPairs = 0;
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
  const menu = document.createElement('div');
  menu.innerHTML = `
    <h2>Select Level</h2>
    <button onclick="createBoard(4)">Beginner (4x4)</button>
    <button onclick="createBoard(5)">Intermediate (5x5)</button>
    <button onclick="createBoard(8)">Advanced (8x8)</button>
  `;
  document.body.insertBefore(menu, document.getElementById('game-board'));
};
