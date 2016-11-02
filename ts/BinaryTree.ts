export class BinaryTree<T>{
    public comparator:(a:T, b:T) => boolean;
    public root:BinaryTreeNode<T> = null;

    constructor(comparator:(a:T, b:T) => boolean = (a,b) => a > b) {
        this.comparator = comparator;
    }

    public add(value:T) {
        var currentNode:BinaryTreeNode<T> = this.root;
        var futureParent:BinaryTreeNode<T> = null;
        var newNode:BinaryTreeNode<T> = new BinaryTreeNode(value, null);
        while (currentNode !== null) {
            futureParent = currentNode;
            if (futureParent !== null) {
                if (this.comparator(futureParent.value, value)) {
                    currentNode = futureParent.left;
                } else {
                    currentNode = futureParent.right;
                }
            }
        }

        newNode.parent = futureParent;
        if (futureParent === null) {
            this.root = newNode;
        } else if (this.comparator(futureParent.value, value)) {
            futureParent.left = newNode;
        } else {
            futureParent.right = newNode;
        }
    }

    public isEmpty() {
        return this.root === null;
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

    public delete(value:T) {
        var node:BinaryTreeNode<T> = this.search(value);
        if (node === null) {
            return false;
        }
        
        if (!node.hasLeftChild()) {
            this.transplant(node, node.right);
        } else if (!node.hasRightChild()) {
            this.transplant(node, node.left);
        } else {
            let successor = node.right.min();
            if (successor !== node.right) {
                this.transplant(successor, successor.right);
                successor.right = node.right;
                successor.right.parent = successor;
            }
            this.transplant(node, successor);
        }
    }

    public max():BinaryTreeNode<T> {
        var currentNode:BinaryTreeNode<T> = this.root;
        if(this.isEmpty()) {
            return null;
        }
        return currentNode.max();
    }

    public min():BinaryTreeNode<T> {
        var currentNode:BinaryTreeNode<T> = this.root;
        if(this.isEmpty()) {
            return null;
        }
        return currentNode.min();
    }

    public reverseTreeWalk(callback: (pv:any, cv:T) => any, initialValue:any){
        return this.reverseNodeWalk(this.root, callback, initialValue);
    }

    public inorderTreeWalk(callback: (pv:any, cv:T) => any, initialValue:any){
        return this.inorderNodeWalk(this.root, callback, initialValue);
    }

    public sucessor (value:T) {
        var node = this.search(value);
        var ancestor:BinaryTreeNode<T> = null;
        if(node === null || value === null) {
            return null;
        }
        if(node.right !== null) {
            return node.right.min();
        }
        ancestor = node.parent;
        while(ancestor !== null && ancestor.right === node) {
            node = ancestor;
            ancestor = node.parent;
        }
        return ancestor;
    }

    private inorderNodeWalk(node:BinaryTreeNode<T>, callback: (pv:any, cv:T) => any, previousValue:any){
        if(node !== null) {
            previousValue = this.inorderNodeWalk(node.left, callback, previousValue);
            previousValue = callback(previousValue, node.value);
            previousValue = this.inorderNodeWalk(node.right, callback, previousValue);
            return previousValue;
        } else {
            return previousValue;
        }
    }

    private reverseNodeWalk(node:BinaryTreeNode<T>, callback: (pv:any, cv:T) => any, previousValue:any){
        if(node !== null) {
            previousValue = this.reverseNodeWalk(node.right, callback, previousValue);
            previousValue = callback(previousValue, node.value);
            previousValue = this.reverseNodeWalk(node.left, callback, previousValue);
            return previousValue;
        } else {
            return previousValue;
        }
    }

    private transplant(node: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>) {
        if(node.isRoot()) {
            this.root = newNode;
        } else if (node.isLeftChild()) {
            node.parent.left = newNode;
        } else {
            node.parent.right = newNode;
        }
        if (newNode !== null) {
            newNode.parent === node.parent;
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

    public hasLeftChild ():boolean {
        return this.left !== null;
    }

    public hasRightChild ():boolean {
        return this.right !== null;
    }

    public isLeftChild ():boolean {
        return this.parent && this.parent.left === this;
    }

    public isRightChild ():boolean {
        return this.parent && this.parent.right === this;
    }

    public isRoot ():boolean {
        return this.parent === null;
    }

    public min ():BinaryTreeNode<T> {
        if (this.left !== null) {
            return this.left.min();
        }
        return this;
    }

    public max ():BinaryTreeNode<T> {
        if (this.right !== null) {
            return this.right.max();
        }
        return this;
    }
}