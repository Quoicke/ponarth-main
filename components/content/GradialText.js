document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector(".gradual-appear");
    const words = title.textContent.trim().split(/\s+/); // Разделяем заголовок на слова, удаляя пробелы в начале и в конце
  
    // Очищаем текст заголовка
    title.textContent = "";
  
    // Функция для показа поочередных слов с задержкой
    function showWordsWithDelay(index) {
      if (index < words.length) {
        setTimeout(function() {
          title.textContent += words[index] + " "; // Добавляем пробел после слова
          showWordsWithDelay(index + 1);
        }, 500); // Задержка в полсекунды между словами
      }
    }
  
    // Показываем слова по очереди после загрузки страницы
    showWordsWithDelay(0);
  
    // Постепенно делаем заголовок видимым после появления всех слов
    setTimeout(function() {
      title.style.opacity = "1";
    }, words.length * 500); // Полная задержка равна количеству слов * 500 мс
  });
  