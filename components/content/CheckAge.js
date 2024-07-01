// Получаем модальное окно
        var modal1 = document.getElementById("ageModal");
        
        // Отображаем модальное окно при загрузке страницы
        window.onload = function() {
          modal1.style.display = "block";
        }
        
        // Проверка возраста при нажатии на кнопку
        function checkAge() {
          var ageInput = document.getElementById("ageInput").value;
          if (ageInput >= 18) {
            modal1.style.display = "none"; // Закрываем модальное окно если возраст достаточный
          } else {
            alert("Вы слишком молоды для просмотра этого сайта!"); // Иначе выводим сообщение об ошибке
          }
        }
