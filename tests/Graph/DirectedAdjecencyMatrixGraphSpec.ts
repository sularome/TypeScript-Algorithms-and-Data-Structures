import {DirectedAdjecencyMatrixGraph} from "../../ts/Graph/DirectedAdjecencyMatrixGraph";

describe("DirectedAdjecencyMatrixGraph", function () {
    it("should be able to add nodes", function () {
        const graph = new DirectedAdjecencyMatrixGraph();
        graph.addNode("test");
        graph.addNode("test 2");
        graph.addNode("test 3");
        expect(graph.nodes()).toEqual(["test", "test 2", "test 3"])
    });
});