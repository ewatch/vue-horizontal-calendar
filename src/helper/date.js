function getDayName(dayOfWeek) {
  const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  return dayNames[dayOfWeek];
}

function getMonthName(monthOfYear) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return monthNames[monthOfYear];
}

export { getDayName, getMonthName };
