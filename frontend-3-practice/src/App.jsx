import { useState } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import Footer from './components/Footer';
import { todayDate } from './utils/date';
import './components/styles.css';

function App() {
  const [today] = useState(() => todayDate());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (date) => {
    if (
      selectedDate &&
      date.getTime() === selectedDate.getTime()
    ) return;

    setSelectedDate(date);
    setSelectedTime(null); 
  };

  const isReady = selectedDate !== null && selectedTime !== null;

  return (
    <>
      <Header />
      <div className="wrapper">
        <Progress />

        <div className="hero">
          <div className="heroMainText">
            <span>{'< Назад'}</span>
            <h3>Выберите дату и время</h3>
          </div>

          <div className="heroMainMenu">
            <Calendar
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              today={today}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onSelectDate={handleSelectDate}
            />
            <TimeSlots
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          </div>

          <div className="heroButton">
            <button
              className={isReady ? 'ready' : ''}
              disabled={!isReady}
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;