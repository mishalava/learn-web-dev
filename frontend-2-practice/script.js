// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// Начните писать код здесь.

/*window.onload = function() {
  const day = document.getElementById('daysNumberRow2White')
  day.style.background = '#74389F';
  day.style.color = '#fff';
};

document.addEventListener('DOMContentLoaded', () => {
  const timeBlocks = document.querySelectorAll('.timeBlock');

  timeBlocks.forEach(block => {
    block.addEventListener('click', function() {
        timeBlocks.forEach(b => b.classList.remove('active'));
      this.classList.toggle('active'); 
    });
  });
});
*/

(function () {
    const monthLabel = document.getElementById('monthLabel');
    const daysGrid   = document.getElementById('daysGrid');
    const prevBtn    = document.getElementById('prevBtn');
    const nextBtn    = document.getElementById('nextBtn');

    const MONTHS = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Старт: текущий месяц (или new Date(2026, 9, 1) для октября 2026)
    let current = new Date();
    current.setDate(1);

    let selectedDate = null; // выбранный день (Date | null)

    function render() {
        const year  = current.getFullYear();
        const month = current.getMonth();

        monthLabel.textContent = `${MONTHS[month]} ${year}`;
        daysGrid.innerHTML = '';

        const jsFirstDay  = new Date(year, month, 1).getDay();
        const offset      = (jsFirstDay + 6) % 7; // Пн = 0
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrev  = new Date(year, month, 0).getDate();

        const today = new Date();
        const isCurrentMonth =
            today.getFullYear() === year && today.getMonth() === month;

        // дни предыдущего месяца
        for (let i = offset - 1; i >= 0; i--) {
            const d = document.createElement('div');
            d.className = 'day other-month';
            d.textContent = daysInPrev - i;
            daysGrid.appendChild(d);
        }

        // дни текущего месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const d = document.createElement('div');
            d.className = 'day';
            d.textContent = day;

            if (isCurrentMonth && today.getDate() === day) {
                d.classList.add('today');
            }

            if (
                selectedDate &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === day
            ) {
                d.classList.add('selected');
            }

            d.addEventListener('click', () => {
                selectedDate = new Date(year, month, day);
                render();
            });

            daysGrid.appendChild(d);
        }

        // добиваем до полной строки
        const remainder = daysGrid.children.length % 7;
        if (remainder !== 0) {
            for (let i = 1; i <= 7 - remainder; i++) {
                const d = document.createElement('div');
                d.className = 'day other-month';
                d.textContent = i;
                daysGrid.appendChild(d);
            }
        }
    }

    function goPrev() {
        current.setMonth(current.getMonth() - 1);
        render();
    }

    function goNext() {
        current.setMonth(current.getMonth() + 1);
        render();
    }

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    render();
})();
