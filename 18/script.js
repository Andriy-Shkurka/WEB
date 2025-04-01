// Функція повертає залишок від ділення total на 60
function calculateSeconds() {
    let input = document.getElementById("totalSeconds");
    let output = document.getElementById("secondsResult");

    if (input && output) {
        let total = parseInt(input.value);
        if (!isNaN(total)) {
            output.textContent = total % 60;
        } else {
            output.textContent = "Будь ласка, введіть число!";
        }
    } else {
        console.error("Не знайдено елементи вводу або виводу!");
    }
}

// Функція обчислює периметр правильного багатокутника
function calculatePerimeter() {
    let side = parseFloat(document.getElementById("sideInput").value);
    let count = parseInt(document.getElementById("countInput").value);
    alert(`Периметр: ${side * count}`);
}

// Функція FizzBuzz
function runFizzBuzz() {
    for (let i = 1; i <= 10; i++) {
        if (i % 3 === 0 && i % 5 === 0) console.log("fizzbuzz");
        else if (i % 3 === 0) console.log("fizz");
        else if (i % 5 === 0) console.log("buzz");
        else console.log(i);
    }
}

// Функція обчислює середнє арифметичне
function calculateAverage() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let c = parseFloat(document.getElementById("num3").value);
    alert(`Середнє арифметичне: ${(a + b + c) / 3}`);
}

// Перевірка на подільність числа
function checkDivisibility() {
    let n = parseInt(document.getElementById("divNum").value);
    let x = parseInt(document.getElementById("divX").value);
    let y = parseInt(document.getElementById("divY").value);
    let message = `Число ${n} `;
    if (n % x === 0 && n % y === 0) message += `ділиться на ${x} та на ${y}`;
    else if (n % x === 0) message += `ділиться на ${x}, але не на ${y}`;
    else if (n % y === 0) message += `ділиться на ${y}, але не на ${x}`;
    else message += `не ділиться на ${x} та ${y}`;
    alert(message);
}

// Генерація випадкового масиву та обчислення його параметрів
function generateAndProcessArray() {
    let array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 - 50));
    console.log("Згенерований масив:", array);
    console.log("Максимальне значення:", Math.max(...array));
    console.log("Мінімальне значення:", Math.min(...array));
    let sum = array.reduce((acc, val) => acc + val, 0);
    console.log("Сума всіх елементів:", sum);
    console.log("Середнє арифметичне:", sum / array.length);
    console.log("Непарні значення:", array.filter(num => num % 2 !== 0));
}

// Генерація 5x5 масиву та його обробка
function generateAndProcessMatrix() {
    let matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.random() < 0.5 ? Math.floor(Math.random() * 100 - 50) : String.fromCharCode(65 + Math.floor(Math.random() * 26))));
    console.log("Оригінальна матриця:", matrix);
    let modifiedMatrix = matrix.map((row, i) => row.map((val, j) => (i === j && typeof val === "number") ? (val < 0 ? 0 : 1) : val));
    console.log("Змінена матриця:", modifiedMatrix);
}

// Калькулятор
function calculate() {
    let num1 = parseFloat(document.getElementById("calcNum1").value);
    let num2 = parseFloat(document.getElementById("calcNum2").value);
    let operation = document.getElementById("operation").value;
    let result;

    switch (operation) {
        case "add": result = num1 + num2; break;
        case "sub": result = num1 - num2; break;
        case "mul": result = num1 * num2; break;
        case "div": result = num2 !== 0 ? num1 / num2 : "Помилка: ділення на нуль"; break;
    }
    document.getElementById("calcResult").textContent = result;
}

// Аналіз числа
function analyzeNumber() {
    let n = parseInt(document.getElementById("analyzeNum").value);
    let result = `${n >= 0 ? "Позитивне" : "Негативне"}, ${isPrime(n) ? "Просте" : "Не просте"}`;
    [2, 3, 5, 6, 9].forEach(x => result += `\nДілиться на ${x}: ${n % x === 0}`);
    alert(result);
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Перевертання масиву та піднесення елементів до квадрату
function reverseAndSquareArray() {
    let input = document.getElementById("reverseArrayInput").value.split(",").map(el => isNaN(el) ? el : Math.pow(Number(el), 2));
    document.getElementById("reversedArrayResult").textContent = input.reverse().join(", ");
}

// Видалення дублікатів з масиву
function removeDuplicatesArray() {
    let input = document.getElementById("uniqueArrayInput").value.split(",").map(el => el.trim());
    document.getElementById("uniqueArrayResult").textContent = [...new Set(input)].join(", ");
}
