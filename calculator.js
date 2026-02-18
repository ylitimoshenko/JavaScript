// Get display elements
const output = document.getElementById("output");
const expression = document.getElementById("expression");

// Get buttons
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const clearButton = document.getElementById("clear-button");
const equalsButton = document.getElementById("equals-button");
const backspaceButton = document.getElementById("backspace-button")

// Calculator state
let firstNumber = "";
let secondNumber = "";
let operator = null;
let result = null;


// Number and Dot buttons
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (operator === null) {
      if(value === "." && firstNumber.includes(".")) return;

      if (value === "." && firstNumber === "") {
        firstNumber = "0.";
      }else {
        firstNumber = firstNumber + value;
      }

      output.textContent =firstNumber;
    }

    else{
      if(value === "." && secondNumber.includes(".")) return;

      if(value === "." && secondNumber ==="") {
        secondNumber = "0.";
      }else {
        secondNumber = secondNumber + value;
      }

      output.textContent = secondNumber;
    }
  });
});

// Handle operation clicks
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (firstNumber === "") return;

    operator = button.textContent;
    expression.textContent = `${firstNumber} ${operator}`;
  });
});

// Equals button
equalsButton.addEventListener("click", () => {
  if (firstNumber === "" || secondNumber === "" || operator === null) return;

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);

  switch(operator) {
    case "+":
      result = num1 +num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 === 0 ? "Error" : num1 / num2
      break;
  }

  output.textContent = result;
  expression.textContent = `${firstNumber} ${operator} ${secondNumber} =`;

  //prepare for next calculation
  firstNumber = result.toString();
  secondNumber = "";
  operator = null;

});

//Backspace Button
backspaceButton.addEventListener("click", () => {
  //remove from second number 
  if (secondNumber !== "") {
    secondNumber =secondNumber.slice(0, -1);
    output.textContent = secondNumber || "0";
    return;
  }
  //remove operator
  if (operator !== null) {
    operator = null;
    expression.textContent = firstNumber;
    output.textContent = firstNumber || "0";
    return;
  }
  //remove from first number
  if (firstNumber !== "") {
    firstNumber = firstNumber.slice(0, -1);
    output.textContent = firstNumber || "0";
  }
})

// Clear Button
clearButton.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  result = null; 

  output.textContent = "0";
  expression.textContent = "";
});
