// Функція для отримання поточного часу у потрібному форматі
function getFormattedTime() {
    // Отримуємо поточний час
    const now = new Date();

    // Отримуємо години, хвилини і секунди
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Додаємо нулі перед одиничними цифрами для коректного формату (наприклад, 09 замість 9)
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Масив днів тижня українською
    const daysOfWeek = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'];
    // Отримуємо день тижня
    const dayOfWeek = daysOfWeek[now.getDay()];

    // Масив місяців українською
    const monthsOfYear = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    // Отримуємо місяць
    const month = monthsOfYear[now.getMonth()];

    // Отримуємо день місяця та рік
    const day = now.getDate();
    const year = now.getFullYear();

    // Формуємо фінальний рядок для виведення
    const formattedTime = `${hours}:${minutes}:${seconds}, ${dayOfWeek}, ${day} ${month} ${year} року`;

    // Повертаємо форматований рядок
    return formattedTime;
}

// Функція для виведення часу на сторінку
function displayCurrentTime() {
    // Отримуємо елемент, в який будемо вставляти час
    const timeElement = document.getElementById('current-time');

    // Викликаємо функцію для отримання форматованого часу
    const currentTime = getFormattedTime();

    // Вставляємо поточний час в елемент
    timeElement.textContent = currentTime;

    // Виводимо поточний час в консоль
    console.log(currentTime);
}

// Викликаємо функцію для відображення часу при завантаженні сторінки
window.onload = displayCurrentTime;
