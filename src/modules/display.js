import { state } from './state.js';

export function updateDisplay() {
  const display = document.getElementById('currentValue');
  const smallDisplay = document.getElementById('lastOperation');

  display.value = state.currentValue;
  smallDisplay.value = state.lastOperation;
  display.scrollLeft = display.scrollWidth;
}
