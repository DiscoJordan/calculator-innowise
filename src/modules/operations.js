import { state } from "./state.js";
import { updateDisplay } from "./display.js";

export  function calculate(negate = 0) {

    let secondValueCopy = state.secondValue || 0;
  
    if (state.currentValue.toString()[0] == '-' && state.operator == '-') {
      state.firstValue = '-' + state.currentValue.toString().split(state.operator)[1];
    } else {
      state.firstValue = state.currentValue.toString().split(state.operator)[0];
    }
  
    let firstValueCopy = state.firstValue;
  
    if (secondValueCopy?.toString()?.includes('%')) {
      while (secondValueCopy.toString().includes('%')) {
        state.secondValue = parseFloat(state.secondValue) / 100;
        secondValueCopy = secondValueCopy.toString().slice(0, -1);
      }
      if (!firstValueCopy.toString().includes('%')) {
        state.secondValue = state.secondValue * state.firstValue;
      }
    }
  
    while (firstValueCopy.toString().includes('%')) {
      state.firstValue = parseFloat(state.firstValue) / 100;
      firstValueCopy = firstValueCopy.toString().slice(0, -1);
    }
  
    state.firstValue = parseFloat(state.firstValue);
    state.secondValue = parseFloat(state.secondValue);
    state.lastOperation = state.currentValue;
    if (negate) {
        state.lastOperation = '-(' + state.currentValue + ')';
    }
  
    if (state.operator === '+') state.currentValue = state.firstValue + state.secondValue;
    else if (state.operator === '-') state.currentValue = state.firstValue - state.secondValue;
    else if (state.operator === '*') state.currentValue = state.firstValue * state.secondValue;
    else if (state.operator === '/') {
        state.currentValue = state.firstValue / state.secondValue;
      if (state.secondValue == 0) {
        state.currentValue = 'Divide by zero';
      }
    } else if (state.operator === '%') {
        state.currentValue = state.currentValue.toString().split('%');
      if (state.currentValue[1]) {
        state.currentValue = state.currentValue[0] % state.currentValue[1];
      } else {
        state.currentValue = state.currentValue[0] / 100;
      }
    }
  
    if (state.currentValue.toString().includes('.')) {
      if (state.currentValue.toString().split('.')[1].length > 9) {
        state.currentValue = parseFloat(Number(state.currentValue).toFixed(9));
      }
    }
  
    state.firstValue = state.currentValue;
    state.secondValue = null;
    state.operator = null;
    updateDisplay();
  }