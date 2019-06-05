export default {
    methods: {
        getDayName: function(dayOfWeek) {
            const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
            return dayNames[dayOfWeek];
        }
    }
}