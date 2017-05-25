export interface IBitMatrix {
    count(): number;
    get(rowIndex: number, colIndex: number): boolean;
    getIndexes(): number[][];
    getRowIndexes(row: number): number[];
    getColIndexes(column: number): number[];
    reset(): IBitMatrix;
    resize(newRowCount: number, newColCount: number): IBitMatrix;
    size(): number[];
    set(rowIndex: number, colIndex: number, value: boolean): IBitMatrix;
    spliceColumn(startIndex: number, deleteCount: number): IBitMatrix;
    spliceRow(startIndex: number, deleteCount: number): IBitMatrix;
}