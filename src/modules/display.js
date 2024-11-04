// display.js
import { state } from './state.js';

export function updateDisplay() {
  state.display.value = state.currentValue;
  state.smallDisplay.value = state.lastOperation;
  state.display.scrollLeft = state.display.scrollWidth;
}
