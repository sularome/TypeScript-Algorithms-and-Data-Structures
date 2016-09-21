export class BitSet {
    private length:number = 0;
    private buffer:Uint32Array;

    constructor (size:number) {
        this.length = size;
        this.buffer = new Uint32Array(Math.ceil(this.length / 32) * 4);
    }

    public count() {
        return this.buffer.reduce((total, chunk) => this.bitsCountInNumber(chunk) + total, 0);
    }

    public get(index:number) {
        this.validateIndex(index);
        const chunkOffset = Math.floor(index / 32);
        const bitOffset = index - chunkOffset * 32;
        return !! (this.buffer[chunkOffset] & (1 << bitOffset));
    }

    public getIndexes() {
        let result:number[] = [];
        let bitIndex:number = 0;
        let bit:boolean = false;
        while (bitIndex < this.length) {
            bit = this.get(bitIndex);
            if (bit) {
                result.push(bitIndex);
            }
            bitIndex++;
        }
        return result;
    }

    public size() {
        return this.length;
    }

    public set(index:number, value: boolean) {
        this.validateIndex(index);
        const chunkOffset = Math.floor(index / 32);
        const offset = index - chunkOffset * 32;
        if (value) {
            this.buffer[chunkOffset] |= (1 << offset);
        } else {
            this.buffer[chunkOffset] &= ~(1 << offset);
        }
        return this;
    }

    private validateIndex(index:number) {
        if (index > this.length - 1) {
            throw new RangeError('Index is too large.');
        }
    }

    private bitsCountInNumber (value:number) {
        value -= ((value >>> 1) & 0x55555555);
        value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
        return (((value + (value >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24);
    }
}