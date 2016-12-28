interface IBinaryTree<T, U> {
    add: (value:T) => void;
    delete: (value:T) => boolean;
    reverseTreeWalk: (callback: (pv:any, cv:T) => any, initialValue:any) => any;
    inorderTreeWalk: (callback: (pv:any, cv:T) => any, initialValue:any) => any;
    isEmpty: () => boolean;
    max: () => U;
    min: () => U;
    search: (value:T) => U;
    successor: (value:T) => U;
}

export default IBinaryTree;