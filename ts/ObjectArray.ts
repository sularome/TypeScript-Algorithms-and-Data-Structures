import {IObjectArrayProperty} from "./Interfaces/IObjectArrayProperty";
import {ITypedArray} from "./ITypedArray";
import {Utils} from "./Utils";
export class ObjectArray {
    private columns:ITypedArray[] = [];
    private nameToColumn:{[key: string]: number} = {};
    private freePointer:number = 0;
    private nextList:Float64Array;

    constructor (size:number, properties: IObjectArrayProperty[]) {
        this.columns = properties.map(property => new property.type(size));
        properties.forEach((property, i) => this.nameToColumn[property.name] = i);
        this.nextList = new Float64Array(Utils.range(1, size));
        this.nextList[size - 1] = -1;
    }

    public push(obj:number[]) {
        var index:number = this.freePointer;
        this.freePointer = this.nextList[this.freePointer];
        obj.forEach((value, columnIndex) => this.columns[columnIndex][index] = value);
    }

    public get(index:number) {
        return this.columns.map(column => column[index]);
    }
}