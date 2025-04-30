// Отримуємо DOM-елементи для таймера, поля гри, кнопки перезапуску та таблиці результатів
let timerElement = document.getElementById('timer');
let gameField = document.getElementById('gameField');
let restartBtn = document.getElementById('restartBtn');
let resultsTable = document.getElementById('resultsTable').querySelector('tbody');

// Основні змінні
let numbers = [];        // Масив чисел для гри
let nextNumber = 1;      // Число, яке користувач має натиснути наступним
let timer;               // Змінна для інтервалу таймера
let timeLeft = 60;       // Час, що залишився (секунд)
let attempts = [];       // Масив для збереження часу завершення кожної гри
let startTime;           // Час початку гри

// Функція для перемішування елементів масиву (випадковий порядок)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Генерація випадкового кольору (RGB з обмеженим діапазоном)
function randomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
}

// Генерація випадкового розміру шрифту з заданого списку
function randomFontSize() {
    const sizes = [16, 20, 24, 28, 32];
    return sizes[Math.floor(Math.random() * sizes.length)] + 'px';
}

// Створення поля гри: додає 20 випадкових чисел від 1 до 20 в HTML
function createGameField() {
    gameField.innerHTML = ''; // Очищуємо поле перед створенням
    numbers = shuffle([...Array(20).keys()].map(i => i + 1)); // Створюємо масив [1...20] та перемішуємо

    numbers.forEach(number => {
        let div = document.createElement('div');      // Створюємо div для числа
        div.className = 'number';                     // Додаємо клас для стилізації
        div.innerText = number;                       // Встановлюємо число
        div.style.color = randomColor();              // Випадковий колір тексту
        div.style.fontSize = randomFontSize();        // Випадковий розмір шрифту
        div.addEventListener('click', () => handleNumberClick(div, number)); // Обробник кліку
        gameField.appendChild(div);                   // Додаємо на поле
    });
}

// Обробка кліку по числу
function handleNumberClick(div, number) {
    if (number === nextNumber) {
        // Якщо натиснуто правильне число — додаємо клас для візуального ефекту
        div.classList.add('correct');
        nextNumber++; // Очікуємо наступне число
        if (nextNumber > 20) {
            // Якщо всі 20 чисел натиснуто правильно — завершити гру з перемогою
            endGame(true);
        }
    } else {
        alert('Не вірна цифра. Спробуйте ще раз.');
    }
}

// Запускає таймер зворотного відліку на 60 секунд
function startTimer() {
    startTime = Date.now(); // Фіксуємо час старту
    timer = setInterval(() => {
        timeLeft--;                         // Зменшуємо час
        timerElement.textContent = timeLeft; // Оновлюємо відображення
        if (timeLeft <= 0) {
            clearInterval(timer);          // Зупиняємо таймер
            endGame(false);                // Завершуємо гру з поразкою
        }
    }, 1000);
}

// Завершення гри
// success = true — перемога, false — поразка
function endGame(success) {
    clearInterval(timer); // Зупиняємо таймер

    // Обчислюємо скільки часу пройшло від початку гри
    let elapsed = Math.floor((Date.now() - startTime) / 1000);

    if (success) {
        alert('Вітаємо! Ви завершили гру!');
    } else {
        alert('Час вийшов!');
    }

    // Зберігаємо час спроби до масиву статистики
    attempts.push(elapsed);
    updateStatistics(); // Оновлюємо таблицю результатів
    resetGame();        // Перезапускаємо гру
}

// Оновлює таблицю зі статистикою спроб
function updateStatistics() {
    resultsTable.innerHTML = ''; // Очищуємо таблицю

    let bestTime = Math.min(...attempts); // Найкращий час серед усіх спроб

    attempts.forEach((time, index) => {
        let row = document.createElement('tr');
        if (time === bestTime) {
            row.classList.add('best'); // Виділяємо найкращу спробу
        }
        row.innerHTML = `
            <td>${index + 1}</td>    <!-- Номер спроби -->
            <td>${time}</td>         <!-- Час проходження -->
        `;
        resultsTable.appendChild(row); // Додаємо рядок до таблиці
    });
}

// Скидає гру до початкового стану: оновлює поле, таймер, число
function resetGame() {
    timeLeft = 60;      // Скидаємо таймер
    nextNumber = 1;     // Починаємо з 1
    createGameField();  // Генеруємо нове поле
    startTimer();       // Запускаємо таймер
}

// Обробка кліку по кнопці "Спробувати ще"
restartBtn.addEventListener('click', () => {
    clearInterval(timer); // Зупиняємо поточний таймер
    resetGame();          // Перезапускаємо гру
});

// Запуск гри після завантаження сторінки
window.onload = () => {
    createGameField(); // Генеруємо перше поле
    startTimer();      // Запускаємо перший таймер
};
