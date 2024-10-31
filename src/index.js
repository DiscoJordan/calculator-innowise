import { add } from './operations/add.js';
import { divide } from './operations/divide.js';
import { multiply } from './operations/multiply.js';
import { subtract } from './operations/subtract.js';

let display = document.getElementById('currentValue');

let currentValue = '0';
let previousValue = null;
let operator = null;
let secondArg = null;

function updateDisplay() {
  display.value = currentValue;
}

function handleNumber(number) {
  currentValue === '0' ? (currentValue = number) : (currentValue += number);
  updateDisplay();
}

function handleOperator(currentOperator) {
  if (operator && previousValue && currentValue) {
    calculate(previousValue, currentValue, operator);
    previousValue = null;
  }

  operator = currentOperator;
  previousValue = currentValue;
  currentValue += currentOperator;

  updateDisplay();
}

function calculate(a, b, operation) {
  b = currentValue.split(previousValue + operator).join('');
  const value1 = parseFloat(a);
  const value2 = parseFloat(b);
  if (operation === '+') currentValue = add(value1, value2);
  else if (operation === '-') currentValue = subtract(value1, value2);
  else if (operation === '*') currentValue = multiply(value1, value2);
  else if (operation === '/') currentValue = divide(value1, value2);
  if (currentValue.toString().includes('.')) {
    if (currentValue.toString().split('.')[1].length > 5) {
      currentValue = Number(currentValue).toFixed(5);
    }
  }

  updateDisplay();
  previousValue = null;
  operator = null;
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    let buttonValue = event.currentTarget.value;
    if (!isNaN(buttonValue)) {
      handleNumber(buttonValue);
    } else if (buttonValue === '.' && !currentValue.includes('.')) {
      currentValue += '.';
      updateDisplay();
    } else if (buttonValue === 'clear') {
      currentValue = '0';
      previousValue = null;
      operator = null;
      updateDisplay();
    } else if (buttonValue === 'negate' && currentValue !== '0') {
      currentValue = -currentValue;
      updateDisplay();
    } else if (['/', '*', '-', '+'].includes(buttonValue)) {
      handleOperator(buttonValue);
    } else if (buttonValue === 'equal' && currentValue && operator) {
      calculate(previousValue, currentValue, operator);
      previousValue = null;
    }
    console.log('currentValue', currentValue);
    console.log('previousValue', previousValue);
    console.log('operator', operator);
  });
});
