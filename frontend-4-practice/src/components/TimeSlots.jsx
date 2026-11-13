export default function TimeSlots({ slots, loading, error, selectedTime, onSelectTime }) {
  return (
    <div className="time">
      <div className="textTime">
        <h4>Доступное время</h4>
      </div>

      {loading && <p className="timeState">Загрузка…</p>}
      {error && <p className="timeState timeError">{error}</p>}

      {!loading && !error && (
        <div className="times">
          {slots.length === 0 && <p className="timeState">Нет слотов на эту дату</p>}
          {slots.map((slot) => (
            <div
              key={slot.time}
              className={[
                'timeBlock',
                !slot.available && 'timeBlockDisabled',
                selectedTime === slot.time && 'active',
              ].filter(Boolean).join(' ')}
              onClick={() => slot.available && onSelectTime(slot.time)}
            >
              <p>{slot.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}