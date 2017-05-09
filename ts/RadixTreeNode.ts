export class RadixTreeNode<T> {
    public word: string;
    public value: T;
    public children: RadixTreeNode<T>[] = [];

    constructor (word: string, value: T) {
        this.word = word;
        this.value = value;
    }

    public addChild(child: RadixTreeNode<T>) {
        return this.children.push(child);
    }

    public isLeaf() {
        return this.value !== null;
    }

    public getNodeWithSharedPrefix(prefix: string): RadixTreeNode<T> {
        const partialMatch: RadixTreeNode<T>[] = this.children.filter(node => node.word[0] === prefix[0]);
        if (partialMatch.length === 0) {
            return null;
        }
        return partialMatch[0]
    }
    public getCommonPrefix(prefix: string): string {
        let i = 0;
        let commonPrefix = "";
        while (prefix[i] === this.word[i]) {
            commonPrefix += prefix[i];
            i++;
        }
        return commonPrefix;
    }

    public selectNextNodeFromPrefix(prefix: string): RadixTreeNode<T> {
        let candidates: RadixTreeNode<T>[] = this.children;
        let resultNode: RadixTreeNode<T> = null;
        let prefixSize: number = 0;
        const exactMatch: RadixTreeNode<T>[] = this.children.filter(node => node.word === prefix);
        if (exactMatch.length === 1) {
            return exactMatch[0];
        }
        const partialMatch: RadixTreeNode<T>[] = this.children.filter(node => node.word[0] === prefix[0]);
        if (partialMatch.length === 0) {
            return null;
        }
        const partialMatchWord: string = partialMatch[0].word;

        if (prefix.indexOf(partialMatchWord) === -1) {
            return null;
        }
        return partialMatch[0];
    }

    private getLongestCommonString(comparedWord: string): string {
        let commonString: string = "";
        let i: number = 0;
        let length: number = Math.min(this.word.length, comparedWord.length);
        while ( i < length && comparedWord[i] === this.word[i]) {
            i++;
        }
        return comparedWord.substr(0, i);
    }
}