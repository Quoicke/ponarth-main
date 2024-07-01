const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function() {
  navbar.classList.toggle("active"); // Переключаем класс active
  menuToggle.classList.toggle("active"); // Добавляем/удаляем класс active для кнопки
});
