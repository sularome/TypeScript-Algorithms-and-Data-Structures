export interface IHashTable<K, V> {
    clear(): void;
    contains(value: V): boolean;
    containsKey(value: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): V;
    put(key: K, value: V): void;
}