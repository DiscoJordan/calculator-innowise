let display = document.getElementById('currentValue');

let currentValue = '0';
let previousValue = null;
let operator = null;

function updateDisplay() {
  display.value = currentValue;
}

function handleNumber(number) {
  currentValue === '0' ? (currentValue = number) : (currentValue += number);
  updateDisplay();
}

function handleOperator(currentOperator) {
  operator = currentOperator;
  previousValue = currentValue;
  currentValue += currentOperator;
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    let buttonValue = event.currentTarget.value;
    if (!isNaN(buttonValue)) {
      handleNumber(buttonValue);
    } else if (buttonValue === ',' && !currentValue.includes(',')) {
      currentValue += ',';
      updateDisplay();
    } else if (buttonValue === 'clear') {
      currentValue = '0';
      updateDisplay();
    } else if (buttonValue === 'negate' && currentValue !== '0') {
      currentValue = -currentValue;
      updateDisplay();
    } else if (['/', '*', '-', '+'].includes(buttonValue)) {
      handleOperator(buttonValue);
    }
  });
});
