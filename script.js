let x, y, op;

const EMPTY = '';
const decimalFigures = 6;
const currentDisplay = document.querySelector('#display #current');
const suggestionDisplay = document.querySelector('#display #suggestion');

const operators = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide,
    '^': power,
    '%': modulo,
}
const actions = {
    '=': evaluate,
    'DEL': backspace,
    'AC': clear,
}

clear();

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(a, b) {
    return a ** b;
}

function modulo(a, b) {
    return a % b;
}

function operate(a, op, b) {
    return op(a, b);
}

function evaluate() {
    if (x && op && y) {
        updateSuggestionDisplay();
        x = roundToNDecimals(operate(+x, operators[op], +y) + '', decimalFigures);
        op = EMPTY;
        y = EMPTY;
    }
}

function backspace() {
    if (y) {
        y = y.slice(0, -1);
    } else if (op) {
        op = op.slice(0, -1);
    } else {
        x = x.slice(0, -1);
    }
}

function clear() {
    x = y = op = EMPTY;
    suggestionDisplay.value = '';
}

function updateCurrentDisplay() {
    currentDisplay.value = x + (op && ' ') + op + (y && ' ') + y;
}

function updateSuggestionDisplay() {
    suggestionDisplay.value = y && roundToNDecimals(operate(+x, operators[op], +y), decimalFigures);
}

function getModifiedNumber(number, modifier){
    if(modifier !== '.' || !number.includes('.')) {
        number += modifier;
    } else if (number === '0') {
        number = modifier;
    }

    return number;
}

function roundToNDecimals(number, n) {
    const powerOfTen = 10 ** n;
    return Math.floor(number * powerOfTen) / (powerOfTen);
}

document.querySelector('#controls').addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') return;

    const btnTxt = event.target.textContent;

    if ('0' <= btnTxt && btnTxt <= '9' || btnTxt === '.') {

        if (op) {
            y = getModifiedNumber(y, btnTxt);
        } else {
            x = getModifiedNumber(x, btnTxt);
        }

    } else if (btnTxt in operators) {

        if (y) {
            evaluate();
        }

        op = btnTxt;

    } else if (btnTxt in actions) {
        actions[btnTxt]();
    }

    updateSuggestionDisplay();
    updateCurrentDisplay();
});
