import { handleValue, handleOperator, calculate } from './operations.js';
import { updateDisplay } from './display.js';
import { state } from './state.js';
import { toggleTheme } from './theme.js';

export function addEventListeners(themeImage) {
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const buttonValue = event.currentTarget.value;

      if (!isNaN(buttonValue) || buttonValue === '.' || buttonValue === '%') {
        handleValue(buttonValue);
      } else if (buttonValue === 'clear') {
        resetCalculator();
      } else if (buttonValue === 'negate') {
        handleNegate();
      } else if (['/', '*', '-', '+'].includes(buttonValue)) {
        handleOperator(buttonValue);
      } else if (buttonValue === 'equal' && state.currentValue && state.operator && state.secondValue) {
        calculate();
      } else if (!state.operator && !state.secondValue && state.currentValue.includes('%')) {
        state.operator = '%';
        calculate();
      } else if (buttonValue === 'theme') {
        toggleTheme(themeImage);
      }
    });
  });
}

function resetCalculator() {
  state.currentValue = '0';
  state.firstValue = null;
  state.secondValue = null;
  state.operator = null;
  state.lastOperation = null;
  updateDisplay();
}

function handleNegate() {
   
   
  if (state.currentValue !== '0' && state.currentValue !== 'Divide by zero') {
    if (!state.operator && !state.secondValue) {
      state.currentValue = -state.currentValue;
    } else if (state.operator && state.secondValue) {
      calculate(true);
      state.currentValue = -state.currentValue;
    }

    updateDisplay();
  }
}
