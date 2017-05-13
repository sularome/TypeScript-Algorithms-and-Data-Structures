import {IKeyValuePair} from "../Interfaces/IKeyValuePair";
export class DirectedAdjecencyMatrixGraph <T> {
    private hashFunction: (node: T) => string = (a: T) => a.toString();
    private nodeMap: {[name: string]: IKeyValuePair<number, T>} = {};
    private matrix: boolean[][] = [];

    constructor (hashFunction?: (node: T) => string) {
        this.hashFunction = hashFunction || this.hashFunction;
    }

    public addNode (node: T): DirectedAdjecencyMatrixGraph<T> {
        this.nodeMap[this.hashFunction(node)] = {key: this.matrix.length, value: node};
        this.matrix.push([]);
        this.matrix.forEach(row => row.push(false));
        return this;
    }

    public addEdge (from: T, to: T): DirectedAdjecencyMatrixGraph<T> {
        const fromNodeIndex: number = this.nodeMap[this.hashFunction(from)].key;
        const toNodeIndex: number = this.nodeMap[this.hashFunction(to)].key;
        this.matrix[fromNodeIndex][toNodeIndex] = true;
        return this;
    }

    public nodes (): T[] {
        return Object.keys(this.nodeMap).map(hash => this.nodeMap[hash])
            .sort((a, b) => a.key - b.key)
            .map(item => item.value);
    }

    public removeEdge (from: T, to: T): DirectedAdjecencyMatrixGraph<T> {
        const fromNodeIndex: number = this.nodeMap[this.hashFunction(from)].key;
        const toNodeIndex: number = this.nodeMap[this.hashFunction(to)].key;
        this.matrix[fromNodeIndex][toNodeIndex] = false;
        return this;
    }
}