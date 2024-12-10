import {test, is} from "./libs/unit-test";

/**
 * 392. 判断子序列
 * https://leetcode.cn/problems/is-subsequence/description
 *
 * @description
 * 输入 "abc", "ahbgdc"
 * 输出 true
 */
let isSubsequence: (subStr: string, mainStr: string) => boolean;

/**
 * 双指针
 *
 * @description
 * 时间复杂度 O(n + m)
 * 空间复杂度 O(1)
 */
isSubsequence = (subStr: string, mainStr: string): boolean => {
    let output = false;

    let mainStrCharIndex = 0,
        subStrCharIndex = 0;

    while (subStrCharIndex < subStr.length && mainStrCharIndex < mainStr.length) {
        if (subStr[subStrCharIndex] === mainStr[mainStrCharIndex]) {
            subStrCharIndex++;
        }

        mainStrCharIndex++;
    }

    return (output = subStrCharIndex === subStr.length);
};

/**
 * 动态规划 优势在于多个subStr进行子序列判定
 *
 * @description
 * 时间复杂度 O(m *∣Σ∣+ n)  ∣Σ∣= 26
 * 空间复杂度 O(m *∣Σ∣) ∣Σ∣= 6
 */
isSubsequence = (subStr: string, mainStr: string): boolean => {
    let output = false;

    const mat = new Array(mainStr.length + 1).fill(0).map(() => new Array(26).fill(0));
    for (let xIndex = 0; xIndex < 26; xIndex++) {
        mat[mainStr.length][xIndex] = mainStr.length;
    }
    // [mk] 1 倒过来遍历
    for (let yIndex = mainStr.length - 1; yIndex >= 0; yIndex--) {
        for (let keyIndex = 0; keyIndex < 26; keyIndex++) {
            if (mainStr.charCodeAt(yIndex) === keyIndex + 97) {
                mat[yIndex][keyIndex] = yIndex;
            } else {
                mat[yIndex][keyIndex] = mat[yIndex + 1][keyIndex];
            }
        }
    }

    let nextSubStrChatIndex = 0;
    for (let subStrCharIndex = 0; subStrCharIndex < subStr.length; subStrCharIndex++) {
        if (mat[nextSubStrChatIndex][subStr.charCodeAt(subStrCharIndex) - 97] === mainStr.length) {
            return (output = false);
        }

        nextSubStrChatIndex = mat[nextSubStrChatIndex][subStr.charCodeAt(subStrCharIndex) - 97] + 1;
    }

    return (output = true);
};
/**
 * 哈希索引表 + lastCharIndexOfMainStr + 二分查找
 *
 * @description
 * 时间复杂度 O(m * logn + n)
 * 空间复杂度 O(n)
 */
isSubsequence = (subStr: string, mainStr: string): boolean => {
    let output = false;

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        isSubsequence("", "ahbgdc"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isSubsequence("aaaaaa", "bbaaaa"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isSubsequence("abc", "ahbgdc"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isSubsequence("axc", "ahbgdc"),
        //
        false,
    );
});
