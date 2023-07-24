const displayCurrent = document.querySelector("#display-current");
const displayPrevious = document.querySelector("#display-previous");

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      addNumberToDisplay(button.textContent);
    } else if (button.classList.contains("operator")) {
      onOperatorClick(button.textContent);
    } else if (button.id === "clear") {
      clearDisplay();
    } else if (button.id === "equals") {
      onEqualsClick();
    } else if (button.id === "delete") {
      deleteLastCharacter();
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    deleteLastCharacter();
  }
  if (e.key === "Escape") {
    clearDisplay();
  }
  if (e.key === "Enter") {
    onEqualsClick();
  }
  if (e.key === ".") {
    addNumberToDisplay(".");
  }
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "%"
  ) {
    onOperatorClick(e.key);
  }
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    addNumberToDisplay(e.key);
  }
});

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  if (y === 0) {
    throw new Error("Can't divide by zero!");
  }
  return x / y;
}
function modulo(x, y) {
  return x % y;
}

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    case "%":
      return modulo(x, y);
    default:
      throw new Error("Invalid operator!");
  }
}
function validateResult(result) {
  if (result > 999999999999) {
    clearDisplay();
    return "Number too large!";
  }
  if (result === NaN) {
    clearDisplay();
    return "Invalid operation!";
  }
  if (toString(result).length > 12) {
    return Math.round(result * 1000000000000) / 1000000000000;
  }

  return result;
}
function addNumberToDisplay(number) {
  if (displayCurrent.textContent.length > 12) {
    return;
  }
  if (displayCurrent.textContent === "0") {
    number === "."
      ? (displayCurrent.textContent = "0.")
      : (displayCurrent.textContent = number);
  } else {
    if (number === "." && displayCurrent.textContent.includes(".")) {
      return;
    }
    displayCurrent.textContent += number;
  }
}

function clearDisplay() {
  displayCurrent.textContent = "0";
  displayPrevious.textContent = "";
}

function deleteLastCharacter() {
  if (displayCurrent.textContent.length === 1) {
    displayCurrent.textContent = "0";
    return;
  }
  displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
}

let firstOperand = null;

function onOperatorClick(operator) {
  firstOperand = Number(displayCurrent.textContent);
  clearDisplay();
  displayPrevious.textContent = `${firstOperand} ${operator}`;
}
function onEqualsClick() {
  const secondOperand = Number(displayCurrent.textContent);
  const operator = displayPrevious.textContent.slice(-1);
  const result = operate(operator, firstOperand, secondOperand);

  displayCurrent.textContent = validateResult(result);
  displayPrevious.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
}
