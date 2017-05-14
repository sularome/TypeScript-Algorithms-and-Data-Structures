import {IKeyValuePair} from "../Interfaces/IKeyValuePair";
import {BitSet} from "../BitSet";
import {IBitSet} from "../Interfaces/IBitSet";

export class DirectedAdjecencyMatrixGraph <T> {
    private hashFunction: (node: T) => string = (a: T) => a.toString();
    private nodeMap: {[name: string]: IKeyValuePair<number, T>} = {};
    private matrix: IBitSet[] = [];

    constructor (hashFunction?: (node: T) => string) {
        this.hashFunction = hashFunction || this.hashFunction;
    }

    public addNode (node: T): DirectedAdjecencyMatrixGraph<T> {
        this.nodeMap[this.hashFunction(node)] = {key: this.matrix.length, value: node};
        this.matrix.push(new BitSet(this.matrix.length + 1));
        this.matrix.forEach(row => row.resize(row.size() + 1));
        return this;
    }

    public addEdge (from: T, to: T): DirectedAdjecencyMatrixGraph<T> {
        const fromNodeIndex: number = this.nodeMap[this.hashFunction(from)].key;
        const toNodeIndex: number = this.nodeMap[this.hashFunction(to)].key;
        this.matrix[fromNodeIndex].set(toNodeIndex, true);
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
        this.matrix[fromNodeIndex].set(toNodeIndex, false);
        return this;
    }
}