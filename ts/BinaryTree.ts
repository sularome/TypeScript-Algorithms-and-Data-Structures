export class BinaryTree<T>{
    public comparator:(a:T, b:T) => boolean;
    public root:BinaryTreeNode<T> = new BinaryTreeNode<T>(null, null);

    constructor(comparator:(a:T, b:T) => boolean) {
        this.comparator = comparator;
    }

    public add(value:T) {
        if(this.root.value === null) {
            this.root.value = value;
        } else {
            let parent: BinaryTreeNode<T> = this.root;
            let childNode: BinaryTreeNode<T> = this.getNextChild(parent, value);

            while (childNode) {
                parent = childNode;
                childNode = this.getNextChild(parent, value);
            }

            if (this.comparator(parent.value, value)) {
                parent.left = new BinaryTreeNode<T>(value, parent);
            } else {
                parent.right = new BinaryTreeNode<T>(value, parent);
            }
        }
    }

    public search(value:T) {
        var currentNode:BinaryTreeNode<T> = this.root;
        while(currentNode && currentNode.value !== value) {
            if (this.comparator(currentNode.value, value)) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return currentNode;
    }

    public max():BinaryTreeNode<T> {
        var currentNode:BinaryTreeNode<T> = this.root;
        while(currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode;
    }

    public min():BinaryTreeNode<T> {
        var currentNode:BinaryTreeNode<T> = this.root;
        while(currentNode.left) {
            currentNode = currentNode.left;
        }
        return currentNode;
    }

    private getNextChild(node:BinaryTreeNode<T>, value:T):BinaryTreeNode<T> {
        return this.comparator(node.value, value) ? node.left : node.right;
    }

    public reverseTreeWalk(callback: (pv:any, cv:T) => any, initialValue:any){
        return this.reverseNodeWalk(this.root, callback, initialValue);
    }

    public inorderTreeWalk(callback: (pv:any, cv:T) => any, initialValue:any){
        return this.inorderNodeWalk(this.root, callback, initialValue);
    }

    private inorderNodeWalk(node:BinaryTreeNode<T>, callback: (pv:any, cv:T) => any, previousValue:any){
        if(node) {
            this.inorderNodeWalk(node.left, callback, previousValue);
            previousValue = callback(previousValue, node.value);
            this.inorderNodeWalk(node.right, callback, previousValue);
            return previousValue;
        }
    }

    private reverseNodeWalk(node:BinaryTreeNode<T>, callback: (pv:any, cv:T) => any, previousValue:any){
        if(node) {
            this.reverseNodeWalk(node.right, callback, previousValue);
            previousValue = callback(previousValue, node.value);
            this.reverseNodeWalk(node.left, callback, previousValue);
            return previousValue;
        }
    }
}

export class BinaryTreeNode<T>{
    public left:BinaryTreeNode<T> = null;
    public right:BinaryTreeNode<T> = null;
    public value:T;
    public parent:BinaryTreeNode<T> = null;

    constructor(value:T, parent: BinaryTreeNode<T>) {
        this.value = value;
        this.parent = parent;
    }
}