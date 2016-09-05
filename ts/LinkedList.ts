import {ILinkedListItem} from "./Interfaces/ILinkedListItem";
export class LinkedList<T> {
    public head:ILinkedListItem<T> = {
        prev:null,
        value:null,
        next:null
    };

    public add(value:T){
        var lastItem = this.head;
        while(lastItem.next !== null) {
            lastItem = lastItem.next;
        }

        lastItem.next = {
            next:null,
            prev:lastItem,
            value:value
        }
    }
}