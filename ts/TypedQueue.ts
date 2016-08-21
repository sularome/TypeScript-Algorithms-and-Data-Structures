import {ITypedArray} from "./ITypedArray";
class TypedQueue {
    protected queue: ITypedArray;
    protected head:number = 0;
    protected tail:number = 0;
    protected length:number = 0;
    protected  MAX_CLEAR_QUEUE_SIZE = 1000;

    constructor (queue:ITypedArray) {
        this.queue = queue;
        this.length = queue.length;
    }

    public enqueue (element:number) {
        if (this.size() === this.length) {
            throw new RangeError('The queue is full');
        }
        this.queue[this.tail] = element;
        this.tail++;
        if (this.tail === this.length) {
            this.tail = 0;
        }
    }

    public dequeue ():number {
        if (this.isEmpty()) {
            throw new Error('The queue is empty');
        }
        var  element = this.queue[this.head];
        this.head++;
        if (this.head === this.length) {
            this.head = 0;
        }
        return element;
    }

    public isEmpty () {
        return this.tail === this.head;
    }

    public size () {
        console.log((this.tail < this.head) ? this.tail + this.length - this.head : this.tail - this.head);
        return (this.tail < this.head) ? this.tail + this.length - this.head : this.tail - this.head;
    }
}