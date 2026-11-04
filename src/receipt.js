
function calculateLineTotal(price, quantity) {
  let total = price * quantity;

  if (quantity > 5) {
    total = total * 0.95;
  }

  return total;
}

function calculateTax(amount) {
  return amount * 0.08;
}

}const lineTotal = calculateLineTotal(12.50, 2);
console.log("Total after discount:", lineTotal);

const taxAmount = calculateTax(lineTotal);
const finalTotal = lineTotal + taxAmount;

console.log("Tax:", taxAmount);
console.log("Final total:", finalTotal); 
