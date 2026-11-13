
async function request(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    let message = `HTTP error ${response.status}`;
    try {
      const data = await response.json();
      if (data && data.error) message = data.error;
    } catch (e) {
    }
    throw new Error(message);
  }

  return response.json();
}

export async function fetchToday(signal) {
  return request("/api/booking/today", signal);
}

export async function fetchSlots(date, signal) {
  const url = `/api/slots?day=${date.day}&month=${date.month}&year=${date.year}`;
  return request(url, signal);
}