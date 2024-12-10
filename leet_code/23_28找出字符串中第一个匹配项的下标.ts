import {test, is} from "./libs/unit-test";

/**
 * 28. 找出字符串中第一个匹配项的下标
 * https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description
 *
 * @description
 * 输入 mainStr = "ABABABCAA", subStr = "ABABC"
 * 输出 0
 */
let strStr: (mainStr: string, subStr: string) => number;

/**
 * 暴力匹配
 *
 * 暴力匹配不具备上次匹配的能力
 * @description
 * 时间复杂度 O(n * m)
 * 空间复杂度 O(1)
 */
strStr = (mainStr: string, subStr: string): number => {
    let output = -1;

    for (let charIndex = 0; charIndex < mainStr.length; charIndex++) {
        matchNeedleJsLabel: for (let matchNeedleIndex = 0; matchNeedleIndex < subStr.length; matchNeedleIndex++) {
            if (mainStr[charIndex + matchNeedleIndex] !== subStr[matchNeedleIndex]) {
                break matchNeedleJsLabel;
            } else if (matchNeedleIndex === subStr.length - 1) {
                return (output = charIndex);
            }
        }
    }

    return output;
};

/**
 * KMP Knuth-Morris-Pratt 算法 解决子串匹配时的回退
 *
 * @description
 * 时间复杂度 O(n + m)
 * 空间复杂度 O(m)
 */
strStr = (mainStr: string, subStr: string): number => {
    let output = -1;

    if (subStr.length === 0) {
        return (output = 0);
    }

    /**
     * [mk] 1 使用前缀函数递推求出 部分匹配表 PMT Partial Match Table
     * 数据 [ A, B, A, B, C ]
     * 输出 [ 0, 0, 1, 2, 0 ] 值表示对应字符可以跳过的前缀个数
     */
    const PMT = new Array(subStr.length).fill(0);

    for (let slowCharIndex = 0, fastCharIndex = 1; fastCharIndex < subStr.length; fastCharIndex++) {
        while (slowCharIndex > 0 && subStr[fastCharIndex] !== subStr[slowCharIndex]) {
            // 先定位到子串2的首字符index的前一位,即子串1的最后1位
            // 然后再递推找到剩余匹配子串的charIndex
            slowCharIndex = PMT[slowCharIndex - 1];
        }

        if (subStr[fastCharIndex] === subStr[slowCharIndex]) {
            slowCharIndex++;
        }

        PMT[fastCharIndex] = slowCharIndex;
    }

    // [mk] 2 继续复用前缀函数的概念
    for (let mainStrCharIndex = 0, subStrCharIndex = 0; mainStrCharIndex < mainStr.length; mainStrCharIndex++) {
        while (subStrCharIndex > 0 && mainStr[mainStrCharIndex] != subStr[subStrCharIndex]) {
            subStrCharIndex = PMT[subStrCharIndex - 1];
        }

        if (mainStr[mainStrCharIndex] === subStr[subStrCharIndex]) {
            subStrCharIndex++;
        }

        if (subStrCharIndex === subStr.length) {
            return (output = mainStrCharIndex - subStr.length + 1);
        }
    }

    return output;
};

test(`KMP实验例子`, () => {
    return is(
        // AAA   [ 0, 1, 2 ]
        // ABAB  [ 0, 0, 1, 2 ]
        // ABABC [ 0, 0, 1, 2, 0 ]
        strStr("ABABABCAA", "ABABC"),
        //
        2,
    );
});
