document.addEventListener("DOMContentLoaded", function() {
    const block = document.getElementById("block");
  
    // Функция для отображения блока с плавным появлением
    function showBlock() {
      block.classList.add("visible"); // Добавляем класс visible, чтобы показать блок с плавным появлением
    }
  
    // Функция для проверки, видим ли блок на экране
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Функция для отслеживания события прокрутки и активации таймера, когда блок появляется в зоне видимости
    function handleScroll() {
      if (isElementInViewport(block)) {
        setTimeout(showBlock, 2000); // Активируем таймер при появлении блока в зоне видимости
        window.removeEventListener('scroll', handleScroll); // Отписываемся от события прокрутки после активации таймера
      }
    }
  
    window.addEventListener('scroll', handleScroll); // Слушаем событие прокрутки
  });
  