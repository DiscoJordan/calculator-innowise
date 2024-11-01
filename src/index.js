import { add } from './operations/add.js';
import { divide } from './operations/divide.js';
import { multiply } from './operations/multiply.js';
import { subtract } from './operations/subtract.js';

let display = document.getElementById('currentValue');
let smallDisplay = document.getElementById('lastOperation');

let currentValue = '0';
let firstValue = null;
let secondValue = null;
let operator = null;
let lastOperation = null;

function updateDisplay() {
  display.value = currentValue;
  smallDisplay.value = lastOperation;
  display.scrollLeft = display.scrollWidth;
  console.log('firstValue: ', firstValue);
  console.log('operator: ', operator);
  console.log('secondValue: ', secondValue);
  console.log('-------------');
}

function handleNumber(numberOrDot) {
  if (numberOrDot === '.') {
    if (!operator && !currentValue.toString().includes('.')) {
      currentValue += '.';
    } else if (
      operator &&
      secondValue &&
      !secondValue.toString().includes('.')
    ) {
      currentValue += '.';
    }
  } else {
    if (secondValue === '0' ) {
      currentValue = currentValue.toString().slice(0, -1);
      currentValue += numberOrDot;
    } else {
      currentValue == 0 || currentValue == 'Divide by zero'
        ? (currentValue = numberOrDot)
        : (currentValue += numberOrDot);
    }
  }

  if (operator) {
    secondValue = currentValue
      .toString()
      .split(firstValue + operator)
      .join('');
  }
  updateDisplay();
}

function handleOperator(currentOperator) {
  if (operator && secondValue) {
    calculate();
  } else if (operator && !secondValue) {
    operator = currentOperator;
    currentValue = currentValue.toString().slice(0, -1);
  }
  operator = currentOperator;
  firstValue = currentValue;
  if (currentValue !== 'Divide by zero') {
    currentValue += operator;
  }

  updateDisplay();
}

function calculate(negate = 0) {
  firstValue = parseFloat(currentValue);
  secondValue = parseFloat(secondValue);
  console.log('firstValue:', firstValue);
  console.log('operator:', operator);
  console.log('secondValue:', secondValue);
  console.log('-------------');
  lastOperation = currentValue;
  if (negate) {
    lastOperation = `-(${currentValue})`;
  }

  if (operator === '+') currentValue = add(firstValue, secondValue);
  else if (operator === '-') currentValue = subtract(firstValue, secondValue);
  else if (operator === '*') currentValue = multiply(firstValue, secondValue);
  else if (operator === '/') {
    currentValue = divide(firstValue, secondValue);
    if (secondValue == 0) {
      currentValue = 'Divide by zero';
    }
  }

  if (currentValue.toString().includes('.')) {
    if (currentValue.toString().split('.')[1].length > 9) {
      currentValue = parseFloat(Number(currentValue).toFixed(9));
    }
  }
  firstValue = currentValue;
  secondValue = null;
  operator = null;
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    let buttonValue = event.currentTarget.value;
    if (!isNaN(buttonValue) || buttonValue === '.') {
      handleNumber(buttonValue);
    } else if (buttonValue === 'clear') {
      currentValue = '0';
      firstValue = null;
      secondValue = null;
      operator = null;
      lastOperation = null;
      updateDisplay();
    } else if (
      buttonValue === 'negate' &&
      currentValue !== '0' &&
      currentValue !== 'Divide by zero'
    ) {
      if (!operator && !secondValue) {
        currentValue = -currentValue;
      } else if (operator && secondValue) {
        calculate(true);
        currentValue = -currentValue;
      }

      updateDisplay();
    } else if (
      ['/', '*', '-', '+'].includes(buttonValue) &&
      currentValue !== 'Divide by zero'
    ) {
      handleOperator(buttonValue);
    } else if (
      buttonValue === 'equal' &&
      currentValue &&
      operator &&
      secondValue
    ) {
      calculate();
    }
  });
});
