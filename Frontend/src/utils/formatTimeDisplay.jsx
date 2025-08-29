export function formatTimeForDisplay(timeString) {
  if (!timeString) return "";
  

  const [hoursStr, minutes] = timeString.split(":");
  if (!hoursStr) return timeString; 
  
  let hours = parseInt(hoursStr);
  let period = "am";
  
  if (hours >= 12) {
    period = "pm";
    if (hours > 12) hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
}
