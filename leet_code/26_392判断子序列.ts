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

    const matrix = new Array(mainStr.length + 1).fill(0).map(() => new Array(26).fill(0));
    for (let xIndex = 0; xIndex < 26; xIndex++) {
        matrix[mainStr.length][xIndex] = mainStr.length;
    }
    // [mk] 倒过来遍历
    for (let rowIndex = mainStr.length - 1; rowIndex >= 0; rowIndex--) {
        for (let charCodeIndex = 0; charCodeIndex < 26; charCodeIndex++) {
            if (mainStr.charCodeAt(rowIndex) === charCodeIndex + 97) {
                matrix[rowIndex][charCodeIndex] = rowIndex;
            } else {
                matrix[rowIndex][charCodeIndex] = matrix[rowIndex + 1][charCodeIndex];
            }
        }
    }

    let rowIndex = 0;
    for (let subStrCharIndex = 0; subStrCharIndex < subStr.length; subStrCharIndex++) {
        const charCodeIndex = subStr.charCodeAt(subStrCharIndex) - 97;

        if (matrix[rowIndex][charCodeIndex] === mainStr.length) {
            return (output = false);
        }

        rowIndex = matrix[rowIndex][charCodeIndex] + 1;
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
