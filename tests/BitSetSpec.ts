import {BitSet} from "../ts/BitSet";

describe('BitSet', function () {
    it('be able to set bits', function () {
        var bs = new BitSet(100);
        bs.set(1, true);
        bs.set(99, true);
        expect(bs.get(0)).toEqual(false);
        expect(bs.get(1)).toEqual(true);
        expect(bs.get(54)).toEqual(false);
        expect(bs.get(99)).toEqual(true);
    });

    it('be able to get set bits count', function () {
        var bs = new BitSet(100);
        bs.set(1, true);
        bs.set(99, true);
        expect(bs.count()).toEqual(2);
        bs.set(99, false);
        expect(bs.count()).toEqual(1);
    });

    it('be able to get set bits count', function () {
        var bs = new BitSet(100);
        bs.set(1, true);
        bs.set(99, true);
        expect(bs.getIndexes()).toEqual([1,99]);
        bs.set(29, true);
        expect(bs.getIndexes()).toEqual([1,29,99]);
        bs.set(29, false);
        expect(bs.getIndexes()).toEqual([1,99]);
    });
});