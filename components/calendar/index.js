const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentDay = currentTime.getDate();
    const year = currentTime.getFullYear();

    // Получаем месяц (добавляем 1, так как месяцы в JavaScript нумеруются с 0)
    let month = currentTime.getMonth() + 1;
    month = month < 10 ? '0' + month : month; // Добавляем ноль в начало, если месяц состоит из одной цифры

    // Получаем день
    let day = currentTime.getDate();
    day = day < 10 ? '0' + day : day; // Добавляем ноль в начало, если день состоит из одной цифры

    // Формируем дату в формате "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
    const options = {
      settings: {
        lang: 'ru',
        range: {
          disablePast: true,
          disableWeekday: [0, 1, 5, 6, 7, 8],
        },
        visibility: {
          weekend: false,
          today: false,
        },
        selection: {
          year: false,
          month: "only-arrows",
          time: 24,

        },
        selected: {
          dates: [formattedDate],
        }

      },
      actions: {
        changeTime(event, self) {
          console.log(self);
        },
        clickDay(event, self) {
          document.querySelectorAll("#calendar-button").forEach((button) => {
            button.style.background = "";
            button.style.color = "";
            // Получаем текущую дату
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentHours = currentDate.getHours();

            // Разбираем значение кнопки, чтобы получить часы
            const buttonHours = parseInt(button.value.split(":")[0]);

            // Проверяем, должна ли кнопка быть отключена
            if (currentDay < parseInt(self[0].split("-")[2])) {
              button.disabled = false; // Разрешаем нажатие кнопки, если день меньше текущего дня
            } else if (buttonHours <= currentHours && currentDay == parseInt(self[0].split("-")[2])) {
              button.disabled = true; // Запрещаем нажатие кнопки, если часы меньше или равны текущему часу и день равен текущему дню
            } else {
              button.disabled = false; // Во всех остальных случаях разрешаем нажатие кнопки
            }
          });
        },
      },
      DOMTemplates: {
        default: `
      <div class="vanilla-calendar-header">
        <div class="vanilla-calendar-header__content">
          <#Year /> <#Month />
        </div>
      </div>
      <div class="vanilla-calendar-wrapper">  
        <div class="vanilla-calendar-content">
          <#ArrowPrev />
          <#ArrowNext />
          <#Week />
          <#Days />
        </div>
      </div>
      <div class="calendar-time">
        <input id="calendar-button" type="button" value="12:00"/>
        <input id="calendar-button" type="button" value="15:00"/>
        <input active id="calendar-button" type="button" value="19:00"/>
      </div>
      
    `,
      },
    };

    document.addEventListener('DOMContentLoaded', () => {
      const calendar = new VanillaCalendar('#calendar', options);
      calendar.init(); calendar.selectedTime = "";
      console.log(calendar);
      function setNullDate() {
        calendar.selectedTime = "";
      }
      document.querySelectorAll(".vanilla-calendar-day").forEach((day) => {
        day.addEventListener("click", setNullDate)
      })
      document.querySelectorAll("#calendar-button").forEach((button) => {
        if (button.value.split(":")[0] <= currentHours) {
          button.disabled = true
        }
        button.addEventListener("click", (event) => {
          const clickedButton = event.target;
          const selectedTime = clickedButton.value;


          // Удаление стилей у всех кнопок
          document.querySelectorAll("#calendar-button").forEach((button) => {
            button.style.background = "";
            button.style.color = "";
          });

          // Применение стилей к выбранной кнопке
          clickedButton.style.background = "#000";
          clickedButton.style.color = "#fff";

          // Установка выбранного времени в календаре
          calendar.selectedTime = selectedTime;
          console.log(calendar.selectedTime);
          checkInputs()
        });
      });

      const numberInput = document.getElementById("quantity");

      numberInput.addEventListener("input", function (event) {
        // Получаем текущее значение поля ввода
        let value = parseInt(event.target.value);

        // Проверяем, не превышает ли значение 10
        if (value > 10) {
          event.target.value = 10; // Устанавливаем значение 10
        }

        // Проверяем, не меньше ли значение 0
        if (value < 0 || isNaN(value)) {
          event.target.value = 1; // Устанавливаем значение 0
        }
      });
      const nameInput = document.getElementById("userName");
      const phoneInput = document.getElementById("phoneNumber");
      const quantityInput = document.getElementById("quantity");
      const submitButton = document.getElementById("submitButton");

      function validatePhoneNumber(phoneNumber) {
        // Убираем все символы, кроме цифр
        const cleaned = phoneNumber.replace(/\D/g, "");
        // Проверяем, что номер содержит 11 цифр
        const isValidLength = cleaned.length === 11;
        // Проверяем, что номер начинается с 7 или 8
        const isValidStart = /^(7|8)/.test(cleaned);
        return isValidLength && isValidStart;
      }
      // Функция для проверки заполненности всех полей ввода
      function checkInputs() {
        // Проверяем, заполнены ли все поля ввода
        if (
          calendar.selectedTime !== "" &&
          nameInput.value.trim() !== "" &&
          validatePhoneNumber(phoneInput.value.trim()) && // Проверяем номер телефона
          quantityInput.value.trim() !== ""
        ) {
          submitButton.disabled = false; // Разрешаем отправку формы, если все поля заполнены
        } else {
          submitButton.disabled = true; // Отключаем отправку формы, если хотя бы одно поле не заполнено
        }
      }

      // Добавляем обработчики событий для каждого поля ввода
      nameInput.addEventListener("input", checkInputs);
      // Добавляем обработчик события для поля ввода номера телефона
      phoneInput.addEventListener("input", function () {
        // Убираем все символы, кроме цифр
        const cleaned = phoneInput.value.replace(/\D/g, "");
        // Ограничиваем введенное значение 11 символами
        const formatted = cleaned.slice(0, 11);
        // Обновляем значение поля ввода
        phoneInput.value = formatted;
        // Проверяем заполненность всех полей
        checkInputs();
      });
      quantityInput.addEventListener("input", checkInputs);


      const TOKEN = "7030782378:AAFV-gcraXeB03Kwx2uo8arxQkFpwZbKTfo";
      const CHAT_ID = "-1001937647175"
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      document.getElementById("zabron").addEventListener("submit", (e) => {
        e.preventDefault();

        let message = `<b>Заявка с сайта</b>\n`;
        message += `<b>Дата: </b> ${calendar.selectedDates[0].split("-").reverse().join(".")}, <b>на Время: </b> ${calendar.selectedTime}\n`;
        message += `<b>Имя: </b> ${this.userName.value}\n`;
        message += `<b>Номер: </b> ${this.phoneNumber.value}\n`;
        message += `<b>Количество персон: </b> ${this.quantity.value}`;

        axios.post(URL_API, {
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: message
        })
      })
    });

    // Получаем модальное окно
const modal = document.getElementById("modal");

// Получаем кнопку закрытия модального окна
const closeBtn = document.querySelector(".close");

// Показываем модальное окно при клике на кнопку submitButton
submitButton.addEventListener("click", function() {
  modal.style.display = "block";
});

// Закрываем модальное окно при клике на кнопку закрытия
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Закрываем модальное окно при клике вне окна
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
