// Функція для початку гри
function startGame() {
    // Генеруємо випадкове число від 0 до 50
    const targetNumber = Math.floor(Math.random() * 51);
    let attempts = 0; // Лічильник спроб
    let userGuess;
    let lastDiff = null;

    // Виводимо у консоль старт гри
    console.log(`${new Date().toLocaleString()} Гра почалась!`);

    // Цикл гри
    while (true) {
        // Користувач вводить число через prompt
        userGuess = parseInt(prompt("Вгадай число від 0 до 50"));

        // Перевіряємо чи користувач ввів коректне число
        if (isNaN(userGuess) || userGuess < 0 || userGuess > 50) {
            alert("Будь ласка, введіть число в діапазоні від 0 до 50!");
            continue;
        }

        // Збільшуємо кількість спроб
        attempts++;

        // Виводимо інформацію в консоль
        console.log(`${new Date().toLocaleString()} Спроба ${attempts}: число ${userGuess} - не вірно`);

        // Перевіряємо, чи вгадано число
        if (userGuess === targetNumber) {
            alert(`За ${attempts} спроб ви вгадали число ${targetNumber}`);
            break;
        }

        // Визначаємо відхилення
        const diff = Math.abs(targetNumber - userGuess);
        let message = '';

        if (lastDiff === null) {
            message = 'Холодно';
        } else if (diff === lastDiff) {
            message = 'Тепло';
        } else if (diff < lastDiff) {
            message = 'Гарячо';
        } else {
            message = 'Холодно';
        }

        // Оновлюємо останнє відхилення
        lastDiff = diff;

        // Повідомляємо користувача
        alert(message);
    }

    // Запитуємо, чи хоче користувач зіграти ще раз
    if (confirm("Хочете спробувати ще раз?")) {
        startGame(); // Починаємо нову гру
    } else {
        alert("Дякуємо за гру!");
    }
}
