export function formatTimeForInput(timeStr) {
  if (!timeStr) return "";
  const [time, period] = timeStr.split(' ');
  if (!period) return time; // already in 24h format
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}