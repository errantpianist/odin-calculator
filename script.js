const display = document.querySelector("#display");

const buttons = document.querySelectorAll(".button");

function addNumberToDisplay(number) {
  if (display.textContent === "0") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      addNumberToDisplay(button.textContent);
    }
  });
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
    default:
      throw new Error("Invalid operator!");
  }
}
