export function formatTimeForDisplay(timeStr)
{
  if (timeStr.includes('am') || timeStr.includes('pm')) return timeStr;
  
  const [hours, minutes] = timeStr.split(':');
  let period = 'am';
  let displayHours = hours;
  
  const hoursNum = parseInt(hours, 10);
  
  if (hoursNum >= 12) {
    period = 'pm';
    displayHours = hoursNum > 12 ? String(hoursNum - 12) : hours;
  }
  if (hoursNum === 0) {
    displayHours = '12';
  }

  return `${displayHours}:${minutes} ${period}`;
}