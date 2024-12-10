import {test, is} from "./libs/unit-test";

/**
 * 58. 最长公共前缀
 * https://leetcode.cn/problems/longest-common-prefix/description
 *
 * @description
 * 输入 ["flower", "flow", "flight"]
 * 输出 "fl"
 *
 * "".substring(start,end)
 * 不会改变原字符串
 * 用途1:返回字符串[start,end)
 *
 * "".substr(start,count)
 * 不会改变原字符串
 * 用途1:返回字符串[start,start+count-1)
 */
let longestCommonPrefix: (inputWordList: string[]) => string;

/**
 * 纵向查找
 *
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(1)
 */
longestCommonPrefix = (inputWordList: string[]): string => {
    let output = "";

    if (inputWordList == null || inputWordList.length == 0) {
        return (output = "");
    }

    let maxCharCount = inputWordList[0].length;

    for (let charIndex = 0; charIndex < maxCharCount; charIndex++) {
        let charValue = inputWordList[0][charIndex];

        for (let wordIndex = 1; wordIndex < inputWordList.length; wordIndex++) {
            if (charIndex === inputWordList[wordIndex].length || inputWordList[wordIndex][charIndex] != charValue) {
                return (output = inputWordList[0].substring(0, charIndex));
            }
        }
    }

    return (output = inputWordList[0]);
};

/**
 * 横向查找
 * LCP(S1...S4) = LCP(LCP(LCP(S1,S2),S3),S4)
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(1)
 */
longestCommonPrefix = (inputWordList: string[]): string => {
    let prefix = "";

    if (inputWordList == null || inputWordList.length == 0) {
        return (prefix = "");
    }

    /**
     * 查找2个word的最长公共前缀
     */
    const getLCPBetween2WordsFunc = (word1: string, word2: string) => {
        const charCount = Math.min(word1.length, word2.length);

        let charIndex = 0;

        while (charIndex < charCount && word1[charIndex] === word2[charIndex]) {
            charIndex++;
        }

        return word1.substring(0, charIndex);
    };

    prefix = inputWordList[0];
    for (let wordIndex = 1; wordIndex < inputWordList.length; wordIndex++) {
        prefix = getLCPBetween2WordsFunc(prefix, inputWordList[wordIndex]);

        if (prefix.length === 0) {
            break;
        }
    }

    return prefix;
};

/**
 * 分治
 * LCP(S1...S4) = LCP(LCP(S1,S2),LCP(S3,S4))
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(m * logn)
 */
longestCommonPrefix = (inputWordList: string[]): string => {
    return "";
};

/**
 * 二分查找 + 最短word长度 + mid逐步逼近 + 纵向查找
 *
 * @description
 * 时间复杂度 O(m * n * logm)
 * 空间复杂度 O(1)
 */
longestCommonPrefix = (inputWordList: string[]): string => {
    return "";
};

test(`官方例子`, () => {
    return is(
        //
        longestCommonPrefix(["a"]),
        //
        "a",
    );
});
test(`官方例子`, () => {
    return is(
        //
        longestCommonPrefix(["flower", "flow", "flight"]),
        //
        "fl",
    );
});
test(`官方例子`, () => {
    return is(
        //
        longestCommonPrefix(["dog", "racecar", "car"]),
        //
        "",
    );
});
