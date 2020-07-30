import * as dateHelper from "@/helper/date.js";

describe("test helper functions", () => {
  it("should convert day integers to strings", () => {
    const dayName = dateHelper.getDayName(1);

    expect(dayName).toBe("Mo");
    expect(typeof dayName).toBe("string");
  });

  it('first element should be "So"', () => {
    const dayName = dateHelper.getDayName(0);

    expect(dayName).toBe("So");
    expect(typeof dayName).toBe("string");
  });

  it('last element should be "Sa"', () => {
    const dayName = dateHelper.getDayName(6);

    expect(dayName).toBe("Sa");
    expect(typeof dayName).toBe("string");
  });

  it("should convert month integers to strings", () => {
    const monthName = dateHelper.getMonthName(1);

    expect(monthName).toBe("Feb");
    expect(typeof monthName).toBe("string");
  });

  it('first element should be "Jan"', () => {
    const monthName = dateHelper.getMonthName(0);

    expect(monthName).toBe("Jan");
    expect(typeof monthName).toBe("string");
  });

  it('last element should be "Dec"', () => {
    const monthName = dateHelper.getMonthName(11);

    expect(monthName).toBe("Dec");
    expect(typeof monthName).toBe("string");
  });

  it("have a method to calculate the amount of days that should be rendered before / after the current day", () => {
    const amountOfDays = dateHelper.calculateRenderDays(13);
    expect(amountOfDays).toBe(6);
  });

  it("have a method to calculate the amount of days that should be rendered before / after the current day", () => {
    const amountOfDays = dateHelper.calculateRenderDays(12);
    expect(amountOfDays).toBe(6);
  });
});
