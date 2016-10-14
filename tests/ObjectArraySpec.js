describe('ObjectArray', function () {
    beforeAll(function (done) {
        System.import('ObjectArray').then((a) => {
            this.ObjectArray = a.ObjectArray;
            done();
        });
    });

    it('should be able to add items', function () {
        var list = new this.ObjectArray(200, [{name:'prev', type:Float64Array}, {name:'next', type:Float64Array}, {name:'value', type:Float64Array}]);
        var index = list.push([1,2,3]);
        expect(list.get(index)).toEqual([1,2,3]);
        index = list.push([2,3,4]);
        expect(list.get(index)).toEqual([2,3,4]);
        index = list.push([3,4,5]);
        expect(list.get(index)).toEqual([3,4,5]);
    });

    it('should throw an error if we exceed array max size', function () {
        var list = new this.ObjectArray(2, [{name:'prev', type:Float64Array}, {name:'next', type:Float64Array}, {name:'value', type:Float64Array}]);
        list.push([1,2,3]);
        list.push([1,2,3]);
        expect(list.push.bind(list)).toThrowError(RangeError);
    });

    it('should be able to remove items', function () {
        var list = new this.ObjectArray(200, [{name:'prev', type:Float64Array}, {name:'next', type:Float64Array}, {name:'value', type:Float64Array}]);
        var index = list.push([1,2,3]);
        expect(list.get(index)).toEqual([1,2,3]);
        list.remove(index);
        expect(list.get(index)).toEqual(null);
    });
});