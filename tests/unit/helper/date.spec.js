import dateHelper from "@/helper/date.js"


describe('test helper functions', () => {
    it('should convert day integers to strings', () => {
        const dayName = dateHelper.getDayName(1);

        expect(dayName).toBe('Mo');
    })
})