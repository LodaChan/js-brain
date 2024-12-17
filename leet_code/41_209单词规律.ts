import {test, is} from "./libs/unit-test";

/**
 * 209. 单词规律
 * https://leetcode.cn/problems/word-pattern/description
 *
 * @description
 * 输入 pattern = "abba", s = "dog cat cat dog"
 * 输出 true
 */
let wordPattern: (str1: string, str2: string) => boolean;

/**
 * 索引 + 哈希表
 *
 * @description
 * 时间复杂度 O(n + m)
 * 空间复杂度 O(n + m)
 */
wordPattern = (str1: string, str2: string): boolean => {
    let output = false;

    const str2Arr = str2.split(" ");
    /**
     * 以字符为 key , 出现的索引列表为 value
     */
    const skeleton1: Map<string, number[]> = new Map();
    const skeleton2: Map<string, number[]> = new Map();

    for (let wordIndex = 0; wordIndex < Math.max(str1.length, str2Arr.length); wordIndex++) {
        if (wordIndex >= str1.length) {
            return (output = false);
        } else if (wordIndex >= str2Arr.length) {
            return (output = false);
        }

        // 处理 str1
        const char1 = str1[wordIndex];

        if (skeleton1.has(char1) === true) {
            skeleton1.set(char1, [...skeleton1.get(char1), wordIndex]);
        } else {
            skeleton1.set(char1, [wordIndex]);
        }

        // 处理 str2
        const word2 = str2Arr[wordIndex];
        if (skeleton2.has(word2) === true) {
            skeleton2.set(word2, [...skeleton2.get(word2), wordIndex]);
        } else {
            skeleton2.set(word2, [wordIndex]);
        }

        // 不是同构的判断
        // 1 哈希表的长度
        // 2 当前字符对应出现的索引集合
        if (skeleton1.size !== skeleton2.size || JSON.stringify(skeleton1.get(char1)) !== JSON.stringify(skeleton2.get(word2))) {
            return (output = false);
        }
    }

    return (output = true);
};

test(`官方例子`, () => {
    return is(
        wordPattern("abba", "dog cat cat dog"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        wordPattern("abba", "dog cat cat fish"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        wordPattern("aaa", "aa aa aa aa"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        wordPattern("he", "unit"),
        //
        false,
    );
});
