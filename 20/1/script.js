// Об'єкт з мовами та днями тижня
const data = {
    ua: ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};

// Функція для створення та відображення модального вікна
function createModal(message, callback) {
    // Створюємо основний контейнер модального вікна
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Додаємо текстове повідомлення
    let text = document.createElement("p");
    text.textContent = message;
    modal.appendChild(text);

    // Поле вводу
    let input = document.createElement("input");
    input.type = "text";
    modal.appendChild(input);

    // Кнопка підтвердження
    let button = document.createElement("button");
    button.textContent = "OK";
    modal.appendChild(button);

    // Обробник події кліку для кнопки
    button.addEventListener("click", function () {
        callback(input.value.trim(), modal);
    });

    // Додаємо модальне вікно в документ
    document.body.appendChild(modal);
    modal.style.display = "block";
}

// Функція вибору мови
function askForLanguage() {
    createModal("Виберіть мову: 'ua' або 'en'", function (input, modal) {
        let lang = input.toLowerCase(); // Приводимо до нижнього регістру

        if (data[lang]) {
            document.body.removeChild(modal); // Видаляємо модальне вікно
            askForDay(lang); // Викликаємо наступне модальне вікно
        } else {
            alert("Неправильний ввід! Будь ласка, введіть 'ua' або 'en'.");
            modal.remove(); // Прибираємо старе модальне вікно
            askForLanguage(); // Повторний виклик
        }
    });
}

// Функція вибору дня тижня
function askForDay(language) {
    let question = language === "ua" 
        ? "Введіть номер дня неділі від 1 до 7?" 
        : "Enter the day number of the week (from 1 to 7)?";

    createModal(question, function (input, modal) {
        let dayNumber = parseInt(input);

        if (dayNumber >= 1 && dayNumber <= 7) {
            document.body.removeChild(modal); // Видаляємо вікно
            showResult(language, dayNumber); // Виводимо результат
        } else {
            alert(language === "ua" ? "Невірний ввід! Введіть число від 1 до 7." : "Invalid input! Enter a number from 1 to 7.");
            modal.remove(); // Видаляємо модальне вікно
            askForDay(language); // Повторний виклик
        }
    });
}

// Функція відображення результату
function showResult(language, dayNumber) {
    alert(data[language][dayNumber - 1]); // Виводимо відповідний день тижня
}

// Запускаємо процес запитань
askForLanguage();
