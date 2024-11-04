 import { state } from "./state.js";
 import { updateDisplay } from "./display.js";
 import { calculate } from "./operations.js";
 
 export function handleValue(value) {
    if (value === '.') {
      if (!state.operator && !state.currentValue.toString().includes('.')) {
        state.currentValue += '.';
      } else if (
        state.operator &&
         state.secondValue &&
        ! state.secondValue.toString().includes('.')
      ) {
         state.currentValue += '.';
      }
    } else if (value === '%') {
      if (! state.operator || state.secondValue?.toString().length > 0) {
         state.currentValue += '%';
      }
    } else {
      if ( state.secondValue === '0') {
         state.currentValue =  state.currentValue.toString().slice(0, -1);
         state.currentValue += value;
      } else {
         state.currentValue.toString() === '0' || state.currentValue == 'Divide by zero'
          ? ( state.currentValue = value)
          : ( state.currentValue += value);
      }
    }
  
    if ( state.operator) {
       state.secondValue =  state.currentValue
        .toString()
        .split( state.firstValue +  state.operator)
        .join('');
    }
    if (
      ( state.operator &&  state.secondValue > 94906264) ||
      (! state.operator &&  state.currentValue > 94906264)
    ) {
       state.currentValue =  state.currentValue.toString().slice(0, -1);
      if ( state.secondValue) {
         state.secondValue =  state.secondValue.toString().slice(0, -1);
      }
    }
    updateDisplay();
  }

  export function handleOperator(currentOperator) {
    if (state.operator && state.secondValue) {
      calculate();
    } else if (state.operator && !state.secondValue) {
      state.operator = currentOperator;
      state.currentValue = state.currentValue.toString().slice(0, -1);
    }
    state.operator = currentOperator;
    state.firstValue = state.currentValue;
    if (state.currentValue !== 'Divide by zero') {
      state.currentValue += state.operator;
    }
  
    updateDisplay();
  }