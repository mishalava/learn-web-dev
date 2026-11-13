import { MONTHS, WEEK_DAYS, buildCalendarGrid, isSameDay } from '../utils/date';

export default function Calendar({
  currentYear,
  currentMonth,
  selectedDate,
  today,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}) {
  const weeks = buildCalendarGrid(currentYear, currentMonth);

  return (
    <div className="date">
      <div className="textDate">
        <h4>{`${MONTHS[currentMonth]} ${currentYear}`}</h4>
        <div className="buttonsDate">
          <img src="img/Frame (5).svg" alt="prev" onClick={onPrevMonth} />
          <img src="img/Frame (6).svg" alt="next" onClick={onNextMonth} />
        </div>
      </div>

      <div className="days">
        {WEEK_DAYS.map((d) => <p key={d}>{d}</p>)}
      </div>

      <div className="daysGrid">
        {weeks.map((week, wi) =>
          week.map((cell, di) => {
            const isPast = cell.date < today;
            const isSelected = isSameDay(cell.date, selectedDate);
            const isToday = isSameDay(cell.date, today);

            const classes = ['day-cell'];
            if (cell.otherMonth) classes.push('other-month');
            if (isPast) classes.push('past', 'disabled');
            if (isSelected) classes.push('today');       // стиль выбранного дня
            else if (isToday) classes.push('is-today');  // стиль «сегодня»

            return (
              <div
                key={`${wi}-${di}`}
                className={classes.join(' ')}
                onClick={() => !isPast && onSelectDate(cell.date)}
              >
                {cell.day}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}