// Функція для початку гри
function startGame() {
    // Генеруємо випадкове ціле число від 0 до 50 включно
    const targetNumber = Math.floor(Math.random() * 51);

    let attempts = 0;      // Лічильник кількості спроб користувача
    let userGuess;         // Змінна для зберігання поточної спроби користувача
    let lastDiff = null;   // Зберігає різницю з попередньої спроби (для підказок)

    // Виводимо у консоль повідомлення про початок гри із поточним часом
    console.log(`${new Date().toLocaleString()} Гра почалась!`);

    // Основний цикл гри — триватиме, поки користувач не вгадає число
    while (true) {
        // Запитуємо користувача ввести число через модальне вікно
        userGuess = parseInt(prompt("Вгадай число від 0 до 50"));

        // Перевіряємо, чи введене значення є числом і чи входить у допустимий діапазон
        if (isNaN(userGuess) || userGuess < 0 || userGuess > 50) {
            alert("Будь ласка, введіть число в діапазоні від 0 до 50!");
            continue; // Повертаємося на початок циклу, якщо дані некоректні
        }

        // Збільшуємо кількість спроб
        attempts++;

        // Виводимо у консоль поточну спробу користувача
        console.log(`${new Date().toLocaleString()} Спроба ${attempts}: число ${userGuess} - не вірно`);

        // Перевіряємо, чи співпадає число користувача з загаданим
        if (userGuess === targetNumber) {
            alert(`За ${attempts} спроб ви вгадали число ${targetNumber}`);
            break; // Завершуємо цикл, якщо користувач вгадав
        }

        // Обчислюємо різницю між загаданим числом і спробою користувача
        const diff = Math.abs(targetNumber - userGuess);
        let message = ''; // Змінна для збереження підказки ("холодно", "гарячо" тощо)

        // Визначаємо підказку на основі зміни відхилення:
        if (lastDiff === null) {
            // Якщо це перша спроба, показуємо "холодно"
            message = 'Холодно';
        } else if (diff === lastDiff) {
            // Якщо різниця така ж, як і в попередній спробі — "тепло"
            message = 'Тепло';
        } else if (diff < lastDiff) {
            // Якщо стало ближче до цілі — "гарячо"
            message = 'Гарячо';
        } else {
            // Якщо стало далі — "холодно"
            message = 'Холодно';
        }

        // Зберігаємо поточне відхилення для наступної спроби
        lastDiff = diff;

        // Виводимо підказку користувачу
        alert(message);
    }

    // Після завершення гри запитуємо, чи хоче користувач спробувати ще раз
    if (confirm("Хочете спробувати ще раз?")) {
        startGame(); // Рекурсивно запускаємо нову гру
    } else {
        alert("Дякуємо за гру!"); // Завершення гри
    }
}
