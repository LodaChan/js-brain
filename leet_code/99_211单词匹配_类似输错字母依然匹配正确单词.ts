import {test, is} from "./libs/unit-test";

/**
 * 211. 添加与搜索单词 - 数据结构设计
 * https://leetcode.cn/problems/design-add-and-search-words-data-structure/description
 *
 * @description
 * 输入 ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 *      [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * 输出 [null,null,null,null,false,true,true,true]
 *
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // 返回 False
 * wordDictionary.search("bad"); // 返回 True
 * wordDictionary.search(".ad"); // 返回 True
 * wordDictionary.search("b.."); // 返回 True
 */

/**
 * 字典树 + 深度优先
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(∣T∣*∣Σ∣) 其中 ∣T∣ 是所有添加的单词的长度之和 , Σ 是字符集全部小写英语字母∣Σ∣=26
 */
class TrieNode {
    children: TrieNode[];
    /**
     * 用于表示从根节点到该节点的路径是否构成一个完整的单词
     */
    isEnd: boolean;

    constructor() {
        this.children = new Array(26);
        this.isEnd = false;
    }

    insert(word: string) {
        let node: TrieNode = this;
        for (let charIndex = 0; charIndex < word.length; charIndex++) {
            let charDistance = word.charCodeAt(charIndex) - "a".charCodeAt(0);

            if (!node.children[charDistance]) {
                node.children[charDistance] = new TrieNode();
            }

            node = node.children[charDistance];
        }

        node.isEnd = true;
    }

    getChildren(): TrieNode[] {
        return this.children;
    }

    getIsEnd(): boolean {
        return this.isEnd;
    }
}
class WordDictionary {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        this.root.insert(word);
    }

    search(word: string): boolean {
        return this.dfsSearch(word, 0, this.root);
    }

    private dfsSearch(word: string, index: number, node: TrieNode): boolean {
        if (index === word.length) {
            return node.getIsEnd();
        }

        let ch = word.charCodeAt(index);

        if (ch >= "a".charCodeAt(0) && ch <= "z".charCodeAt(0)) {
            let childIndex = ch - "a".charCodeAt(0);
            let child = node.getChildren()[childIndex];
            if (child && this.dfsSearch(word, index + 1, child) === true) {
                return true;
            }
        }
        // 通配符 "."
        else {
            for (let i = 0; i < 26; i++) {
                let child = node.getChildren()[i];
                if (child && this.dfsSearch(word, index + 1, child)) {
                    return true;
                }
            }
        }

        return false;
    }
}
// var obj = new WordDictionary();
// obj.addWord(word);
// var param_2 = obj.search(word);
