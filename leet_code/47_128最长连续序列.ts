import {test, is} from "./libs/unit-test";

/**
 * 128. 最长连续序列
 * https://leetcode.cn/problems/longest-consecutive-sequence/description
 *
 * 给定一个未排序的整数数组 nums
 * 找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
 *
 * @description
 * 输入 [100,4,200,1,3,2]
 * 输出 4
 */
let longestConsecutive: (nums: number[]) => number;

/**
 * 单调函数 + 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(|∑|) , |∑|是nums的元素不重复的集合
 */
longestConsecutive = (nums: number[]): number => {
    let numSet: Set<number> = new Set();

    for (const num of nums) {
        numSet.add(num);
    }

    let output = 0;

    for (const num of numSet) {
        // 从 递减推演和递增推演 变成 单调递增推演 , 目标是找到最长连续序列的 min 值
        if (numSet.has(num - 1) === false) {
            let cur = num;
            let len = 1;

            while (numSet.has(cur + 1) === true) {
                cur += 1;
                len += 1;
            }

            output = Math.max(output, len);
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        longestConsecutive([100, 4, 200, 1, 3, 2]),
        // [1, 2, 3, 4]
        4,
    );
});
test(`官方例子`, () => {
    return is(
        longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]),
        // [0, 1, 2, 3, 4, 5, 6, 7, 8]
        9,
    );
});
