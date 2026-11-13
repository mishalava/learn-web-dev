function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }

  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const monthLabel = document.getElementById('monthLabel');
const daysGrid = document.getElementById('daysGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const continueBtn = document.getElementById('heroButton');

function todayDate() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

const initialToday = todayDate();
let currentYear = initialToday.getFullYear();
let currentMonth = initialToday.getMonth();

let selectedDate = initialToday;
let selectedTime = null;

function renderCalendar(year, month) {
  monthLabel.textContent = `${MONTHS[month]} ${year}`;

  const weeks = buildCalendarGrid(year, month);
  const todayTime = todayDate().getTime();
  const selectedDateTime = selectedDate ? selectedDate.getTime() : null;

  daysGrid.innerHTML = '';

  weeks.forEach(week => {
    week.forEach(cell => {
      const el = document.createElement('div');
      el.className = 'day-cell';
      el.textContent = cell.day;

      if (cell.otherMonth) el.classList.add('other-month');

      let cellDate;
      if (!cell.otherMonth) {
        cellDate = new Date(year, month, cell.day);
      } else if (cell.day > 15) {
        cellDate = new Date(year, month - 1, cell.day);
      } else {
        cellDate = new Date(year, month + 1, cell.day);
      }

      const cellTime = cellDate.getTime();

      if (cellTime < todayTime) {
        el.classList.add('past', 'disabled');
      }

      if (selectedDateTime !== null && cellTime === selectedDateTime) {
        el.classList.add('today');
      }
      else if (cellTime === todayTime) {
        el.classList.add('is-today');
      }

      if (cellTime >= todayTime) {
        el.addEventListener('click', () => {
          if (selectedDateTime !== null && cellTime === selectedDateTime) return;

          selectedDate = cellDate;
          selectedTime = null;
          clearActiveSlot();
          renderCalendar(currentYear, currentMonth);
          updateContinueButton();
        });
      }

      daysGrid.appendChild(el);
    });
  });
}

const timeBlocks = document.querySelectorAll('.timeBlock');

function clearActiveSlot() {
  timeBlocks.forEach(b => b.classList.remove('active'));
}

timeBlocks.forEach(block => {
  block.addEventListener('click', () => {
    if (!selectedDate) return;

    clearActiveSlot();
    block.classList.add('active');
    selectedTime = block.querySelector('p').textContent.trim();

    updateContinueButton();
  });
});

function updateContinueButton() {
  const ready = selectedDate !== null && selectedTime !== null;
  continueBtn.disabled = !ready;
  continueBtn.classList.toggle('ready', ready);
}

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar(currentYear, currentMonth);
});


renderCalendar(currentYear, currentMonth);
updateContinueButton();