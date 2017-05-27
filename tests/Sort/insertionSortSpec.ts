import insertionSort from "../../ts/Sort/insertionSort";
describe("Insertion sort", function () {
    it("should sort", function () {
        expect(insertionSort([1, 4, 2, 3])).toEqual([1, 2, 3, 4]);
        expect(insertionSort([11, 4, 2, 3])).toEqual([2, 3, 4, 11]);
        expect(insertionSort([5, 2, 4, 6, 1, 3])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should return empty array if empty or one element array is passed", function () {
        expect(insertionSort([])).toEqual([]);
        expect(insertionSort([1])).toEqual([1]);
    });

    it("should reverse  sort", function () {
        expect(insertionSort([1, 4, 2, 3], true)).toEqual([4, 3, 2, 1]);
        expect(insertionSort([11, 4, 2, 3], true)).toEqual([11, 4, 3, 2]);
        expect(insertionSort([5, 2, 4, 6, 1, 3], true)).toEqual([6, 5, 4, 3, 2, 1]);
    });
});