export class Utils {
    public static range(start: number, end: number, step: number = 1): number[] {
        let i = start;
        let output: number[] = [];
        while (i < end) {
            output.push(i);
            i = i + step;
        }

        return output;
    }
}