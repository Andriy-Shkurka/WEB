// Об'єкт, що містить масиви днів тижня для української (ua) та англійської (en) мов
const data = {
    ua: ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};

// Функція створює модальне вікно з полем вводу та кнопкою
function createModal(message, callback) {
    // Створюємо <div> для модального вікна
    let modal = document.createElement("div");
    modal.classList.add("modal"); // Додати клас для стилізації

    // Створюємо <p> з текстовим повідомленням
    let text = document.createElement("p");
    text.textContent = message;
    modal.appendChild(text);

    // Створюємо поле <input> для вводу
    let input = document.createElement("input");
    input.type = "text";
    modal.appendChild(input);

    // Створюємо кнопку <button> для підтвердження
    let button = document.createElement("button");
    button.textContent = "OK";
    modal.appendChild(button);

    // Додаємо обробник кліку по кнопці
    button.addEventListener("click", function () {
        // Передаємо введене значення у зворотній виклик (callback)
        callback(input.value.trim(), modal);
    });

    // Додаємо модальне вікно до <body>
    document.body.appendChild(modal);
    modal.style.display = "block"; // Робимо вікно видимим
}

// Функція для запиту мови користувача
function askForLanguage() {
    createModal("Виберіть мову: 'ua' або 'en'", function (input, modal) {
        let lang = input.toLowerCase(); // Зменшуємо регістр введеного тексту

        if (data[lang]) {
            // Якщо мова підтримується, закриваємо модальне вікно та переходимо далі
            document.body.removeChild(modal);
            askForDay(lang);
        } else {
            // Якщо введено неправильно — повідомляємо та повторюємо
            alert("Неправильний ввід! Будь ласка, введіть 'ua' або 'en'.");
            modal.remove(); // Видаляємо модальне вікно
            askForLanguage(); // Повторний виклик
        }
    });
}

// Функція для запиту номера дня тижня
function askForDay(language) {
    // Формулюємо питання відповідною мовою
    let question = language === "ua" 
        ? "Введіть номер дня неділі від 1 до 7?" 
        : "Enter the day number of the week (from 1 to 7)?";

    createModal(question, function (input, modal) {
        let dayNumber = parseInt(input); // Перетворення введення на число

        if (dayNumber >= 1 && dayNumber <= 7) {
            // Якщо введення в межах 1–7, показуємо результат
            document.body.removeChild(modal);
            showResult(language, dayNumber);
        } else {
            // Якщо число поза діапазоном — помилка і повтор запиту
            alert(language === "ua" 
                ? "Невірний ввід! Введіть число від 1 до 7." 
                : "Invalid input! Enter a number from 1 to 7.");
            modal.remove();
            askForDay(language);
        }
    });
}

// Вивід результату у вікні alert
function showResult(language, dayNumber) {
    alert(data[language][dayNumber - 1]);
}

// Початок взаємодії з користувачем
askForLanguage();
