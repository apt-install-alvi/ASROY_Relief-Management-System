export function formatDateForDisplay(sqlDate) {
  if (!sqlDate) return "";

  let year, month, day;

  if (typeof sqlDate === "string") {
    // Format: "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS.000Z"
    const datePart = sqlDate.split("T")[0]; // remove time if present
    [year, month, day] = datePart.split("-");
  } else if (sqlDate instanceof Date) {
    year = sqlDate.getFullYear();
    month = (sqlDate.getMonth() + 1).toString().padStart(2, "0");
    day = sqlDate.getDate().toString().padStart(2, "0");
  } else {
    return "";
  }

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const monthName = months[parseInt(month, 10) - 1];

  return `${day}-${monthName}-${year}`;
}