fdescribe('BinaryTree', function () {
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
    });
});