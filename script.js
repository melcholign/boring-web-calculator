let x, y, op;
let error = false;

const EMPTY = '';
const MATH_ERROR = 'Math Error';
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

    if (!isFinite(x)) {
        error = true;
        x = '';
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
    error = false;
}

function updateCurrentDisplay() {
    currentDisplay.value = error ? MATH_ERROR : x + (op && ' ') + op + (y && ' ') + y;
}

function updateSuggestionDisplay() {
    const suggestion = y && roundToNDecimals(operate(+x, operators[op], +y), decimalFigures);
    suggestionDisplay.value = (!isFinite(suggestion)) ? MATH_ERROR : suggestion;
}

function getModifiedNumber(number, modifier) {
    if (number === '0') {
        number = modifier;
    } else if (modifier !== '.' || !number.includes('.')) {
        number += modifier;
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

        error = false;

        if (op) {
            y = getModifiedNumber(y, btnTxt);
        } else {
            x = getModifiedNumber(x, btnTxt);
        }

    } else if (btnTxt in operators) {

        if (y) {
            evaluate();
        }

        if (x) {
            op = btnTxt;
        }

    } else if (btnTxt in actions) {
        actions[btnTxt]();
    }

    updateSuggestionDisplay();
    updateCurrentDisplay();
});
