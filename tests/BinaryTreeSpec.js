describe('BinaryTree', function () {
    beforeAll(function (done) {
        System.import('BinaryTree').then(function (a) {
            this.BinaryTree = a.BinaryTree;
            done();
        }.bind(this));
    });
    it('should be able to add node', function () {
        var tree = new this.BinaryTree(function (a,b) {return a > b;});
        tree.add(5);
        expect(tree.root.value).toEqual(5);
        tree.add(6);
        expect(tree.root.right.value).toEqual(6);
        tree.add(4);
        expect(tree.root.left.value).toEqual(4);
        var ar = [];
    });

    it('should be able to add node to binary tree with object values', function () {
        var tree = new this.BinaryTree(function (a,b) {return a.amount > b.amount;});
        tree.add({amount : 5});
        expect(tree.root.value).toEqual({amount : 5});
        tree.add({amount : 6});
        expect(tree.root.right.value).toEqual({amount : 6});
        tree.add({amount : 4});
        expect(tree.root.left.value).toEqual({amount : 4});
        var ar = [];
    });

    it('should be able to walk the binary tree in order', function () {
        var tree = new this.BinaryTree(function (a,b) {return a > b;});
        tree.add(5);
        tree.add(6);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        expect(tree.inorderTreeWalk(function (pv, cv) {
            pv.push(cv);
            return pv;
        }, [])).toEqual([1,2,4,5,6]);
    });

    it('should be able to walk the binary tree that has object values in order', function () {
        var tree = new this.BinaryTree(function (a,b) {return a.amount > b.amount;});
        tree.add({amount: 6});
        tree.add({amount: 4});
        tree.add({amount: 5});
        tree.add({amount: 1});
        tree.add({amount: 2});
        expect(tree.inorderTreeWalk(function (pv, cv) {
            pv.push(cv.amount);
            return pv;
        }, [])).toEqual([1,2,4,5,6]);
    });


    it('should be able to walk the binary tree in order', function () {
        var tree = new this.BinaryTree(function (a,b) {return a > b;});
        tree.add(5);
        tree.add(6);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        expect(tree.reverseTreeWalk(function (pv, cv) {
            pv.push(cv);
            return pv;
        }, [])).toEqual([6,5,4,2,1]);
    });

    it('should be able to walk the binary tree in reverseorder', function () {
        var tree = new this.BinaryTree(function (a,b) {return a.amount > b.amount;});
        tree.add({amount: 6});
        tree.add({amount: 4});
        tree.add({amount: 5});
        tree.add({amount: 1});
        tree.add({amount: 2});
        expect(tree.reverseTreeWalk(function (pv, cv) {
            pv.push(cv.amount);
            return pv;
        }, [])).toEqual([6,5,4,2,1]);
    });

    describe(' search', function () {
        it('should return null when no root', function () {
            var tree = new this.BinaryTree(function (a,b) {return a > b;});
            expect(tree.search(5)).toBeNull();
        });

        it('should return element when found', function () {
            var tree = new this.BinaryTree(function (a,b) {return a > b;});
            tree.add(5);
            expect(tree.search(5).value).toEqual(5);
            tree.add(6);
            expect(tree.search(6).value).toEqual(6);
        });

        it('should return null when no element was found', function () {
            var tree = new this.BinaryTree(function (a,b) {return a > b;});
            tree.add(5);
            expect(tree.search(23)).toBeNull();
            tree.add(6);
            expect(tree.search(16)).toBeNull();
        });
    });

    it('should be able to get max value', function () {
        var tree = new this.BinaryTree(function (a,b) {return a > b;});
        expect(tree.min().value).toBeNull();
        tree.add(1);
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.min().value).toEqual(1);
    });

    it('should be able to get min value', function () {
        var tree = new this.BinaryTree(function (a,b) {return a > b;});
        expect(tree.max().value).toBeNull();
        tree.add(1);
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.max().value).toEqual(5);
    });
});