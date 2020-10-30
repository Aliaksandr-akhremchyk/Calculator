let numbers = document.querySelectorAll(".number"),
    operations = document.querySelectorAll(".operator"),
    clearBtns = document.querySelectorAll(".clear-btn"),
    decimalBtn = document.getElementById("decimal"),
    result = document.getElementById("result"),
    display = document.getElementById("display"),
    MemoryNewNumber = false,
    MemoryPendingOperation = "",
    changeOperation = false,
    MemoryFirstNumber = undefined,
    MemorySecondNumber = 0;

numbers.forEach((el) => {el.addEventListener("click", (e) => {
    numberPress(e.target.textContent);
});})

operations.forEach((el) => {el.addEventListener("click", (e) => {
    operationPress(e.target.textContent);
});})

clearBtns.forEach((el) => {el.addEventListener("click", (e) => {
    clear(e.target.textContent);
});})

decimalBtn.addEventListener("click", decimal);
function decimal() {
    let localDecimalMemory = display.value;
        if(MemoryNewNumber) {
        localDecimalMemory = "0.";
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf(".") === -1) {
            localDecimalMemory += "."
        }
    };
    display.value = localDecimalMemory;
    changeOperation = false;
    MemorySecondNumber = +display.value;
};

result.addEventListener("click", function(){
     calc();
     MemoryFirstNumber = +display.value;
     changeOperation = true;
     MemoryNewNumber = true;
});

function numberPress(number) {
    if(MemoryNewNumber) {
            display.value = number;
            MemoryNewNumber = false;
        } else {
            if(display.value === "0") {
                display.value = number;
            } else if (display.value.length < 16) {
                display.value += number;
            };
    };
    MemorySecondNumber = +display.value;
    changeOperation = false;
};

function operationPress(op) {
   if (!changeOperation && MemoryFirstNumber && MemoryPendingOperation ) {
    calc();
   };
    MemoryFirstNumber = +display.value;
    MemoryPendingOperation = op;
    MemoryNewNumber = true;
    changeOperation = true;
};

let calc = () => {
    if (MemoryPendingOperation === "+") {
        display.value = MemoryFirstNumber + MemorySecondNumber;
     } else if (MemoryPendingOperation === "–") {
         display.value = MemoryFirstNumber - MemorySecondNumber; 
     } else if (MemoryPendingOperation === "X") {
         display.value = MemoryFirstNumber * MemorySecondNumber;
     } else if (MemoryPendingOperation === "/") {
         display.value = MemoryFirstNumber / MemorySecondNumber;  
     } 
     let a = +display.value;
     display.value = +a.toFixed(10);
     if (display.value > 9999999999999999 || display.value < -9999999999999999) {
        display.value = 'Перебор';
     } MemoryNewNumber = true;
};

function clear(id) {
        if(id === "ce") {
            display.value = "0" // здесь строка? или число?
            MemoryNewNumber = true;
        } else if(id === "c") {
            display.value = "0" 
            MemoryNewNumber = true;
            MemoryPendingOperation = "";
            MemoryFirstNumber = undefined,
            MemorySecondNumber = 0;
        }
};

// Move calc
let div = document.getElementById('calculator');
let holder = document.getElementById('holder');
holder.addEventListener('mousedown', move = () => {
  document.addEventListener('mousemove', listener);
});
holder.addEventListener('mouseup', function stop() {
  document.removeEventListener('mousemove', listener);
});

let listener = (e) => {
  div.style.left = e.pageX - 27 + "px";
  div.style.top = e.pageY - 13 + "px";
};