function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (operator, a, b) {
    switch (operator) {
        case "+":
            return add (a, b);
        case "-":
            return subtract (a, b);
        case "*":
            return multiply (a, b);
        case "/":
            return divide (a, b);
    }
}

function addToDisplay (event) {
    if (result !== undefined) {
        wipeScreen ();
        result = undefined;
    }
    screen.textContent += event.target.textContent;
}

function wipeScreen () {
    screen.textContent = "";

}

function calculateAndShow () {
    if (operator === undefined || result !== undefined) {
        return;
    }

    b = parseInt(screen.textContent);
    wipeScreen ();
    result = operate (operator, a, b);

    if (result.toString().length > 10) {
        result = result.toString().split("").slice(0, 6).join("");
    };

    screen.textContent = result;
}

let a;
let b;
let operator;
let result;

const digits = document.querySelectorAll(".digits");
const digitsArray = [...digits];
digitsArray.forEach((item) => {
    item.addEventListener("click", addToDisplay)
});

const screen = document.querySelector("#screen");

const equal = document.querySelector("#equal");
equal.addEventListener("click", calculateAndShow);

const operators = document.querySelectorAll(".operators");
const operatorsArray = [...operators];
operatorsArray.forEach((item) => {
    item.addEventListener("click", (event) => {
        if (a !== undefined) {
            calculateAndShow ();
        }

        if (screen.textContent !== "") {
            a = parseInt(screen.textContent);
        };

        wipeScreen ();
        operator = event.target.textContent;
    });
});

clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    wipeScreen ();
    a = undefined;
    b = undefined;
    operator = undefined;
    result = undefined;
});

const point = document.querySelector("#point");
point.addEventListener("click", () => {
    if (screen.textContent.split("").includes(".")) {
        return;
    };
    screen.textContent += ".";
});

const del = document.querySelector("#del");
del.addEventListener("click", () => {
    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
});

const body = document.querySelector("body");
body.addEventListener("keypress", (event) => {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        screen.textContent += event.key;
    };
});