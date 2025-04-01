// scrept.js

document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".toggle-div");

    divs.forEach(div => {
        div.dataset.originalColor = getComputedStyle(div).backgroundColor;
        div.addEventListener("click", turnRed);
    });

    function turnRed(event) {
        const div = event.target;
        div.style.backgroundColor = "red";
        div.removeEventListener("click", turnRed);
        div.addEventListener("click", turnGreen);
    }

    function turnGreen(event) {
        const div = event.target;
        div.style.backgroundColor = div.dataset.originalColor;
        div.removeEventListener("click", turnGreen);
        div.addEventListener("click", turnRed);
    }
});
