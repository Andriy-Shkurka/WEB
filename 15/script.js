function divideByThree() {
    let b = 1000, count = 0;
    while (b >= 5) {
        b /= 3;
        count++;
    }
    document.getElementById("output").innerHTML = `Результат: ${b.toFixed(2)}<br>Кількість ітерацій: ${count}`;
}

function convertToInches() {
    let lengthCm = prompt("Введіть довжину в сантиметрах:");
    if (!isNaN(lengthCm) && lengthCm !== null) {
        let lengthInches = lengthCm * 0.3937;
        alert(`Довжина в дюймах: ${lengthInches.toFixed(2)}`);
    } else {
        alert("Будь ласка, введіть коректне число!");
    }
}

function getWeekday() {
    let dayNumber = parseInt(prompt("Введіть число від 1 до 31:"));
    if (dayNumber >= 1 && dayNumber <= 31) {
        let currentDate = new Date();
        currentDate.setDate(dayNumber);
        let daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"];
        let dayOfWeek = daysOfWeek[currentDate.getDay()];
        document.getElementById("output").innerHTML = `Числу ${dayNumber} відповідає день тижня: ${dayOfWeek}`;
    } else {
        alert("Введене число не відповідає діапазону 1-31.");
    }
}

function printNaturalNumbers() {
    let output = "Натуральні числа від -100 до 100:<br>";
    let num = -100;
    while (num <= 100) {
        if (num > 0) {
            output += num + " ";
        }
        num++;
    }
    document.getElementById("output").innerHTML = output;
}

function printEvenNumbers() {
    let output = "Парні числа від 0 до 100:<br>";
    let num = 0;
    do {
        if (num % 2 === 0) {
            output += num + " ";
        }
        num++;
    } while (num <= 100);
    document.getElementById("output").innerHTML = output;
}
