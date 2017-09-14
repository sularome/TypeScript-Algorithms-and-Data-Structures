import HashTable from "../ts/HashTable";
describe(`HashTable`, function () {
    it(`should be able to put elements and retrieve them`, function () {
        const table = new HashTable<number, number>(5, (key) => key);
        table.put(1, 3);
        table.put(2, 10);
        expect(table.get(1)).toEqual(3);
        expect(table.get(2)).toEqual(10);
    });

    it(`should be able to retrieve elements with colisions`, function () {
        const table = new HashTable<number, number>(5, (key) => 3);
        table.put(1, 3);
        table.put(2, 10);
        expect(table.get(1)).toEqual(3);
        expect(table.get(2)).toEqual(10);
    });

    it(`not found element will return null`, function () {
        const table = new HashTable<number, number>(5, (key) => key);
        table.put(1, 3);
        table.put(2, 10);
        expect(table.get(3)).toBeNull();
    });

    it(`not found element will return null even if another value is in the bucket`, function () {
        const table = new HashTable<number, number>(5, (key) => 3);
        table.put(1, 3);
        table.put(2, 10);
        expect(table.get(3)).toBeNull();
    });

    it(`should be able to put elements with negative key hash`, function () {
        const table = new HashTable<number, number>(5, (key) => key);
        table.put(-1, 3);
        expect(table.get(-1)).toEqual(3);
    });

    it(`should be able to put elements with key above capacity`, function () {
        const table = new HashTable<number, number>(5, (key) => key);
        table.put(5, 3);
        table.put(6, 44);
        expect(table.get(5)).toEqual(3);
        expect(table.get(6)).toEqual(44);
    });

    it(`should be able to clear the hashtable`, function () {
        const table = new HashTable<number, number>(5, (key) => key);
        table.put(5, 3);
        table.put(6, 44);
        expect(table.get(5)).toEqual(3);
        expect(table.get(6)).toEqual(44);
        table.clear();
        expect(table.get(5)).toBeNull();
        expect(table.get(6)).toBeNull();

    });

    describe(`contains`, function () {
        it(`should return false if hastable doesn't contain value`, function () {
            const table = new HashTable<number, number>(5, (key) => key);
            table.put(1, 3);
            table.put(2, 10);
            expect(table.contains(1)).toEqual(false);
        });
        it(`should return true if hastable contains value`, function () {
            const table = new HashTable<number, number>(5, (key) => key);
            table.put(1, 3);
            table.put(2, 10);
            expect(table.contains(3)).toEqual(true);
            expect(table.contains(10)).toEqual(true);
        });

        describe(`containsKey`, function () {
            it(`should return false if hastable doesn't contain the key`, function () {
                const table = new HashTable<number, number>(5, (key) => key);
                table.put(1, 3);
                table.put(2, 10);
                expect(table.containsKey(3)).toEqual(false);
                expect(table.containsKey(0)).toEqual(false);
                expect(table.containsKey(-1)).toEqual(false);
            });
            it(`should return true if hastable contains the key`, function () {
                const table = new HashTable<number, number>(5, (key) => key);
                table.put(1, 3);
                table.put(2, 10);
                expect(table.containsKey(1)).toEqual(true);
                expect(table.containsKey(2)).toEqual(true);
            });
        });

        describe(`containsValue`, function () {
            it(`will return false if hashtable maps one or more keys to this value`, function () {
                const table = new HashTable<number, number>(5, (key) => key);
                table.put(1, 3);
                table.put(2, 10);
                expect(table.containsValue(4)).toEqual(false);
                expect(table.containsValue(0)).toEqual(false);
                expect(table.containsValue(-1)).toEqual(false);
            });
            it(`will return true if hashtable maps one or more keys to this value`, function () {
                const table = new HashTable<number, number>(5, (key) => key);
                table.put(1, 3);
                table.put(2, 10);
                expect(table.containsValue(3)).toEqual(true);
                expect(table.containsValue(10)).toEqual(true);
            });
        });
    });
});