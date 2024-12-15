import {test, is} from "./libs/unit-test";

/**
 * 30. 串联所有单词的子串
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description
 *
 * @description
 * 输入 s = "barfoothefoobarman", words = ["foo","bar"]
 * 输出 [0,9]
 */
let findSubstring: (mainStr: string, words: string[]) => number[];

/**
 * 模拟 + 排列 + 哈希表 + 贪心
 *
 * @description
 * 时间复杂度 O(mainStr.length * words[0].length)
 * 空间复杂度 O(words.length * words[0].length)
 */
findSubstring = (mainStr: string, words: string[]): number[] => {
    const output = [];
    const wordLen = words[0].length;

    for (let wordCharIndex = 0; wordCharIndex < wordLen; wordCharIndex++) {
        if (wordCharIndex + words.length * wordLen > mainStr.length) {
            break;
        }

        const differ = new Map();
        for (let j = 0; j < words.length; j++) {
            const mainStrWord = mainStr.substring(wordCharIndex + j * wordLen, wordCharIndex + (j + 1) * wordLen);
            differ.set(mainStrWord, (differ.get(mainStrWord) || 0) + 1);
        }
        for (const word of words) {
            differ.set(word, (differ.get(word) || 0) - 1);
            if (differ.get(word) === 0) {
                differ.delete(word);
            }
        }

        for (let mainStrIndex = wordCharIndex; mainStrIndex < mainStr.length - words.length * wordLen + 1; mainStrIndex += wordLen) {
            if (mainStrIndex !== wordCharIndex) {
                let word = mainStr.substring(mainStrIndex + (words.length - 1) * wordLen, mainStrIndex + words.length * wordLen);

                differ.set(word, (differ.get(word) || 0) + 1);

                if (differ.get(word) === 0) {
                    differ.delete(word);
                }

                word = mainStr.substring(mainStrIndex - wordLen, mainStrIndex);
                differ.set(word, (differ.get(word) || 0) - 1);

                if (differ.get(word) === 0) {
                    differ.delete(word);
                }
            }

            if (differ.size === 0) {
                output.push(mainStrIndex);
            }
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        findSubstring("barfoothefoobarman", ["foo", "bar"]),
        //
        [0, 9],
    );
});
test(`官方例子`, () => {
    return is(
        findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]),
        //
        [],
    );
});
