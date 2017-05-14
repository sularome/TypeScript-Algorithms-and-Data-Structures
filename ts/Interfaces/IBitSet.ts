export interface IBitSet {
    count(): number;
    get(index: number): boolean;
    getIndexes(): number[];
    reset(): IBitSet;
    resize(newSize: number): IBitSet;
    size(): number;
    set(index: number, value: boolean): IBitSet;
}