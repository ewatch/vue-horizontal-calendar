function getDayName(dayOfWeek) {
	const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
	return dayNames[dayOfWeek];
}

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

function getMonthName(monthOfYear) {
	return monthNames[monthOfYear];
}

function days(n) {
	const ONE_DAY_AS_MS = 86400000;
	return n * ONE_DAY_AS_MS;
}

export { monthNames, getDayName, getMonthName, days };
