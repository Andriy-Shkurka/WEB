function scrollGallery(direction, gallerySelector) {
    const gallery = document.querySelector(gallerySelector);
    const scrollAmount = 200; // Кількість пікселів для прокрутки

    if (direction === 'left') {
        gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Перевірка на клік по іконці меню
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const navMenu = document.querySelector('nav');
const closeMenuButton = document.getElementById('close-menu');

// Додаємо обробник події на кнопку меню
menuIcon.addEventListener("click", function() {
    menu.classList.toggle("open"); // Додаємо/видаляємо клас для відкриття меню
});

// Додаємо обробник події на клік по іконці меню
menuIcon.addEventListener('click', function() {
    // Додаємо клас "active", що відкриває меню
    navMenu.classList.add('active');
    
    // Показуємо кнопку закриття
    closeMenuButton.style.display = 'block';
});

// Додаємо обробник події для закриття меню
closeMenuButton.addEventListener('click', function() {
    // Прибираємо клас "active", що закриває меню
    navMenu.classList.remove('active');
    
    // Приховуємо кнопку закриття
    closeMenuButton.style.display = 'none';
});



