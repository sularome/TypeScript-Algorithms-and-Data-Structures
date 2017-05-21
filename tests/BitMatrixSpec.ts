import {BitMatrix} from "../ts/BitMatrix";

describe("BitMatrix", function () {
    it("be able to set bits", function () {
        const bm = new BitMatrix(100, 100);
        bm.set(1, 1, true);
        bm.set(99, 0, true);
        bm.set(99, 1, true);
        bm.set(99, 99, true);
        expect(bm.get(0, 1)).toEqual(false);
        expect(bm.get(1, 1)).toEqual(true);
        expect(bm.get(54, 34)).toEqual(false);
        expect(bm.get(99, 0)).toEqual(true);
        expect(bm.get(99, 1)).toEqual(true);
        expect(bm.get(99, 99)).toEqual(true);
    });

    it("be able to get set bits count", function () {
        const bm = new BitMatrix(100, 100);
        bm.set(1, 1, true);
        bm.set(99, 1, true);
        expect(bm.count()).toEqual(2);
        bm.set(99, 1, false);
        expect(bm.count()).toEqual(1);
    });

    it("be able to get set bits count", function () {
        const bm = new BitMatrix(100, 100);
        bm.set(1, 1, true);
        bm.set(99, 99, true);
        expect(bm.getIndexes()[0]).toEqual([]);
        expect(bm.getIndexes()[1]).toEqual([1]);
        expect(bm.getIndexes()[99]).toEqual([99]);
        bm.set(29, 29, true);
        expect(bm.getIndexes()[0]).toEqual([]);
        expect(bm.getIndexes()[1]).toEqual([1]);
        expect(bm.getIndexes()[29]).toEqual([29]);
        expect(bm.getIndexes()[99]).toEqual([99]);
        bm.set(29, 29, false);
        expect(bm.getIndexes()[0]).toEqual([]);
        expect(bm.getIndexes()[1]).toEqual([1]);
        expect(bm.getIndexes()[99]).toEqual([99]);
    });

    it("should throw error if trying to set bit out of bounds", function () {
        const bm = new BitMatrix(100, 100);
        expect(() => bm.set(1, 1, true)).not.toThrowError();
        expect(() => bm.set(100, 100, true)).toThrowError();
        expect(() => bm.set(100, 1, true)).toThrowError();
        expect(() => bm.set(101, 0, true)).toThrowError();
        expect(() => bm.set(101, 0, true)).toThrowError();
        expect(() => bm.set(-1, 1, true)).toThrowError();
        expect(() => bm.set(-1, -1, true)).toThrowError();
        expect(() => bm.set(1, -1, true)).toThrowError();
    });

    it("should be able to zero all values", function () {
        const bs = new BitMatrix(100, 100);
        bs.set(0, 1, true);
        bs.set(0, 99, true);
        bs.set(57, 1, true);
        bs.set(57, 99, true);
        bs.set(99, 1, true);
        bs.set(99, 99, true);
        expect(bs.get(0, 0)).toEqual(false);
        expect(bs.get(0, 1)).toEqual(true);
        expect(bs.get(0, 54)).toEqual(false);
        expect(bs.get(0, 99)).toEqual(true);
        expect(bs.get(57, 0)).toEqual(false);
        expect(bs.get(57, 1)).toEqual(true);
        expect(bs.get(57, 54)).toEqual(false);
        expect(bs.get(57, 99)).toEqual(true);
        expect(bs.get(99, 0)).toEqual(false);
        expect(bs.get(99, 1)).toEqual(true);
        expect(bs.get(99, 54)).toEqual(false);
        expect(bs.get(99, 99)).toEqual(true);
        bs.reset();
        expect(bs.get(0, 0)).toEqual(false);
        expect(bs.get(0, 1)).toEqual(false);
        expect(bs.get(0, 54)).toEqual(false);
        expect(bs.get(0, 99)).toEqual(false);
        expect(bs.get(57, 0)).toEqual(false);
        expect(bs.get(57, 1)).toEqual(false);
        expect(bs.get(57, 54)).toEqual(false);
        expect(bs.get(57, 99)).toEqual(false);
        expect(bs.get(99, 0)).toEqual(false);
        expect(bs.get(99, 1)).toEqual(false);
        expect(bs.get(99, 54)).toEqual(false);
        expect(bs.get(99, 99)).toEqual(false);
    });

    describe("resize", function () {
        it("should be able to extend the BitMatrix", function () {
            const bm = new BitMatrix(100, 110);
            bm.set(1, 1, true);
            bm.set(1, 2, true);
            bm.set(1, 99, true);
            bm.resize(300, 302);
            expect(bm.get(1, 300)).toEqual(false);
            expect(bm.get(1, 301)).toEqual(false);
            bm.set(151, 300, true);
            bm.set(151, 301, true);
            expect(bm.get(151, 300)).toEqual(true);
            expect(bm.get(151, 301)).toEqual(true);
        });

        it("should be able to shrink the BitMatrix", function () {
            const bm = new BitMatrix(100, 100);
            bm.set(23, 1, true);
            bm.set(23, 2, true);
            bm.set(23, 99, true);
            bm.resize(55, 51);
            expect(bm.get(23, 49)).toEqual(false);
            expect(bm.get(23, 50)).toEqual(false);
            bm.set(23, 50, true);
            expect(bm.get(23, 49)).toEqual(false);
            expect(bm.get(23, 50)).toEqual(true);
        });

        it("nothing should be affected if the size doesn't change", function () {
            const bm = new BitMatrix(100, 100);
            bm.set(1, 1, true);
            bm.set(2, 1, true);
            bm.set(99, 1, true);
            bm.resize(100, 100);
            expect(bm.get(0, 1)).toEqual(false);
            expect(bm.get(1, 1)).toEqual(true);
            expect(bm.get(54, 1)).toEqual(false);
            expect(bm.get(99, 1)).toEqual(true);
        });

        it("should throw error if index is invalid", function () {
            const bm = new BitMatrix(1, 1);
            expect(() => bm.resize(-1, 10)).toThrowError();
            expect(() => bm.resize(-1, -1)).toThrowError();
            expect(() => bm.resize(11, -1)).toThrowError();
        });
    });
    //
    // describe("splice", function () {
    //     it("should remove number of elements", function () {
    //         const bs = new BitArray(100);
    //         bs.set(1, true);
    //         bs.set(2, true);
    //         bs.set(5, true);
    //         bs.set(6, true);
    //         bs.set(99, true);
    //         bs.splice(2, 3);
    //         expect(bs.size()).toEqual(97);
    //         expect(bs.get(1)).toEqual(true);
    //         expect(bs.get(2)).toEqual(true);
    //         expect(bs.get(3)).toEqual(true);
    //         expect(bs.get(5)).toEqual(false);
    //         expect(bs.get(96)).toEqual(true);
    //     });
    //
    //     it("should be able to provide negative start index", function () {
    //         const bs = new BitArray(100);
    //         bs.set(1, true);
    //         bs.set(2, true);
    //         bs.set(5, true);
    //         bs.set(6, true);
    //         bs.set(99, true);
    //         bs.splice(-98, 3);
    //         expect(bs.size()).toEqual(97);
    //         expect(bs.get(1)).toEqual(true);
    //         expect(bs.get(2)).toEqual(true);
    //         expect(bs.get(3)).toEqual(true);
    //         expect(bs.get(5)).toEqual(false);
    //         expect(bs.get(96)).toEqual(true);
    //     });
    //
    //     it("delete is NaN or less than 1 do nothing", function () {
    //         const bs = new BitArray(100);
    //         bs.splice(-98, -3);
    //         expect(bs.size()).toEqual(100);
    //         bs.splice(-98, Number.NaN);
    //         expect(bs.size()).toEqual(100);
    //     });
    //
    //     it("should throw error if start index is greater than array length", function () {
    //         const bs = new BitArray(100);
    //         expect(() => bs.splice(101, 2)).toThrowError();
    //     });
    //
    //     it("should splice from 0 if negative value passed and it is greater than array length by abs value", function () {
    //         const bs = new BitArray(100);
    //         expect(() => bs.splice(-101, 2)).toThrowError();
    //     });
    // });
});