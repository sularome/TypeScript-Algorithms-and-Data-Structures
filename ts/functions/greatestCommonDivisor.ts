/**
 * Euclid's algorithm for finding the greatest common divisor of two numbers greater than 0
 * @param {number} a greater than 0
 * @param {number} b greater than 0 
 */
export function greatestCommonDivisor(a: number, b: number): number {
    if (a <= 0) {
        throw new Error(`Parametter less or equal than zero. ${a}`)
    }
    if (b < 0) {
        throw new Error(`Parametter less or equal than zero. ${b}`)
    }
    if (a < b) {
        return greatestCommonDivisor(b, a);
    }
    return  b > 0 ? greatestCommonDivisor(b , a % b) : a;
}