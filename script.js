var numbers = document.querySelectorAll(".number"),
    operations = document.querySelectorAll(".operator"),
    clearBtns = document.querySelectorAll(".clear-btn"),
    decimalBtn = document.getElementById("decimal"),
    result = document.getElementById("result"),
    display = document.getElementById("display"),
    MemoryNewNumber = false,
    MemoryPendingOperation = "",
    changeOperation = false,
    MemoryFirstNumber = undefined,
    MemorySecondNumber = undefined;

for(var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener("click", function(e){
        numberPress(e.target.textContent);
    });
};

for(var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
        operationBtn.addEventListener("click", function(e){
            operationPress(e.target.textContent);
    });
};

for(var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
        clearBtn.addEventListener("click", function(e){
        clear(e.target.textContent);
    });
};

decimalBtn.addEventListener("click", decimal);
function decimal() {
    var localDecimalMemory = display.value;
    
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

function calc() {
    if (MemoryPendingOperation === "+") {
        display.value = MemoryFirstNumber + MemorySecondNumber;
     } else if (MemoryPendingOperation === "-") {
         display.value = MemoryFirstNumber - MemorySecondNumber; 
     } else if (MemoryPendingOperation === "*") {
         display.value = MemoryFirstNumber * MemorySecondNumber;
     } else if (MemoryPendingOperation === "/") {
         display.value = MemoryFirstNumber / MemorySecondNumber;  
     } 
     let a = +display.value;
     display.value = +a.toFixed(15);
     if (display.value > 9999999999999999 || display.value < -9999999999999999) {
        display.value = 'Перебор';
     }
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
            MemorySecondNumber = undefined;
        }
};

