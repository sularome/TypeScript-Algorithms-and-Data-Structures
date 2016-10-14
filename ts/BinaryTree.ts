export class BinaryTree<T>{
    public comparator:(a:T, b:T) => boolean;
    public root:BinaryTreeNode<T> = new BinaryTreeNode<T>(null);

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
                parent.left = new BinaryTreeNode<T>(value);
            } else {
                parent.right = new BinaryTreeNode<T>(value);
            }
        }
    }

    private getNextChild(node:BinaryTreeNode<T>, value:T):BinaryTreeNode<T> {
        return this.comparator(node.value, value) ? node.left : node.right;
    }

    public inorderTreeWalk(){
        return this.inorderNodeWalk(this.root);
    }

    public inorderNodeWalk(node:BinaryTreeNode<T>){
        if(node) {
            this.inorderNodeWalk(node.left);
            console.log(node.value);
            this.inorderNodeWalk(node.right);
        }
    }
}

export class BinaryTreeNode<T>{
    public left:BinaryTreeNode<T> = null;
    public right:BinaryTreeNode<T> = null;
    public value:T;

    constructor(value:T) {
        this.value = value;
    }
}