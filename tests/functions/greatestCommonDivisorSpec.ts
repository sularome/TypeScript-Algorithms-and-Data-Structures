import { greatestCommonDivisor } from "../../ts/functions/greatestCommonDivisor";

describe("greatestCommonDivisor", () => {
    it("should be able to find common divisor for the same number", () => {
        expect(greatestCommonDivisor(17, 17)).toEqual(17)
    });
    it("should return 1 when no common divisor", () => {
        expect(greatestCommonDivisor(17, 6)).toEqual(1)
    });
    it("should return first if it is multiple of second", () => {
        expect(greatestCommonDivisor(15, 35)).toEqual(5)
    });
    it("should throw if first parameter is less than 0", () => {
        expect(() => greatestCommonDivisor(-15, 35)).toThrow()
    });
    it("should throw if second parameter is less than 0", () => {
        expect(() => greatestCommonDivisor(15, -35)).toThrow()
    });
});