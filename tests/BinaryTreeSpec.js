describe('BinaryTree', function () {
    beforeAll(function (done) {
        System.import('BinaryTree').then((a) => {
            this.BinaryTree = a.BinaryTree;
            done();
        });
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
        }, [])).toEqual([1,2,4,5,6].reverse());
    });
});