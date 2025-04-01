// 1. Обробник для малюнків
const images = document.querySelectorAll('.images img');
images.forEach(image => {
    image.onclick = function () {
        console.log(this.width);
    };
});

// 2. Обробник для посилань
const links = document.querySelectorAll('.links a');
links.forEach(link => {
    const updateTitle = function () {
        this.title = this.href;
    };
    link.addEventListener('mouseover', updateTitle);
    link.addEventListener('mouseout', () => {
        link.title = "Посилання на сторінку";
    });
});

// 3. Обробник для полів вводу
const inputs = document.querySelectorAll('.inputs input');
const demo = document.getElementById('demo');

inputs.forEach(input => {
    input.addEventListener('click', function () {
        demo.textContent = `Значення: ${this.value}`;
    });
});

// 4. Обробник для виведення значень та алертів
inputs.forEach(input => {
    let isFirstClick = true;
    input.addEventListener('click', function () {
        if (isFirstClick) {
            console.log(this.value);
            isFirstClick = false;
        } else {
            alert(this.value);
        }
    });
});

// 5. Обробник для параграфів
const paragraphs = document.querySelectorAll('.paragraphs p');
const wordsToNumbers = {
    "П'ять": 5,
    "Шість": 6,
    "Сім": 7
};

paragraphs.forEach(paragraph => {
    let isClicked = false;
    paragraph.onclick = function () {
        if (!isClicked) {
            const number = wordsToNumbers[this.textContent];
            this.textContent = `Квадрат числа: ${number * number}`;
            isClicked = true;
        }
    };
});
