import {test, is} from "./libs/unit-test";

/**
 * 208. 实现前缀树 Trie
 * https://leetcode.cn/problems/implement-trie-prefix-tree/description
 *
 * @description
 * 输入 ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 *      [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出 [null, null, true, false, true, null, true]
 *
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 */

/**
 * 字典树
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(∣T∣* Σ) 其中 ∣T∣ 为所有插入字符串的长度之和 , Σ 为字符集的大小 Σ=26
 */
class TrieNode {
    children: {[key: string]: TrieNode};
    /**
     * 用于表示从根节点到该节点的路径是否构成一个完整的单词
     */
    isEnd: boolean;

    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}
class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;

        for (let char of word) {
            // 如果没有当前字符索引
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }

            // 下一个字符传递
            node = node.children[char];
        }

        node.isEnd = true;
    }

    search(word: string): boolean {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }

            node = node.children[char];
        }

        return node.isEnd;
    }

    startsWith(prefix: string): boolean {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }

            node = node.children[char];
        }

        return true;
    }
}
// var obj = new Trie();
// obj.insert(word);
// var param_2 = obj.search(word);
// var param_3 = obj.startsWith(prefix);
