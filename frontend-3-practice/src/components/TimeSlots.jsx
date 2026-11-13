import { TIME_SLOTS } from '../utils/date';

export default function TimeSlots({ selectedTime, onSelectTime }) {
  return (
    <div className="time">
      <div className="textTime">
        <h4>Доступное время</h4>
      </div>
      <div className="times">
        {TIME_SLOTS.map((slot) => (
          <div
            key={slot}
            className={`timeBlock ${selectedTime === slot ? 'active' : ''}`}
            onClick={() => onSelectTime(slot)}
          >
            <p>{slot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}