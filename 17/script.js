document.addEventListener("DOMContentLoaded", function () {
    // Створення основного контейнера
    const container = document.createElement("div");
    container.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f4f4f4;";

    // Створення калькулятора
    const calculator = document.createElement("div");
    calculator.style.cssText = "width: 300px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;";
    
    // Екран калькулятора
    const display = document.createElement("input");
    display.type = "text";
    display.readOnly = true;
    display.style.cssText = "width: 100%; height: 50px; font-size: 24px; text-align: right; margin-bottom: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 5px;";
    
    // Контейнер кнопок
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.cssText = "display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;";
    
    // Кнопки калькулятора
    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C"
    ];
    
    buttons.forEach(text => {
        const button = document.createElement("button");
        button.textContent = text;
        button.style.cssText = "padding: 15px; font-size: 18px; background: #e0e0e0; border: none; border-radius: 5px; cursor: pointer; transition: 0.3s;";
        button.addEventListener("mouseover", () => button.style.background = "#d3d3d3");
        button.addEventListener("mouseout", () => button.style.background = "#e0e0e0");
        button.addEventListener("click", () => handleButtonClick(text));
        buttonsContainer.appendChild(button);
    });
    
    // Функція обробки натискання кнопок
    function handleButtonClick(value) {
        if (value === "C") {
            display.value = "";
        } else if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        } else {
            display.value += value;
        }
    }
    
    // Додавання елементів до DOM
    calculator.appendChild(display);
    calculator.appendChild(buttonsContainer);
    container.appendChild(calculator);
    document.body.appendChild(container);

    // Адаптація під мобільні пристрої
    window.addEventListener("resize", function () {
        if (window.innerWidth < 400) {
            calculator.style.width = "250px";
            display.style.fontSize = "20px";
            buttonsContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else {
            calculator.style.width = "300px";
            display.style.fontSize = "24px";
        }
    });
});
