import {test, is} from "./libs/unit-test";

/**
 * 127. 单词接龙_类似求最少基因突变次数
 * https://leetcode.cn/problems/word-ladder/description
 *
 * @description
 * 输入 beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * 输出 5
 * "hit" -> "hot" -> "dot" -> "dog" -> "cog"  返回它的长度 5
 */

let ladderLength: (beginWord: string, endWord: string, wordList: string[]) => number;

/**
 * 广度优先 + 优化建图
 *
 * @description
 * 时间复杂度 O(N * C^2) 其中 N 为 wordList 的长度 , C 为列表中单词的长度
 * 空间复杂度 O(N * C^2) 其中 N 为 wordList 的长度 , C 为列表中单词的长度
 */
ladderLength = (beginWord: string, endWord: string, wordList: string[]): number => {
    let output = 0;

    let wordHashMap: Map<string, number> = new Map<string, number>();
    let edge: number[][] = [];
    let nodeNum = 0;

    const _addWordFunc = (word: string) => {
        if (wordHashMap.has(word) === false) {
            wordHashMap.set(word, nodeNum);
            edge.push([]);
            nodeNum++;
        }
    };

    const _addEdgeFunc = (word: string) => {
        _addWordFunc(word);

        let id1 = wordHashMap.get(word)!;
        let array = word.split("");

        for (let charIndex = 0; charIndex < array.length; charIndex++) {
            let tmp = array[charIndex];
            array[charIndex] = "*";

            let newWord: string = array.join("");
            _addWordFunc(newWord);

            let id2 = wordHashMap.get(newWord)!;
            edge[id1].push(id2);
            edge[id2].push(id1);
            array[charIndex] = tmp;
        }
    };

    for (let wordItem of wordList) {
        _addEdgeFunc(wordItem);
    }
    _addEdgeFunc(beginWord);

    if (wordHashMap.has(endWord) === false) {
        return (output = 0);
    }

    let dis = new Array(nodeNum).fill(Number.MAX_SAFE_INTEGER);

    let beginWordId = wordHashMap.get(beginWord)!;
    let endWordId = wordHashMap.get(endWord)!;
    dis[beginWordId] = 0;

    let queue = [];
    queue.push(beginWordId);

    while (queue.length > 0) {
        let curWordId = queue.shift()!;

        if (curWordId === endWordId) {
            return (output = Math.floor(dis[endWordId] / 2) + 1);
        }

        for (let otherWordId of edge[curWordId]) {
            if (dis[otherWordId] === Number.MAX_SAFE_INTEGER) {
                dis[otherWordId] = dis[curWordId] + 1;
                queue.push(otherWordId);
            }
        }
    }

    return (output = 0);
};

/**
 * 双向广度优先
 *
 * @description
 * 时间复杂度 O(N * C^2) 其中 N 为 wordList 的长度 , C 为列表中单词的长度
 * 空间复杂度 O(N * C^2) 其中 N 为 wordList 的长度 , C 为列表中单词的长度
 */
ladderLength = (beginWord: string, endWord: string, wordList: string[]): number => {
    let output = 0;

    let wordHashMap: Map<string, number> = new Map<string, number>();
    let edge: number[][] = [];
    let nodeNum = 0;

    const _addEdgeFunc = (word: string) => {
        _addWordFunc(word);

        let id1 = wordHashMap.get(word)!;
        let array = word.split("");
        let length = array.length;
        for (let i = 0; i < length; i++) {
            let tmp: string = array[i];
            array[i] = "*";

            let newWord: string = array.join("");
            _addWordFunc(newWord);

            let id2 = wordHashMap.get(newWord)!;
            edge[id1].push(id2);
            edge[id2].push(id1);
            array[i] = tmp;
        }
    };

    const _addWordFunc = (word: string) => {
        if (wordHashMap.has(word) === false) {
            wordHashMap.set(word, nodeNum);
            edge.push([]);
            nodeNum++;
        }
    };

    // 为 wordList 中的单词添加边
    for (let word of wordList) {
        _addEdgeFunc(word);
    }
    _addEdgeFunc(beginWord);

    if (wordHashMap.has(endWord) === false) {
        return (output = 0);
    }

    let disBegin: number[] = new Array(nodeNum).fill(Number.MAX_SAFE_INTEGER);
    let beginId = wordHashMap.get(beginWord)!;
    disBegin[beginId] = 0;
    let queueFromBegin = [];
    queueFromBegin.push(beginId);

    let disEnd = new Array(nodeNum).fill(Number.MAX_SAFE_INTEGER);
    let endId = wordHashMap.get(endWord)!;
    disEnd[endId] = 0;
    let queueFromEnd = [];
    queueFromEnd.push(endId);

    while (queueFromBegin.length > 0 && queueFromEnd.length > 0) {
        let queBeginSize = queueFromBegin.length;

        for (let i = 0; i < queBeginSize; i++) {
            let nodeBegin = queueFromBegin.shift()!;

            if (disEnd[nodeBegin] !== Number.MAX_SAFE_INTEGER) {
                return (output = (disBegin[nodeBegin] + disEnd[nodeBegin]) / 2 + 1);
            }

            for (let it of edge[nodeBegin]) {
                if (disBegin[it] === Number.MAX_SAFE_INTEGER) {
                    disBegin[it] = disBegin[nodeBegin] + 1;
                    queueFromBegin.push(it);
                }
            }
        }

        let queEndSize = queueFromEnd.length;

        for (let i = 0; i < queEndSize; i++) {
            let nodeEnd = queueFromEnd.shift()!;

            if (disBegin[nodeEnd] !== Number.MAX_SAFE_INTEGER) {
                return (output = (disBegin[nodeEnd] + disEnd[nodeEnd]) / 2 + 1);
            }

            for (let it of edge[nodeEnd]) {
                if (disEnd[it] === Number.MAX_SAFE_INTEGER) {
                    disEnd[it] = disEnd[nodeEnd] + 1;
                    queueFromEnd.push(it);
                }
            }
        }
    }

    return (output = 0);
};
