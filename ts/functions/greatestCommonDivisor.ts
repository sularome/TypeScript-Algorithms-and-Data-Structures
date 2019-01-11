/**
 * Euclid's algorithm for finding the greatest common divisor of two numbers greater than 0
 * @param {number} a greater than 0
 * @param {number} b greater than 0
 */
export function greatestCommonDivisor(a: number, b: number): number {
    if (a < 0 || b < 0 || a + b === 0) {
        return NaN;
    }
    if (a < b) {
        return greatestCommonDivisor(b, a);
    }
    return  b > 0 ? greatestCommonDivisor(b , a % b) : a;
}