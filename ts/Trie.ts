export class Trie<T> {
    public static KEY: string = "id";
    public root: any = {};
    public addWord(word: string, value: T): void {
        const wordwSize = word.length;
        let i: number = 0;
        let level = this.root;
        while (i < wordwSize) {
            if (!level[word[i]]) {
                level[word[i]] = {};
            }
            level = level[word[i]];
            i++;
            if (i === wordwSize) {
                level[Trie.KEY] =  value;
            }
        }
    }

    public getValue = function(word: string) {
        const wordwSize = word.length;
        let i: number = 0;
        let level = this.root;
        while (i < wordwSize) {
            if (!level[word[i]]) {
                return void 0;
            }
            level = level[word[i]];
            i++;
            if (i === wordwSize && level.hasOwnProperty(Trie.KEY)) {
                return level[Trie.KEY];
            }
        }
        return void 0;
    }
}


