import {IBitMatrix} from "./Interfaces/IBitMatrix";
export class BitMatrix implements IBitMatrix {
    private rowCount: number = 0;
    private colCount: number = 0;
    private buffer: Uint32Array;

    constructor (rowSize: number, colSize: number) {
        this.rowCount = rowSize;
        this.colCount = colSize;
        this.buffer = new Uint32Array(this.calculateBufferSize(this.colCount * this.rowCount));
    }

    public count(): number {
        return this.buffer.reduce((total, chunk) => this.bitsCountInNumber(chunk) + total, 0);
    }

    public get(rowIndex: number, colIndex: number) {
        this.validateIndex(rowIndex, colIndex);
        const index: number = this.getBitPosition(rowIndex, colIndex);
        const chunkOffset = Math.floor(index / 32);
        const bitOffset = index - chunkOffset * 32;
        return !! (this.buffer[chunkOffset] & (1 << bitOffset));
    }

    public getColIndexes(column: number): number[] {
        const output: number[] = [];
        for (let i = 0; i < this.rowCount; i++) {
            if (this.get(i, column)) {
                output.push(i);
            }
        }

        return output;
    }

    public getRowIndexes(row: number): number[] {
        const output: number[] = [];
        for (let i = 0; i < this.colCount; i++) {
            if (this.get(row, i)) {
                output.push(i);
            }
        }

        return output;
    }

    public getIndexes(): number[][] {
        let result: number[][] = [];
        let rowIndex: number = 0;
        let bit: boolean = false;
        while (rowIndex < this.rowCount) {
            const rowIndexes: number[] = [];
            let colIndex: number = 0;
            while (colIndex < this.colCount) {
                bit = this.get(rowIndex, colIndex);
                if (bit) {
                    rowIndexes.push(colIndex);
                }
                colIndex++;
            }
            result.push(rowIndexes);
            rowIndex++;
        }
        return result;
    }

    public reset(): BitMatrix {
        this.buffer.fill(0);
        return this;
    }

    public resize(rowCount: number, colCount: number): BitMatrix {
        if (rowCount < 0 || colCount < 0) {
            throw new RangeError(`Invalid new BitMatrix size ${rowCount}x${colCount}`)
        }
        const setIndexes: number[][] = this.getIndexes();
        this.buffer = new Uint32Array(this.calculateBufferSize(rowCount * colCount));
        this.rowCount = rowCount;
        this.colCount = colCount;
        setIndexes.filter((setIndexes, row) => row < rowCount)
            .forEach((setIndexes, row) => {
                setIndexes.forEach(column => {
                    if (column < this.colCount) {
                        this.set(row, column, true);
                    }
                });
            });
        return this;
    }

    public size(): number[] {
        return [this.rowCount, this.colCount];
    }

    public spliceColumn(startIndex: number, deleteCount: number): IBitMatrix {
        if (isNaN(deleteCount) || deleteCount < 1) {
            return;
        }
        if (startIndex < 0) {
            startIndex = this.colCount + startIndex;
            if (startIndex < 0) {
                throw new RangeError(`${startIndex} is less than 0`)
            }
        } else if (startIndex >= this.colCount) {
            throw new RangeError(`${startIndex} exceeds the matrix size ${this.colCount}`)
        }

        const tempBuffer: number[][] = this.getIndexes();
        this.reset();
        this.resize(this.rowCount, this.colCount - deleteCount);
        tempBuffer.forEach((indexes, row) => {
            indexes.forEach(id => {
                if (id < startIndex || id >= startIndex + deleteCount) {
                    let normalizedId = id >= startIndex + deleteCount ? id - deleteCount : id;
                    this.set(row, normalizedId, true);
                }
            });
        });
    }

    public spliceRow(startIndex: number, deleteCount: number): IBitMatrix {
        if (isNaN(deleteCount) || deleteCount < 1) {
            return;
        }
        if (startIndex < 0) {
            startIndex = this.colCount + startIndex;
            if (startIndex < 0) {
                throw new RangeError(`${startIndex} is less than 0`)
            }
        } else if (startIndex >= this.colCount) {
            throw new RangeError(`${startIndex} exceeds the matrix size ${this.colCount}`)
        }

        const tempBuffer: number[][] = this.getIndexes().filter((setIds, row) => row < startIndex || row >= startIndex + deleteCount);
        this.reset();
        this.resize(this.rowCount - deleteCount, this.colCount);
        tempBuffer.forEach((indexes, row) => {
            indexes.forEach(id => {
                this.set(row, id, true);
            });
        });
    }

    public set(rowIndex: number, colIndex: number, value: boolean) {
        this.validateIndex(rowIndex, colIndex);
        const index: number = this.getBitPosition(rowIndex, colIndex);
        const chunkOffset = Math.floor(index / 32);
        const offset = index - chunkOffset * 32;
        if (value) {
            this.buffer[chunkOffset] |= (1 << offset);
        } else {
            this.buffer[chunkOffset] &= ~(1 << offset);
        }
        return this;
    }

    private calculateBufferSize(bitsCount: number): number {
        return Math.ceil(bitsCount / 32) * 4;
    }

    private getBitPosition (rowIndex: number, colIndex: number): number {
        return this.colCount * rowIndex + colIndex;
    }

    private bitsCountInNumber (value: number) {
        value -= ((value >>> 1) & 0x55555555);
        value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
        return (((value + (value >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24);
    }

    private validateIndex(rowIndex: number, colIndex: number) {
        if (rowIndex > this.rowCount - 1 || rowIndex < 0) {
            throw new RangeError("Row index is incorrect.");
        }
        if (colIndex > this.colCount - 1 || colIndex < 0) {
            throw new RangeError("Column index is incorrect.");
        }
    }
}