import {BitArray} from "../BitArray";
import {IBitArray} from "../Interfaces/IBitArray";

export class DirectedAdjacencyMatrixGraph <T> {
    private hashFunction: (node: T) => string = (a: T) => a.toString();
    private vertices: {[name: string]: number} = {};
    private edgeToVertexMap: T[] = [];
    private edges: IBitArray[] = [];

    constructor (hashFunction?: (node: T) => string) {
        this.hashFunction = hashFunction || this.hashFunction;
    }

    public outdegree(vertex: T): T[] {
        const vertexIndex: number = this.vertices[this.hashFunction(vertex)];
        return this.edges[vertexIndex].getIndexes().map(vertexIndex => this.edgeToVertexMap[vertexIndex]);
    }

    public adjacent (vertex: T): T[] {
        return this.outdegree(vertex);
    }

    public addNode (node: T): DirectedAdjacencyMatrixGraph<T> {
        this.edgeToVertexMap.push(node);
        this.vertices[this.hashFunction(node)] = this.edges.length;
        this.edges.push(new BitArray(this.edges.length + 1));
        this.edges.forEach(row => row.resize(row.size() + 1));
        return this;
    }

    public addEdge (from: T, to: T): DirectedAdjacencyMatrixGraph<T> {
        const fromNodeIndex: number = this.vertices[this.hashFunction(from)];
        const toNodeIndex: number = this.vertices[this.hashFunction(to)];
        this.edges[fromNodeIndex].set(toNodeIndex, true);
        return this;
    }

    public indegree (vertex: T): T[] {
        const vertexIndex: number = this.vertices[this.hashFunction(vertex)];
        const output: T[] = [];
        this.edges.forEach((edge, edgeIndex) => {
            if (edge.get(vertexIndex)) {
                output.push(this.edgeToVertexMap[edgeIndex]);
            }
        });
        return output;
    }

    public nodes (): T[] {
        return this.edgeToVertexMap.slice(0);
    }

    public removeEdge (from: T, to: T): DirectedAdjacencyMatrixGraph<T> {
        const fromNodeIndex: number = this.vertices[this.hashFunction(from)];
        const toNodeIndex: number = this.vertices[this.hashFunction(to)];
        this.edges[fromNodeIndex].set(toNodeIndex, false);
        return this;
    }
}