export function formatDateForInput(dateStr){
  const [day, month, year] = dateStr.split('/');
  return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}