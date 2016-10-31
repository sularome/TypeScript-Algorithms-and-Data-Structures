import {BinaryTree} from "../ts/BinaryTree";

describe('BinaryTree', function () {
    describe('add' , function () {
        it('should be able to add node', function () {
            var tree = new BinaryTree<number>();
            tree.add(2);
            expect(tree.root.value).toEqual(2);
            tree.add(1);
            expect(tree.root.left.value).toEqual(1);
        });
        it('should be able to add node', function () {
            var tree = new BinaryTree<number>(function (a,b) {return a > b;});
            tree.add(5);
            expect(tree.root.value).toEqual(5);
            tree.add(6);
            expect(tree.root.right.value).toEqual(6);
            tree.add(4);
            expect(tree.root.left.value).toEqual(4);
        });
    });

    it('should be able to add node to binary tree with object values', function () {
        var tree = new BinaryTree<any>(function (a,b) {return a.amount > b.amount;});
        tree.add({amount : 5});
        expect(tree.root.value).toEqual({amount : 5});
        tree.add({amount : 6});
        expect(tree.root.right.value).toEqual({amount : 6});
        tree.add({amount : 4});
        expect(tree.root.left.value).toEqual({amount : 4});
    });

    it('should be able to walk the binary tree in order', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
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
        var tree = new BinaryTree<any>(function (a,b) {return a.amount > b.amount;});
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
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
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
        var tree = new BinaryTree<any>(function (a,b) {return a.amount > b.amount;});
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
            var tree = new BinaryTree<any>(function (a,b) {return a > b;});
            expect(tree.search(5)).toBeNull();
        });

        it('should return element when found', function () {
            var tree = new BinaryTree<number>(function (a,b) {return a > b;});
            tree.add(5);
            expect(tree.search(5).value).toEqual(5);
            tree.add(6);
            expect(tree.search(6).value).toEqual(6);
        });

        it('should return null when no element was found', function () {
            var tree = new BinaryTree<number>(function (a,b) {return a > b;});
            tree.add(5);
            expect(tree.search(23)).toBeNull();
            tree.add(6);
            expect(tree.search(16)).toBeNull();
        });
    });

    it('should be able to get max value', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
        expect(tree.min()).toBeNull();
        tree.add(1);
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.min().value).toEqual(1);
    });

    it('should be able to get min value', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
        expect(tree.max()).toBeNull();
        tree.add(1);
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.max().value).toEqual(5);
    });

    it('should be able to get node successor', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
        tree.add(1);
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.sucessor(2).value).toEqual(4);
    });

    it('should return null for node successor if tree is empty', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
        expect(tree.sucessor(2)).toBeNull();
    });

    it('should return null if there is no successor', function () {
        var tree = new BinaryTree<number>(function (a,b) {return a > b;});
        tree.add(1);
        expect(tree.sucessor(1)).toBeNull();
        tree.add(2);
        tree.add(4);
        tree.add(5);
        expect(tree.sucessor(5)).toBeNull();
        expect(tree.sucessor(4).value).toEqual(5);
    });

    describe('delete', function () {
        it(`should return false if node was not found`, function () {
            var tree = new BinaryTree<number>();
            expect(tree.delete(1)).toEqual(false);
        });

        it(`should remove node if it doesn't have children`, function () {
            var tree = new BinaryTree<number>();
            tree.add(1);
            expect(tree.search(1)).not.toBeNull();
            tree.delete(1);
            expect(tree.search(1)).toBeNull();
        });

        it(`should move the left child up if the node to remove has only left child and no right child`, function () {
            var tree = new BinaryTree<number>();
            tree.add(2);
            tree.add(1);
            expect(tree.search(2)).not.toBeNull();
            tree.delete(2);
            expect(tree.search(2)).toBeNull();
            expect(tree.root.value).toEqual(1);
        });

        it(`should move the right child up if the node to remove has only right child and no left child`, function () {
            var tree = new BinaryTree<number>();
            tree.add(1);
            tree.add(2);
            expect(tree.search(1)).not.toBeNull();
            tree.delete(1);
            expect(tree.search(1)).toBeNull();
            expect(tree.root.value).toEqual(2);
        });
    });
});