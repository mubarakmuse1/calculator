// CALCULATOR VARIABLES
let currentNumber = "0";
let previousNumber = "";
let operator = null;
let shouldReset = false;

// GET DISPLAY ELEMENTS
const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

// UPDATE DISPLAY
function updateDisplay() {
  currentDisplay.textContent = currentNumber;
}

// ADD NUMBERS
function appendNumber(number) {
  if (currentNumber === "Error") {
    clearDisplay();
  }

  if (shouldReset) {
    currentNumber = number;
    shouldReset = false;
  } else {
    currentNumber = currentNumber === "0" ? number : currentNumber + number;
  }

  updateDisplay();
}

// ADD DECIMAL
function appendDecimal() {
  if (currentNumber === "Error") {
    clearDisplay();
  }

  if (shouldReset) {
    currentNumber = "0";
    shouldReset = false;
  }

  if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }

  updateDisplay();
}

// CHOOSE OPERATOR
function chooseOperator(selectedOperator) {
  if (currentNumber === "Error") return;

  if (operator !== null && !shouldReset) {
    calculate();
  }

  if (currentNumber === "Error") return;

  previousNumber = currentNumber;
  operator = selectedOperator;
  shouldReset = true;

  previousDisplay.textContent = previousNumber + " " + selectedOperator;
}

// CALCULATE RESULT
function calculate() {
  if (operator === null || shouldReset) return;

  const firstNumber = parseFloat(previousNumber);
  const secondNumber = parseFloat(currentNumber);

  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;

    case "-":
      result = firstNumber - secondNumber;
      break;

    case "*":
      result = firstNumber * secondNumber;
      break;

    case "/":
      if (secondNumber === 0) {
        currentNumber = "Error";
        previousDisplay.textContent = "Cannot divide by zero";

        previousNumber = "";
        operator = null;
        shouldReset = true;

        updateDisplay();
        return;
      }

      result = firstNumber / secondNumber;
      break;
  }

  // HANDLE INVALID RESULTS
  if (!Number.isFinite(result)) {
    currentNumber = "Error";
  } else {
    currentNumber = String(Number(result.toPrecision(10)));
  }

  // SHOW PREVIOUS CALCULATION
  previousDisplay.textContent =
    previousNumber + " " + operator + " " + secondNumber + " =";

  // RESET OPERATION
  previousNumber = "";
  operator = null;
  shouldReset = true;

  updateDisplay();
}

// CLEAR CALCULATOR
function clearDisplay() {
  currentNumber = "0";
  previousNumber = "";
  operator = null;
  shouldReset = false;

  previousDisplay.textContent = "";

  updateDisplay();
}
