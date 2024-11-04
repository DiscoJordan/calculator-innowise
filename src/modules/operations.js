import { state } from './state.js';
import { updateDisplay } from './display.js';

export function handleValue(value) {
  if (value === '.') {
    if (!state.operator && !state.currentValue.includes('.')) {
      state.currentValue += '.';
    } else if (state.operator && state.secondValue && !state.secondValue.includes('.')) {
      state.currentValue += '.';
    }
  } else if (value === '%') {
    if (!state.operator || state.secondValue.length > 0) {
      state.currentValue += '%';
    }
  } else {
    if (state.secondValue === '0') {
      state.currentValue = state.currentValue.slice(0, -1) + value;
    } else {
      state.currentValue = (state.currentValue === '0' || state.currentValue === 'Divide by zero')
        ? value
        : state.currentValue + value;
    }
  }

  if (state.operator) {
    state.secondValue = state.currentValue.split(state.firstValue + state.operator).join('');
  }

  if ((state.operator && state.secondValue > 94906264) || (!state.operator && state.currentValue > 94906264)) {
    state.currentValue = state.currentValue.slice(0, -1);
    if (state.secondValue) {
      state.secondValue = state.secondValue.slice(0, -1);
    }
  }

  updateDisplay();
}

export function handleOperator(currentOperator) {
  if (state.operator && state.secondValue) {
    calculate();
  } else if (state.operator && !state.secondValue) {
    state.operator = currentOperator;
    state.currentValue = state.currentValue.slice(0, -1);
  }
  state.operator = currentOperator;
  state.firstValue = state.currentValue;

  if (state.currentValue !== 'Divide by zero') {
    state.currentValue += state.operator;
  }

  updateDisplay();
}

export function calculate(negate=false) {
  let secondValueCopy = state.secondValue || 0;


  if (state.currentValue.startsWith('-') && state.operator === '-') {
    state.firstValue = '-' + state.currentValue.split(state.operator)[1];
  } else {
    state.firstValue = state.currentValue.split(state.operator)[0];
  }

  let firstValueCopy = state.firstValue;

  if (secondValueCopy.includes('%')) {
    while (secondValueCopy.includes('%')) {
      state.secondValue = parseFloat(state.secondValue) / 100;
      secondValueCopy = secondValueCopy.slice(0, -1);
    }
    if (!firstValueCopy.includes('%')) {
      state.secondValue = state.secondValue * state.firstValue;
    }
  }

  while (firstValueCopy.includes('%')) {
    state.firstValue = parseFloat(state.firstValue) / 100;
    firstValueCopy = firstValueCopy.slice(0, -1);
  }

  state.firstValue = parseFloat(state.firstValue);
  state.secondValue = parseFloat(state.secondValue);
  if (negate){
    state.lastOperation = `-(${state.currentValue})`;
} else{
      state.lastOperation = state.currentValue;
}
  
  if (state.operator === '+') state.currentValue = state.firstValue + state.secondValue;
  else if (state.operator === '-') state.currentValue = state.firstValue - state.secondValue;
  else if (state.operator === '*') state.currentValue = state.firstValue * state.secondValue;
  else if (state.operator === '/') {
    state.currentValue = state.firstValue / state.secondValue;
    if (state.secondValue === 0) {
      state.currentValue = 'Divide by zero';
    }
  } else if (state.operator === '%') {
    const parts = state.currentValue.split('%');
    if (parts[1]) {
      state.currentValue = parts[0] % parts[1];
    } else {
      state.currentValue = parts[0] / 100;
    }
  }

  if (state.currentValue.toString().includes('.') && state.currentValue.toString().split('.')[1].length > 9) {
    state.currentValue = parseFloat(Number(state.currentValue).toFixed(9));
  }

  state.firstValue = state.currentValue;
  state.secondValue = null;
  state.operator = null;
  updateDisplay();
}
