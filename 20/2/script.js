// Масив для збереження елементів мережі
let elements = [];

// Базовий клас для всіх елементів мережі
class NetworkElement {
    constructor(name) {
        this.name = name; // Ім'я елемента
    }
}

// Клас для електростанцій
class PowerPlant extends NetworkElement {
    constructor(name, power) {
        super(name); // Викликаємо конструктор базового класу
        this.power = Math.max(1, Math.min(power, 100)); // Потужність має бути в межах від 1 до 100
    }

    // Метод для отримання потужності залежно від часу доби
    getPower(daytime) {
        return this.power; // Потужність електростанції постійна, незалежно від часу доби
    }
}

// Клас для сонячних панелей
class SolarPanel extends NetworkElement {
    constructor(name, power) {
        super(name); // Викликаємо конструктор базового класу
        this.power = Math.max(1, Math.min(power, 5)); // Потужність сонячної панелі має бути в межах від 1 до 5
    }

    // Метод для отримання потужності в залежності від часу доби
    getPower(daytime) {
        return daytime ? this.power : 0; // Потужність сонячної панелі залежить від того, чи день чи ніч
    }
}

// Клас для житлових будинків
class ResidentialBuilding extends NetworkElement {
    constructor(name, apartments) {
        super(name); // Викликаємо конструктор базового класу
        this.apartments = Math.max(1, Math.min(apartments, 400)); // Кількість квартир повинна бути в межах від 1 до 400
    }

    // Метод для розрахунку споживання електроенергії
    getConsumption(daytime) {
        return this.apartments * (daytime ? 0.004 : 0.001); // Споживання залежить від часу доби
    }
}

// Клас для ліній електропередач
class PowerLine {
    constructor(name, capacity, pricePerMW) {
        this.name = name; // Ім'я лінії
        this.capacity = capacity; // Потужність лінії
        this.pricePerMW = pricePerMW > 0 ? pricePerMW : 1; // Мінімальна ціна за МВт повинна бути 1
    }

    // Метод для передачі потужності через лінію
    transferPower(amount) {
        let transferable = Math.min(this.capacity, amount); // Максимальна кількість переданої потужності - це мінімум між поточною потужністю лінії і запитуваною потужністю
        this.capacity -= transferable; // Зменшуємо доступну потужність лінії
        return transferable; // Повертаємо передану потужність
    }

    // Метод для обчислення вартості переданої потужності
    calculateCost(powerAmount) {
        return powerAmount * this.pricePerMW; // Вартість = кількість МВт * ціна за МВт
    }
}

// Функція для додавання нового елемента в масив
function addElement() {
    let type = document.getElementById("elementType").value; // Тип елемента (електростанція, сонячна панель тощо)
    let name = document.getElementById("elementName").value; // Ім'я елемента
    let value = Number(document.getElementById("elementValue").value); // Значення (потужність, кількість квартир тощо)
    let extraValue = Number(document.getElementById("extraValue").value); // Додаткове значення (ціна за МВт для лінії передачі)

    // Перевірка на валідність введених даних
    if (!name || value <= 0) {
        alert("Будь ласка, введіть коректні дані.");
        return;
    }

    let element;
    // Створення елемента залежно від типу
    switch (type) {
        case "powerPlant":
            element = new PowerPlant(name, value);
            break;
        case "solarPanel":
            element = new SolarPanel(name, value);
            break;
        case "residentialBuilding":
            element = new ResidentialBuilding(name, value);
            break;
        case "powerLine":
            if (extraValue <= 0) {
                alert("Будь ласка, введіть коректну ціну мегавата.");
                return;
            }
            element = new PowerLine(name, value, extraValue);
            break;
    }

    // Додаємо створений елемент до масиву
    elements.push(element);
    updateElementsList(); // Оновлюємо список елементів
}

// Функція для оновлення списку елементів на екрані
function updateElementsList() {
    let list = document.getElementById("elementsList");
    list.innerHTML = ""; // Очищаємо список
    elements.forEach((el, index) => {
        let li = document.createElement("li");
        li.innerText = `${el.name} (${el.constructor.name})`; // Додаємо ім'я елемента та його тип до списку
        list.appendChild(li); // Додаємо елемент в список
    });
}

// Функція для розрахунку балансу енергії в мережі
function calculateEnergyBalance() {
    let totalProductionDay = 0, totalProductionNight = 0;
    let totalConsumptionDay = 0, totalConsumptionNight = 0;
    let powerLines = [];

    // Проходимо через всі елементи та збираємо відповідні дані
    elements.forEach(element => {
        if (element instanceof PowerPlant || element instanceof SolarPanel) {
            totalProductionDay += element.getPower(true); // Потужність вдень
            totalProductionNight += element.getPower(false); // Потужність вночі
        } else if (element instanceof ResidentialBuilding) {
            totalConsumptionDay += element.getConsumption(true); // Споживання вдень
            totalConsumptionNight += element.getConsumption(false); // Споживання вночі
        } else if (element instanceof PowerLine) {
            powerLines.push(element); // Додаємо лінії електропередач
        }
    });

    let deficitDay = totalConsumptionDay - totalProductionDay; // Дефіцит вдень
    let deficitNight = totalConsumptionNight - totalProductionNight; // Дефіцит вночі

    let balanceDay = handlePowerTrade(powerLines, deficitDay, "день"); // Обробка дефіциту вдень
    let balanceNight = handlePowerTrade(powerLines, deficitNight, "ніч"); // Обробка дефіциту вночі

    // Виведення результату
    document.getElementById("output").innerHTML = `
        <p><span>Баланс вдень:</span> ${balanceDay}</p>
        <p><span>Баланс вночі:</span> ${balanceNight}</p>
    `;
}

// Функція для обробки купівлі/продажу електроенергії
function handlePowerTrade(powerLines, deficit, timeOfDay) {
    let result = "";
    let cost = 0;

    if (deficit > 0) {
        // Потрібно купити електроенергію
        powerLines.sort((a, b) => a.pricePerMW - b.pricePerMW); // Сортуємо лінії за ціною (від найменшої)

        for (let line of powerLines) {
            let bought = line.transferPower(deficit); // Купуємо електроенергію
            let lineCost = line.calculateCost(bought); // Розраховуємо вартість
            cost += lineCost; // Додаємо вартість до загальної
            deficit -= bought; // Зменшуємо дефіцит
            result += `Куплено ${bought} МВт за ціною ${line.pricePerMW} / МВт (Загальна вартість: ${lineCost.toFixed(2)})<br>`;
            if (deficit <= 0) break;
        }

        if (deficit > 0) {
            result += `<span style="color: red;"> Не вистачає ${deficit} МВт ${timeOfDay}!</span><br>`;
        }
    } else if (deficit < 0) {
        // Є надлишок електроенергії
        let surplus = Math.abs(deficit); // Абсолютне значення надлишку
        powerLines.sort((a, b) => b.pricePerMW - a.pricePerMW); // Сортуємо лінії за ціною (від найбільшої)

        for (let line of powerLines) {
            let sold = line.transferPower(surplus); // Продаємо електроенергію
            let lineProfit = line.calculateCost(sold); // Розраховуємо прибуток
            cost += lineProfit; // Додаємо прибуток до загальної суми
            surplus -= sold; // Зменшуємо надлишок
            result += `Продано ${sold} МВт за ціною ${line.pricePerMW} / МВт (Прибуток: ${lineProfit.toFixed(2)})<br>`;
            if (surplus <= 0) break;
        }

        if (surplus > 0) {
            result += `<span style="color: orange;"> Надлишок ${surplus} МВт не вдалося продати!</span><br>`;
        }
    } else {
        result = "<span style='color: green;'> Баланс ідеальний, купівля/продаж не потрібні.</span>";
    }

    return result + `<br><b>Підсумкова сума:</b> ${cost.toFixed(2)}`; // Повертаємо результат
}
