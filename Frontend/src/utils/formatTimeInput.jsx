export function formatTimeForInput(timeStr)
{
  const [time, period] = timeStr.split(' ');
  if (period === 'pm' && time.split(':')[0] !== '12') {
    const [hours, minutes] = time.split(':');
    return `${String(Number(hours) + 12).padStart(2, '0')}:${minutes}`;
  }
  return time;
}