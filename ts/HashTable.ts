import {IHashTable} from "./Interfaces/IHashTable";
import {IKeyValuePair} from "./Interfaces/IKeyValuePair";
export class HashTable<K, V> implements IHashTable<K, V> {
    private capacity: number = 0;
    private buckets: IKeyValuePair<K, V>[][] = [];
    private hash: (value: K) => number;
    private equalKey: (value1: K, value2: K) => boolean = (value1: K, value2: K) => value1 === value2;
    private equalValue: (value1: V, value2: V) => boolean = (value1: V, value2: V) => value1 === value2;

    constructor(capacity: number, hash: (value: K) => number) {
        this.capacity = capacity;
        this.hash = hash;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]);
        }
    }

    public clear(): void {
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]);
        }
    }

    public contains(value: V): boolean {
        return this.buckets.some(bucket => bucket.some(entry => this.equalValue(entry.value, value)));
    }

    public containsKey(key: K): boolean {
        const index: number = this.getIndex(key);
        if (this.buckets[index].length === 0) {
            return false;
        }
        return this.buckets[index].some(entry => this.equalKey(entry.key, key));
    }

    public containsValue(value: V): boolean {
        return this.buckets.some(bucket => bucket.some(entry => this.equalValue(entry.value, value)));
    }

    public get(key: K): V {
        const index: number = this.getIndex(key);
        let value: V = null;
        this.buckets[index].some(entry => {
            if (this.equalKey(entry.key, key)) {
                value = entry.value;
                return true;
            }
            return false;
        });
        return value;
    }

    public put(key: K, value: V) {
        const index: number = this.getIndex(key);
        this.buckets[index].push({key: key, value: value});
    }

    private getIndex(key: K): number {
        let index = this.hash(key);
        if (index < 0) {
            index = Math.abs(index);
        }
        return index < this.buckets.length ? index : index % this.buckets.length;
    }
}

export  default HashTable;