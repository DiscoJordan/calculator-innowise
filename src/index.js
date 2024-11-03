import './style/style.css'
import { add } from './operations/add.js';
import { divide } from './operations/divide.js';
import { multiply } from './operations/multiply.js';
import { subtract } from './operations/subtract.js';


let display = document.getElementById('currentValue');
let smallDisplay = document.getElementById('lastOperation');
let themeImage = document.getElementById('themeImage');


let currentValue = '0';
let firstValue = null;
let secondValue = null;
let operator = null;
let lastOperation = null;
toggleTheme()
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeImage.src =
  currentTheme === 'light'
      ? 'https://i.imgur.com/snp1idS.png'
      : 'https://i.imgur.com/JZfjpM8.png';
}

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);



function updateDisplay() {
  display.value = currentValue;
  smallDisplay.value = lastOperation;
  display.scrollLeft = display.scrollWidth;
}

function handleValue(value) {

  if (value === '.') {
    if (!operator && !currentValue.toString().includes('.')) {
      currentValue += '.';
    } else if (
      operator &&
      secondValue &&
      !secondValue.toString().includes('.')
    ) {
      currentValue += '.';
    }
  } else if (value === '%') {
    if (!operator || secondValue.length > 0) {
      currentValue += '%';
    }
  } else {
    if (secondValue === '0') {
      currentValue = currentValue.toString().slice(0, -1);
      currentValue += value;
    } else {
      currentValue.toString() === '0' || currentValue == 'Divide by zero'
        ? (currentValue = value)
        : (currentValue += value);
    }
  }

  if (operator) {
    secondValue = currentValue
      .toString()
      .split(firstValue + operator)
      .join('');
  }
  if (
    (operator && secondValue > 94906264) ||
    (!operator && currentValue > 94906264)
  ) {
    currentValue = currentValue.toString().slice(0, -1);
    if (secondValue) {
      secondValue = secondValue.toString().slice(0, -1);
    }
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
  let secondValueCopy = secondValue || 0;

  if (currentValue.toString()[0] == '-' && operator=='-')  {
    firstValue = '-' + currentValue.toString().split(operator)[1];
  } else {
    firstValue = currentValue.toString().split(operator)[0];
  }

  let firstValueCopy = firstValue;

  if (secondValueCopy?.toString()?.includes('%')) {
    while (secondValueCopy.toString().includes('%')) {
      secondValue = parseFloat(secondValue) / 100;
      secondValueCopy = secondValueCopy.toString().slice(0, -1);
    }
    if (!firstValueCopy.toString().includes('%')) {
      secondValue = secondValue * firstValue;
    }
  }

  while (firstValueCopy.toString().includes('%')) {
    firstValue = parseFloat(firstValue) / 100;
    firstValueCopy = firstValueCopy.toString().slice(0, -1);
  }

  firstValue = parseFloat(firstValue);
  secondValue = parseFloat(secondValue);
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
  } else if (operator === '%') {
    currentValue = currentValue.toString().split('%');
    console.log(currentValue);
    if (currentValue[1]) {
      currentValue = currentValue[0] % currentValue[1];
    } else {
      currentValue = currentValue[0] / 100;
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
    if (!isNaN(buttonValue) || buttonValue === '.' || buttonValue === '%') {
      handleValue(buttonValue);
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
        let currentValueCopy = currentValue;
        lastOperation = currentValue;
        while (currentValueCopy.toString().includes('%')) {
          currentValue = parseFloat(currentValue) / 100;
          currentValueCopy = currentValueCopy.toString().slice(0, -1);
        }
        currentValue = -currentValue;

        updateDisplay();
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
    } else if (
      !operator &&
      !secondValue &&
      currentValue.toString().includes('%')
    ) {
      operator = '%';
      calculate();
    } else if (buttonValue === 'theme') toggleTheme();
  });
});
