const wordList = [
  'messi','ronaldo','mbappe','haaland','neymar','lewandowski','modric','kroos',
  'vinicius','bellingham','rashford','salah','mane','sterling','grealish','foden',
  'rodri','debruyne','odegaard','martinez','garnacho','valverde','courtois','alisson',
  'terstegen','kante','pogba','casemiro','brunofernandes','antony','sancho','saka',
  'benzema','giroud','griezmann','dembele','gavi','pedri','ansu','lukaku','lautaro',
  'dybala','ramos','alaba','militao','walker','stones','vandijk','robertson','trent',
  'havertz','son','kane','richarlison','raphinha','suarez','paqueta','olise','lamine',
  'musiala','estevao','jobe','quansah'
];

const stages = [
`  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
`  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
`  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
`  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
`  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
`  +---+
  |   |
  O   |
      |
      |
      |
=========`,
`  +---+
  |   |
      |
      |
      |
      |
=========`
];

let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let display = Array(chosenWord.length).fill('_');
let lives = 6;
let correctLetters = [];

const wordDisplay = document.getElementById('wordDisplay');
const stagesDiv = document.getElementById('stages');
const livesDiv = document.getElementById('lives');
const messageDiv = document.getElementById('message');
const lettersDiv = document.getElementById('letters');

function updateDisplay() {
  wordDisplay.textContent = display.join(' ');
  stagesDiv.textContent = stages[lives];
  livesDiv.textContent = `Lives: ${lives}/6`;
}

function checkLetter(letter) {
  if (correctLetters.includes(letter)) {
    messageDiv.textContent = `You already guessed '${letter}'`;
    return;
  }

  correctLetters.push(letter);

  if (chosenWord.includes(letter)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        display[i] = letter;
      }
    }
    messageDiv.textContent = `Good guess!`;
  } else {
    lives--;
    messageDiv.textContent = `Wrong guess! '${letter}' is not in the word.`;
  }

  updateDisplay();

  if (!display.includes('_')) {
    messageDiv.textContent = 'YOU WIN!';
    disableLetters();
  } else if (lives === 0) {
    messageDiv.textContent = `YOU LOSE! The word was ${chosenWord}`;
    display = chosenWord.split('');
    updateDisplay();
    disableLetters();
  }
}

function disableLetters() {
  document.querySelectorAll('button.letter').forEach(btn => btn.disabled = true);
}

function createLetterButtons() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  alphabet.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.classList.add('letter');
    btn.onclick = () => checkLetter(letter);
    lettersDiv.appendChild(btn);
  });
}

createLetterButtons();
updateDisplay();
