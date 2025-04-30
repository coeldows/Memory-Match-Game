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
  startTimer();
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${level}, 100px)`;
  const totalCards = (level * level % 2 === 0) ? level * level : level * level - 1;
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

let timerInterval;
let timeElapsed = 0;

function startTimer() {
  clearInterval(timerInterval);
  timeElapsed = 0;
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = 'Time: 0s';
  timerInterval = setInterval(() => {
    timeElapsed++;
    timerDisplay.textContent = `Time: ${timeElapsed}s`;
    if (timeElapsed >= 300) {
      clearInterval(timerInterval);
      alert('⏰ Game Over! 5 minutes reached.');
      lockBoard = true;
    }
  }, 1000);
}

window.onload = () => {
  const menu = document.createElement('div');
  menu.innerHTML = `
    <h2>Select Level</h2>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/3977/3977664.png" alt="Beginner Baby" width="48" height="48"><br>
      <button onclick="createBoard(4)">Beginner</button>
      <button onclick="location.reload()">Reset</button>
    </div>
    <div>
      <img src="https://em-content.zobj.net/thumbs/240/apple/354/person-biking_1f6b4.png" alt="Intermediate" width="48" height="48"><br>
      <button onclick="createBoard(6)">Intermediate</button>
      <button onclick="location.reload()">Reset</button>
    </div>
    <div>
      <img src="https://em-content.zobj.net/thumbs/240/apple/354/ninja_1f977.png" alt="Advanced" width="48" height="48"><br>
      <button onclick="createBoard(8)">Advanced</button>
      <button onclick="location.reload()">Reset</button>
    </div>
    <div id="timer" style="margin-top: 20px; font-weight: bold; font-size: 18px;">Time: 0s</div>
  `;
  document.body.insertBefore(menu, document.getElementById('game-board'));
};
