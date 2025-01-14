import {test, is} from "./libs/unit-test";

/**
 * 212. 单词搜索 II
 * https://leetcode.cn/problems/word-ladder/description
 *
 * @description
 * 输入 board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * 输出 ["eat","oath"]
 *
 * 输入 board = [["a","b"],["c","d"]], words = ["abcb"]
 * 输出 []
 */

let findWords: (board: string[][], words: string[]) => string[];

const dirs: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];
class TrieNode {
    word: string;
    children: Map<string, TrieNode>;
    isWord: boolean;

    constructor() {
        this.word = "";
        this.children = new Map<string, TrieNode>();
        this.isWord = false;
    }

    insert(word: string): void {
        let cur: TrieNode = this;
        for (let i = 0; i < word.length; i++) {
            const c: string = word.charAt(i);
            if (!cur.children.has(c)) {
                cur.children.set(c, new TrieNode());
            }
            cur = cur.children.get(c)!;
        }

        cur.word = word;
        cur.isWord = true;
    }
}

/**
 * 字典树 + 递归 + 回溯
 *
 * @description
 * 时间复杂度 O(m * n * 3^(L−1)) m 是二维网格的高度 , n 是二维网格的宽度 , L 是最长单词的长度
 * 空间复杂度 O(k * L) k 是 words 的长度 , L 是最长单词的长度
 */
findWords = (board: string[][], words: string[]): string[] => {
    const _DFSFunc = (board: string[][], curNode: TrieNode, yIndex: number, xIndex: number, refAns: Set<string>) => {
        if (!curNode.children.has(board[yIndex][xIndex])) {
            return;
        }

        const ch = board[yIndex][xIndex];
        curNode = curNode.children.get(ch)!;

        if (curNode.word !== "") {
            refAns.add(curNode.word);
        }

        // 标记 避免重复访问
        board[yIndex][xIndex] = "#";

        for (const dir of dirs) {
            const newYIndex = yIndex + dir[0];
            const newXIndex = xIndex + dir[1];

            if (newYIndex >= 0 && newYIndex < board.length && newXIndex >= 0 && newXIndex < board[0].length) {
                _DFSFunc(board, curNode, newYIndex, newXIndex, refAns);
            }
        }

        // 回溯
        board[yIndex][xIndex] = ch;
    };

    const root = new TrieNode();
    for (const word of words) {
        root.insert(word);
    }

    const ans: Set<string> = new Set<string>();

    for (let yIndex = 0; yIndex < board.length; yIndex++) {
        for (let xIndex = 0; xIndex < board[0].length; xIndex++) {
            _DFSFunc(board, root, yIndex, xIndex, ans);
        }
    }

    return Array.from(ans);
};

/**
 * 字典树 + 递归 + 删除被匹配的单词
 *
 * @description
 * 时间复杂度 O(m * n * 3^(L−1)) m 是二维网格的高度 , n 是二维网格的宽度 , L 是最长单词的长度
 * 空间复杂度 O(k * L) k 是 words 的长度 , L 是最长单词的长度
 */
findWords = (board: string[][], words: string[]): string[] => {
    const _DFSFunc = (board: string[][], curNode: TrieNode, yIndex: number, xIndex: number, refAns: Set<string>) => {
        const ch = board[yIndex][xIndex];
        if (!curNode.children.has(ch)) {
            return;
        }

        let next: TrieNode = curNode.children.get(ch)!;
        if (next.word !== "") {
            refAns.add(next.word);
            next.word = "";
        }

        if (next.children.size > 0) {
            board[yIndex][xIndex] = "#";

            for (const dir of dirs) {
                const nextYIndex: number = yIndex + dir[0];
                const nextXIndex: number = xIndex + dir[1];

                if (nextYIndex >= 0 && nextYIndex < board.length && nextXIndex >= 0 && nextXIndex < board[0].length) {
                    _DFSFunc(board, next, nextYIndex, nextXIndex, refAns);
                }
            }
            board[yIndex][xIndex] = ch;
        }

        // 没有子节点，将其从父节点的子节点中删除，以优化 Trie树 结构
        if (next.children.size === 0) {
            curNode.children.delete(ch);
        }
    };

    const root = new TrieNode();
    for (const word of words) {
        root.insert(word);
    }

    const ans: Set<string> = new Set<string>();

    for (let yIndex = 0; yIndex < board.length; yIndex++) {
        for (let xIndex = 0; xIndex < board[0].length; xIndex++) {
            _DFSFunc(board, root, yIndex, xIndex, ans);
        }
    }

    return Array.from(ans);
};
