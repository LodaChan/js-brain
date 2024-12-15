import {test, is} from "./libs/unit-test";

/**
 * 76. 最小覆盖子串
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description
 *
 * @description
 * 输入 mainStr = "ADOBECODEBANC", subStr = "ABC"
 * 输出 BANC
 */
let minWindow: (mainStr: string, subStr: string) => string;

/**
 * 滑动窗口
 *
 * @description
 * 时间复杂度 O(∣Σ∣*∣mainStr∣+∣subStr∣) ,∣Σ∣是指 mainStr 与 subStr 的公共字符集
 * 空间复杂度 O(∣Σ∣) ,∣Σ∣是指 mainStr 与 subStr 的公共字符集
 */
minWindow = (mainStr: string, subStr: string): string => {
    const need = new Map();
    const window = new Map();

    for (let index = 0; index < subStr.length; index++) {
        need.set(subStr[index], (need.get(subStr[index]) || 0) + 1);
    }

    let leftIndex = 0;
    let rightIndex = 0;

    let validCount = 0;
    let startIndex = 0;
    let minLen = Number.MAX_SAFE_INTEGER;

    while (rightIndex < mainStr.length) {
        // 维护右边界
        const currentCharOfMainStr = mainStr[rightIndex];
        rightIndex++;

        if (need.has(currentCharOfMainStr) === true) {
            window.set(currentCharOfMainStr, (window.get(currentCharOfMainStr) || 0) + 1);

            if (window.get(currentCharOfMainStr) === need.get(currentCharOfMainStr)) {
                validCount++;
            }
        }

        // 符合条件后 , 右移左边界 , 然后再右移右边界
        while (need.size === validCount) {
            if (rightIndex - leftIndex < minLen) {
                startIndex = leftIndex;
                minLen = rightIndex - leftIndex;
            }

            const firstCharOfMainStr = mainStr[leftIndex];
            leftIndex++;

            if (window.has(firstCharOfMainStr) === true) {
                if (window.get(firstCharOfMainStr) === need.get(firstCharOfMainStr)) {
                    validCount--;
                }

                window.set(firstCharOfMainStr, window.get(firstCharOfMainStr) - 1);
            }
        }
    }

    return minLen === Number.MAX_SAFE_INTEGER ? "" : mainStr.substring(startIndex, startIndex + minLen);
};

test(`官方例子`, () => {
    return is(
        minWindow("ADOBECODEBANC", "ABC"),
        //
        "BANC",
    );
});
test(`官方例子`, () => {
    return is(
        minWindow("a", "a"),
        //
        "a",
    );
});
test(`官方例子`, () => {
    return is(
        minWindow("a", "aa"),
        //
        "",
    );
});
