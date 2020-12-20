const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const inputs = document.querySelectorAll('.controls input');
let checkboxSize = false;
let checkboxColor = false;
let stop = false;
let color = '#ff0000';
let size = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = size;
ctx.strokeStyle = color;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let sizeVariable = 10;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  
  if (checkboxSize) ctx.lineWidth = size;
  if (checkboxColor) ctx.strokeStyle = color;
  if(e.type === 'dblclick') {
      console.log(e.type);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(lastX, lastY);
      ctx.stroke();
      isDrawing = false;
      return;
  }
  if(!checkboxColor && !stop) {
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      hue++;
    if (hue >= 360) {
        hue = 0;
    }
  }
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if(!checkboxSize && !stop) {
    if (sizeVariable >= 100 || sizeVariable <= 1) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth = sizeVariable;
        sizeVariable++
    } else {
      ctx.lineWidth = sizeVariable;
      sizeVariable--;
    }
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

function handleUpdate() {
    if (this.id === "size") size = this.value;
    if (this.id === "color") color = this.value;
    if (this.id === "checkbox-color") checkboxColor = this.checked;
    if (this.id === "checkbox-size") checkboxSize = this.checked;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('dblclick', (e) => {
  isDrawing = true;
  draw(e);
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

buttonStop.addEventListener('click', () => {
  buttonStop.classList.toggle('stop');
  stop = !stop;
  inputs.forEach(input => input.disabled = !input.disabled);
})

window.addEventListener(`resize`, event => {
  let a = ctx.getImageData(0,0,canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.putImageData(a,0, 0);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  stop ? ctx.lineWidth = sizeVariable : ctx.lineWidth = size;
  stop ? ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` : ctx.strokeStyle = color;
});