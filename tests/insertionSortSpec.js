describe('Insertion sort', function () {
    it('should sort', function () {
        expect(insertionSort([1,4,2,3])).toEqual([1,2,3,4]);
        expect(insertionSort([11,4,2,3])).toEqual([2,3,4,11]);
    });
});