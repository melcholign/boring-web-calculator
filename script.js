let x, y, op;
x = y = op = '';

const operators = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide,
}

const currentDisplay = document.querySelector('#display #current');

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

function operate(a, op, b) {
    return op(a, b);
}

function evaluate() {
    if (x && op && y) {
        x = operate(+x, operators[op], +y);
        op = '';
        y = '';
    }
}

function updateDisplay() {
    currentDisplay.value = `${x ? x + ' ' : ''}${x && op ? op + ' ' : ''}${y ? y + ' ' : ''}`;
}

document.querySelector('#controls').addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') return;

    const btnTxt = event.target.textContent;

    if ('0' <= btnTxt && btnTxt <= '9') {

        if (op) {
            y += btnTxt;
        } else {
            x += btnTxt;
        }

    } else if (btnTxt in operators) {

        if (y) {
            evaluate();
        }

        op = btnTxt;

    } else if (btnTxt === '=') {
        evaluate();
    }

    updateDisplay();
});
