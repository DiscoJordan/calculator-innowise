import { state } from './modules/state.js';
import { toggleTheme } from './modules/theme.js';
import { handleOperator } from './modules/handlers.js';
import { updateDisplay } from './modules/display.js';
import { calculate } from './modules/operations.js';
import { handleValue } from './modules/handlers.js';
import './style/style.css';


toggleTheme();


document.querySelectorAll('.btn').forEach((button) => {

  button.addEventListener('click', (event) => {

    let buttonValue = event.currentTarget.value;
    if (!isNaN(buttonValue) || buttonValue === '.' || buttonValue === '%') {
      handleValue(buttonValue);
    } else if (buttonValue === 'clear') {
      state.currentValue = '0';
      state.firstValue = null;
      state.secondValue = null;
      state.operator = null;
      state.lastOperation = null;
      updateDisplay();
    } else if (
      buttonValue === 'negate' &&
      state.currentValue !== '0' &&
      state.currentValue !== 'Divide by zero'
      && state.currentValue !== 'Not a Number'

    ) {
      if (!state.operator && !state.secondValue) {
        let currentValueCopy = state.currentValue;
        state.lastOperation = state.currentValue;
        while (currentValueCopy.toString().includes('%')) {
          state.currentValue = parseFloat(state.currentValue) / 100;
          currentValueCopy = currentValueCopy.toString().slice(0, -1);
        }
        state.currentValue = -state.currentValue;
        updateDisplay();
      } else if (state.operator && state.secondValue) {   
        calculate(true);
        state.currentValue = state.currentValue*-1;
        updateDisplay();
      }

    } else if (
      ['/', '*', '-', '+'].includes(buttonValue) &&
      state.currentValue !== 'Divide by zero' && state.currentValue !== 'Not a Number'
    ) {
      handleOperator(buttonValue);
    } else if (
      buttonValue === 'equal' &&
      state.currentValue &&
      state.operator &&
      state.secondValue
    ) {
      calculate();
    } else if (
      buttonValue === 'equal' &&
      !state.operator &&
      !state.secondValue &&
      state.currentValue.toString().includes('%')
    ) {
      state.operator = '%';
      calculate();
    } else if (buttonValue === 'theme') toggleTheme();
  });
});
















// let display = document.getElementById('currentValue');
// let smallDisplay = document.getElementById('lastOperation');
// let themeImage = document.getElementById('themeImage');

// let currentValue = '0';
// let firstValue = null;
// let secondValue = null;
// let operator = null;
// let lastOperation = null;

// toggleTheme();
// function toggleTheme() {
//   const currentTheme = document.documentElement.getAttribute('data-theme');
//   const newTheme = currentTheme === 'light' ? 'dark' : 'light';
//   document.documentElement.setAttribute('data-theme', newTheme);
//   localStorage.setItem('theme', newTheme);
//   themeImage.src =
//     currentTheme === 'light'
//       ? 'https://i.imgur.com/snp1idS.png'
//       : 'https://i.imgur.com/JZfjpM8.png';
// }

// const savedTheme = localStorage.getItem('theme') || 'light';
// document.documentElement.setAttribute('data-theme', savedTheme);


// function handleValue(value) {
//   if (value === '.') {
//     if (!operator && !currentValue.toString().includes('.')) {
//       currentValue += '.';
//     } else if (
//       operator &&
//       secondValue &&
//       !secondValue.toString().includes('.')
//     ) {
//       currentValue += '.';
//     }
//   } else if (value === '%') {
//     if (!operator || secondValue.length > 0) {
//       currentValue += '%';
//     }
//   } else {
//     if (secondValue === '0') {
//       currentValue = currentValue.toString().slice(0, -1);
//       currentValue += value;
//     } else {
//       currentValue.toString() === '0' || currentValue == 'Divide by zero'
//         ? (currentValue = value)
//         : (currentValue += value);
//     }
//   }

//   if (operator) {
//     secondValue = currentValue
//       .toString()
//       .split(firstValue + operator)
//       .join('');
//   }
//   if (
//     (operator && secondValue > 94906264) ||
//     (!operator && currentValue > 94906264)
//   ) {
//     currentValue = currentValue.toString().slice(0, -1);
//     if (secondValue) {
//       secondValue = secondValue.toString().slice(0, -1);
//     }
//   }
//   updateDisplay();
// }

// function handleOperator(currentOperator) {
//   if (operator && secondValue) {
//     calculate();
//   } else if (operator && !secondValue) {
//     operator = currentOperator;
//     currentValue = currentValue.toString().slice(0, -1);
//   }
//   operator = currentOperator;
//   firstValue = currentValue;
//   if (currentValue !== 'Divide by zero') {
//     currentValue += operator;
//   }

//   updateDisplay();
// }

// function calculate(negate = 0) {

//   let secondValueCopy = secondValue || 0;

//   if (currentValue.toString()[0] == '-' && operator == '-') {
//     firstValue = '-' + currentValue.toString().split(operator)[1];
//   } else {
//     firstValue = currentValue.toString().split(operator)[0];
//   }

//   let firstValueCopy = firstValue;

//   if (secondValueCopy?.toString()?.includes('%')) {
//     while (secondValueCopy.toString().includes('%')) {
//       secondValue = parseFloat(secondValue) / 100;
//       secondValueCopy = secondValueCopy.toString().slice(0, -1);
//     }
//     if (!firstValueCopy.toString().includes('%')) {
//       secondValue = secondValue * firstValue;
//     }
//   }

//   while (firstValueCopy.toString().includes('%')) {
//     firstValue = parseFloat(firstValue) / 100;
//     firstValueCopy = firstValueCopy.toString().slice(0, -1);
//   }

//   firstValue = parseFloat(firstValue);
//   secondValue = parseFloat(secondValue);
//   lastOperation = currentValue;
//   if (negate) {
//     lastOperation = '-(' + currentValue + ')';
//   }

//   if (operator === '+') currentValue = firstValue + secondValue;
//   else if (operator === '-') currentValue = firstValue - secondValue;
//   else if (operator === '*') currentValue = firstValue * secondValue;
//   else if (operator === '/') {
//     currentValue = firstValue / secondValue;
//     if (secondValue == 0) {
//       currentValue = 'Divide by zero';
//     }
//   } else if (operator === '%') {
//     currentValue = currentValue.toString().split('%');
//     if (currentValue[1]) {
//       currentValue = currentValue[0] % currentValue[1];
//     } else {
//       currentValue = currentValue[0] / 100;
//     }
//   }

//   if (currentValue.toString().includes('.')) {
//     if (currentValue.toString().split('.')[1].length > 9) {
//       currentValue = parseFloat(Number(currentValue).toFixed(9));
//     }
//   }

//   firstValue = currentValue;
//   secondValue = null;
//   operator = null;
//   updateDisplay();
// }