// DOM Elements
const time = document.querySelector('.time'),
  day = document.querySelector('.day'),
  quote = document.querySelector('.quote'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  body = document.querySelector('body'),
  div = document.querySelector('.div'),
  buttonImg = document.querySelector('.buttonImg'),
  buttonQ = document.querySelector('.buttonQ'),
  focus = document.querySelector('.focus');
//quote
let a = `https://api.chucknorris.io/jokes/random`,
   xhr = new XMLHttpRequest(),
   bitdata;


// Options
const showAmPm = false;
let iImj = randomInteger(1, 20);
let numberPic = iImj%20 + 1;

// случайное число от min до (max+1)
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

buttonQ.addEventListener('click', changeQuote);
function changeQuote (){
  xhr.open('GET', a, false);
  xhr.send();
  bitdata = JSON.parse(xhr.responseText);
  quote.textContent = bitdata.value;
}



buttonImg.addEventListener('click', changeImg);
function changeImg() {
  if (div.style.opacity === "0") {
    ++iImj;
    numberPic = iImj%20 + 1;
    setBgDiv();
    setTimeout(changeOpacity, 400);
    buttonImg.disabled = true;
    setTimeout(function() { buttonImg.disabled = false }, 1400);
  } else {
    ++iImj;
    numberPic = iImj%20 + 1;
    setBgGreet();
    setTimeout(changeOpacity, 400);
    buttonImg.disabled = true;
    setTimeout(function() { buttonImg.disabled = false }, 1400);
  }
}

function changeOpacity() {
  if (div.style.opacity === "0") {
    div.style.opacity = "1";
  } else  div.style.opacity = "0"
}


// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  // hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}:${addZero(min)}:${addZero(
    sec)} ${showAmPm ? amPm : ''}`;
  if (sec === 0 && min === 0) {
    changeImg();
  }
  setTimeout(showTime, 1000);
}
// Show Day
function ShowDay() {
  let today = new Date();
  let daysW = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  dayW = today.getDay();
  dayDate = today.getDate();
  dayMonth = today.getMonth();
  day.innerHTML = `${daysW[dayW]}, ${dayDate} ${months[dayMonth].toLocaleLowerCase()}`;
}
// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    body.style.backgroundImage =
    `url(/assets/images/night/${addZero(numberPic)}.jpg)`;
    greeting.textContent = 'Good Night,';
  } else if (hour < 12) {
    // Morning
    body.style.backgroundImage =
      `url(/assets/images/morning/${addZero(numberPic)}.jpg)`; https://github.com/irinainina/ready-projects//blob/fd70d61fa141390d8816066d3fb5fff138e119d7/momentum/assets/images/morning/01.jpg
    greeting.textContent = 'Good Morning,';
  } else if (hour < 18) {
    // Afternoon
    body.style.backgroundImage =
      `url(/assets/images/day/${addZero(numberPic)}.jpg)`;
    greeting.textContent = 'Good Afternoon,';
  } else {
    // Evening
    body.style.backgroundImage =
      `url(/assets/images/evening/${addZero(numberPic)}.jpg)`;
    greeting.textContent = 'Good Evening,';
    // document.body.style.color = 'white';

  }
}
setBgDiv();
function setBgDiv() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    div.style.backgroundImage =
    `url(/assets/images/night/${addZero(numberPic)}.jpg)`;
  } else if (hour < 12) {
    // Morning
    div.style.backgroundImage =
      `url(/assets/images/morning/${addZero(numberPic)}.jpg)`;
  } else if (hour < 18) {
    // Afternoon
    div.style.backgroundImage =
      `url(/assets/images/day/${addZero(numberPic)}.jpg)`;
  } else {
    // Evening
    div.style.backgroundImage =
      `url(/assets/images/evening/${addZero(numberPic)}.jpg)`;
  }
}


// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (+name.textContent === 0) getName();
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    if (+name.textContent === 0) getName();
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (+focus.textContent === 0) getFocus();
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    if (+focus.textContent === 0) getFocus();
    localStorage.setItem('focus', e.target.innerText);
  }
}
function clear(e) {
  e.target.innerText = '';
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clear);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clear);

// Run
showTime();
setBgGreet();
getName();
getFocus();
ShowDay();
changeQuote();