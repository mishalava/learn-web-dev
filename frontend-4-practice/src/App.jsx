import { useEffect, useState } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import Footer from './components/Footer';
import { fetchToday, fetchSlots } from './api';
import { toDateParams, isSameDay } from './utils/date';
import './styles.css';

function App() {
  const [today, setToday] = useState(null);        
  const [todayLoading, setTodayLoading] = useState(true);
  const [todayError, setTodayError] = useState(null);

  
  const [currentYear, setCurrentYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); 

  
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

 
  useEffect(() => {
    let cancelled = false;

    async function loadToday() {
      try {
        setTodayLoading(true);
        setTodayError(null);
        const data = await fetchToday();
        if (cancelled) return;

        const date = new Date(data.year, data.month, data.day);
        setToday(date);
        setCurrentYear(data.year);
        setCurrentMonth(data.month);
        setSelectedDate(date);
      } catch (err) {
        if (!cancelled) setTodayError(err.message);
      } finally {
        if (!cancelled) setTodayLoading(false);
      }
    }

    loadToday();
    return () => { cancelled = true; };
  }, []);

 
  useEffect(() => {
    if (!selectedDate) return;

    const controller = new AbortController();
    let cancelled = false;

    async function loadSlots() {
      try {
        setSlotsLoading(true);
        setSlotsError(null);
        setSlots([]);
        const data = await fetchSlots(toDateParams(selectedDate), controller.signal);
        if (cancelled) return;

        
        const resp = data.date;
        const expected = toDateParams(selectedDate);
        if (
          resp.day !== expected.day ||
          resp.month !== expected.month ||
          resp.year !== expected.year
        ) {
          return;
        }

        setSlots(data.slots);
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (!cancelled) setSlotsError(err.message);
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    }

    loadSlots();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [selectedDate]);

  
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
    if (isSameDay(date, selectedDate)) return;
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

          {todayLoading && (
            <p className="pageState">Загрузка…</p>
          )}

          {todayError && (
            <p className="pageState pageError">
              Не удалось загрузить данные: {todayError}
            </p>
          )}

          {!todayLoading && !todayError && today && (
            <>
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
                  slots={slots}
                  loading={slotsLoading}
                  error={slotsError}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </div>

              <div className="heroButton">
                <button className={isReady ? 'ready' : ''} disabled={!isReady}>
                  Продолжить
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;