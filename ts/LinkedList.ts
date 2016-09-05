import {ILinkedListItem} from "./Interfaces/ILinkedListItem";
class LinkedList<T> {
    public head:ILinkedListItem<T> = LinkedList.emptyListItem();
    public length:number = 0;
    public tail:ILinkedListItem<T> = LinkedList.emptyListItem();

    public static emptyListItem<T> () {
        return { prev:null, value:null, next:null };
    }

    public static newItem<T> (prev:ILinkedListItem<T>, next:ILinkedListItem<T>, value: T) {
        return { prev: prev, next: next, value: value };
    }

    constructor () {
        this.tail.prev = this.head;
        this.head.next = this.tail;
    }

    public push(value:T){
        var newItem = LinkedList.newItem(this.tail.prev, this.tail, value);
        this.tail.prev.next = newItem;
        this.tail.prev = newItem;
        this.length++;
    }

    public pop(){
        var currentItem = this.tail.prev;
        if(this.isEmpty()) {
            throw new Error(`The linked list is empty.`);
        }
        currentItem.prev.next = currentItem.next;
        currentItem.next.prev = currentItem.prev;
        this.length--;

        return currentItem.value;
    }

    public isEmpty() {
        return this.head.next === this.tail;
    }

    public remove(value:T){
        var currentItem = this.search(value);
        if (currentItem) {
            currentItem.prev.next = currentItem.next;
            currentItem.next.prev = currentItem.prev;
            this.length--;
        } else {
            throw new Error(`Cannot remove the value ${value}, it's not present in the linked list.`);
        }
    }

    private search(value:T){
        var currentItem = this.head;
        while(currentItem.next !== this.tail) {
            if (value === currentItem.value) {
                return currentItem;
            }
        }
        return null;
    }
}