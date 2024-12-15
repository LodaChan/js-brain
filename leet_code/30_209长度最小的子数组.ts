import {test, is} from "./libs/unit-test";

/**
 * 209. 长度最小的子数组
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description
 *
 * @description
 * 输入 target = 7, nums = [2, 3, 1, 2, 4, 3]
 * 输出 2
 */
let minSubArrayLen: (target: number, nums: number[]) => number;

/**
 * 暴力
 *
 * @description
 * 时间复杂度 O(n * logn)
 * 空间复杂度 O(1)
 */
minSubArrayLen = (target: number, nums: number[]): number => {
    let n = nums.length;

    if (n == 0) {
        return 0;
    }

    let output = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        let sum = 0;

        for (let j = i; j < n; j++) {
            sum += nums[j];
            if (sum >= target) {
                output = Math.min(output, j - i + 1);
                break;
            }
        }
    }

    return output == Number.MAX_SAFE_INTEGER ? 0 : output;
};

/**
 * 滑动窗口 + 先扩展后指针再收缩指针 + 贪心
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
minSubArrayLen = (target: number, nums: number[]): number => {
    let n = nums.length;
    if (n == 0) {
        return 0;
    }

    let output = Number.MAX_VALUE;

    let index1 = 0,
        index2 = 0;
    let sum = 0;

    while (index2 < n) {
        sum += nums[index2];

        while (sum >= target) {
            output = Math.min(output, index2 - index1 + 1);
            sum -= nums[index1];
            index1++;
        }

        index2++;
    }

    return output == Number.MAX_VALUE ? 0 : output;
};

test(`官方例子`, () => {
    return is(
        minSubArrayLen(7, [2, 3, 1, 2, 4, 3]),
        //
        2,
    );
});
test(`官方例子`, () => {
    return is(
        minSubArrayLen(15, [1, 2, 3, 4, 5]),
        //
        5,
    );
});
test(`官方例子`, () => {
    return is(
        minSubArrayLen(213, [83, 28, 26, 25, 25, 25, 25, 25, 12, 12, 4, 2]),
        //
        8,
    );
});
