import {test, is} from "./libs/unit-test";

/**
 * 3. 无重复字符的最长子串
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description
 *
 * @description
 * 输入 s = "abcabcbb"
 * 输出 3
 */
let lengthOfLongestSubstring: (mainStr: string) => number;

/**
 * 哈希表 + 滑块
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(∣Σ∣)
 */
lengthOfLongestSubstring = (mainStr: string): number => {
    const occ = new Set();
    const n = mainStr.length;

    let rightIndex = -1,
        output = 0;

    for (let leftIndex = 0; leftIndex < n; leftIndex++) {
        if (leftIndex !== 0) {
            // 左指针向右移动一格 , 移除一个字符
            occ.delete(mainStr[leftIndex - 1]);
        }

        while (rightIndex + 1 < n && occ.has(mainStr[rightIndex + 1]) === false) {
            occ.add(mainStr[rightIndex + 1]);
            rightIndex++;
        }

        output = Math.max(output, rightIndex - leftIndex + 1);
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        lengthOfLongestSubstring("abcabcbb"),
        // abc
        3,
    );
});
test(`官方例子`, () => {
    return is(
        lengthOfLongestSubstring("pwwkew"),
        // wke
        3,
    );
});
test(`官方例子`, () => {
    return is(
        lengthOfLongestSubstring("dvdf"),
        // vdf
        3,
    );
});
