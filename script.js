const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');
    const action = button.getAttribute('data-action');

    if (number !== null) {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      if (number === '.' && currentInput.endsWith('.')) return;
      currentInput += number;
      display.value = currentInput;
    } else if (action) {
      handleAction(action);
    }
  });
});

function handleAction(action) {
  switch(action) {
    case 'clear':
      currentInput = '';
      display.value = '';
      break;
    case 'backspace':
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
      break;
    case 'add':
      appendOperator('+');
      break;
    case 'subtract':
      appendOperator('-');
      break;
    case 'multiply':
      appendOperator('*');
      break;
    case 'divide':
      appendOperator('/');
      break;
    case 'equals':
      calculateResult();
      break;
  }
}

function appendOperator(operator) {
  if (resultDisplayed) {
    resultDisplayed = false;
  }
  if (currentInput.length === 0) return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  display.value = currentInput;
}

function calculateResult() {
  try {
    const sanitized = currentInput.replace(/[^0-9+\-*/.]/g, '');
    const evalResult = Function('"use strict";return (' + sanitized + ')')();
    display.value = evalResult;
    currentInput = evalResult.toString();
    resultDisplayed = true;
  } catch {
    display.value = 'Error';
    currentInput = '';
  }
}
