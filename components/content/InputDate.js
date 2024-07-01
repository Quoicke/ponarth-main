function isAllowedTime(time) {
    return ['12:00', '15:00', '19:00'].includes(time);
}

function submitDateTime() {
    var selectedDate = document.getElementById('date').value;
    var selectedTime = document.getElementById('time').value;

    if (!isAllowedTime(selectedTime)) {
        alert('Пожалуйста, выберите одно из разрешенных времен: 12:00, 15:00 или 19:00.');
        return;
    }

    // Объединяем дату и время в одну строку или объект Date
    var dateTimeString = selectedDate + 'T' + selectedTime;
    var dateTime = new Date(dateTimeString);

    // Отправляем dateTime на сервер или выполняем другие операции с ним
    console.log('Выбранная дата и время:', dateTime);
}
