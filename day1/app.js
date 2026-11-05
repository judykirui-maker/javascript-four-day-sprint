
console.log("Hello, JavaScript!");
const itemName = "Notebook";
const price = 12.5;
let quantity = 3;

console.log(itemName);
console.log(price);
console.log(quantity);

const studentName = "Judy";
const age = 20;
const isLearning = true;
let favoriteSubject;

console.log(typeof studentName);
console.log(typeof age);
console.log(typeof isLearning);
console.log(typeof favoriteSubject);

const subtotal = price * quantity;
const tax = subtotal * 0.08;
const total = subtotal + tax;

console.log("Subtotal:", subtotal);
console.log("Tax:", tax);
console.log("Total:", total);

const personAge = 20;

if (personAge >= 18) {
    console.log("adult");
} else {
    console.log("not an adult");
}

const prices = [5, 12, 25, 8, 30];
let totalPrice = 0;

for (const priceItem of prices) {
    totalPrice = totalPrice + priceItem;
}

console.log("Total:", totalPrice);

function double(number) {
    return number * 2;
}

console.log(double(5));
console.log(double(8));

const studyMinutes = 137;
const hours = Math.floor(studyMinutes / 60);
const remainingMinutes = studyMinutes % 60;

console.log(hours, "hours");
console.log(remainingMinutes, "minutes");
const challengeMinutes = 125;

const challengeHours = Math.floor(challengeMinutes / 60);
const challengeRemainder = challengeMinutes % 60;

console.log(challengeHours, "hours");
console.log(challengeRemainder, "minutes");