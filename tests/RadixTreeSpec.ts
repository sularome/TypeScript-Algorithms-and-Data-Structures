import {RadixTree} from "../ts/RadixTree";

describe("Radix Tree", function () {
    it("should be able to add word that doesn't exist", function () {
        const tree: RadixTree<number> = new RadixTree<number>();
        tree.insert("test", 1);
        tree.insert("slow", 2);
        tree.insert("water", 3);
        expect(tree.contains("test")).toEqual(true);
        expect(tree.contains("slow")).toEqual(true);
        expect(tree.contains("water")).toEqual(true);
    });

    it("should be able to add word that extends existing word", function () {
        const tree: RadixTree<number> = new RadixTree<number>();
        tree.insert("test", 1);
        tree.insert("tester", 2);
        tree.insert("teste", 3);
        expect(tree.contains("test")).toEqual(true);
        expect(tree.contains("tester")).toEqual(true);
        expect(tree.contains("teste")).toEqual(true);
    });
});