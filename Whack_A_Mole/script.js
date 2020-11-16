const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message h2');
const confirmBtn = document.querySelector('.confirm');
const levelBoard = document.querySelector('.level');
const bestScoreBoard = document.querySelector('.best_score');
const complexityIndex = 1.3; //can be from 1 
const minTime = 800;
const maxTime = 2000;
const poitsForNextLevel = 3; // int
const numberOfMoles = 3; // int
const victoria = new Audio("pobeda.mp3");
const caught = new Audio('caught.mp3');

let lastHole;
let lasMole;
let score = 0;
let isGamePlay = false;
let currentMinTime;
let currentMaxTime;
let currentNumberOfMoles;


function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  if (currentNumberOfMoles > 0) {
        const time = randomTime(currentMinTime, currentMaxTime);
        const hole = randomHole(holes);
         hole.classList.add('up');
        --currentNumberOfMoles;
        setTimeout(() => {
            hole.firstElementChild.addEventListener('transitionend', end)
            hole.classList.remove('up');
            function end() {
                peep();
                hole.firstElementChild.removeEventListener('transitionend', end);
                }
            }
            , time)
  } else {
      isGamePlay = false;
      setBestScore();
      setLevel();
    }
}

function startGame() {
    if(isGamePlay) return;
    setСomplexity ();
    scoreBoard.textContent = 0;
    score = 0;
    lasMole = 0;
    peep();
}

function bonk(e) {
  if(!e.isTrusted || this.dataset.key === lasMole) return;
  caught.play();
  score++;
  lasMole = this.dataset.key;
  scoreBoard.textContent = score;
}

function setBestScore() {
    if (scoreBoard.textContent > bestScoreBoard.textContent) {
        bestScoreBoard.textContent = scoreBoard.textContent;
        localStorage.setItem('bestScore', bestScoreBoard.textContent);
    }
}

function setСomplexity () {
    currentNumberOfMoles = numberOfMoles*levelBoard.textContent;
    currentMinTime = minTime / (complexityIndex**levelBoard.textContent);
    currentMaxTime = maxTime / (complexityIndex**levelBoard.textContent);
}

function setLevel () {
    if (scoreBoard.textContent >= poitsForNextLevel) {
        ++levelBoard.textContent;
        localStorage.setItem('lelel', levelBoard.textContent);
        showMessage();
        victoria.play();
    }
}

function getLevel() {
    if (localStorage.getItem('lelel') === null) {
        levelBoard.textContent = 1;
    } else {
        levelBoard.textContent = localStorage.getItem('lelel');
    }
}

function getBestScore() {
    if (localStorage.getItem('bestScore') === null) {
        bestScoreBoard.textContent = 0;
    } else {
        bestScoreBoard.textContent = localStorage.getItem('bestScore');
    }
}

function reset(){
    levelBoard.textContent = 1;
    bestScoreBoard.textContent = 0;
    localStorage.setItem('lelel', levelBoard.textContent);
    localStorage.setItem('bestScore', bestScoreBoard.textContent);
}

function showMessage() {
    message.textContent = `You have a new level №${levelBoard.textContent}`;
    overlay.removeEventListener('transitionend', setDisplayNone)
    overlay.classList.remove('display-none');
    setTimeout(() => {
        overlay.classList.remove('opacity-null');
    }, 1);
}

function setDisplayNone() {
    overlay.classList.add('display-none')
}

moles.forEach(mole => mole.addEventListener('click', bonk));

resetBtn.addEventListener('click', reset);

confirmBtn.addEventListener('click', () => {
    overlay.classList.add('opacity-null');
    overlay.addEventListener('transitionend', setDisplayNone);
})

startBtn.addEventListener('click', () => {
    startGame();
    isGamePlay = true;
})
    
getBestScore();
getLevel();

