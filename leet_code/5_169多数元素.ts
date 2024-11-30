import {test, is} from "./libs/unit-test";

/**
 * 169. 多数元素
 * https://leetcode.cn/problems/majority-element/description
 *
 * @description
 * 输入 [2, 2, 1, 1, 2, 2, 3]
 * 输出 2
 */
let majorityElement: (nums: number[]) => number;

/**
 * Boyer-Moore 摩尔投票算法
 */
majorityElement = (nums: number[]): number => {
    console.log(nums);

    let candidate: number;
    let count = 0;

    for (let index = 0; index < nums.length; index++) {
        if (count === 0) {
            candidate = nums[index];
        }

        count += nums[index] === candidate ? 1 : -1;
    }
    console.log(count);

    return candidate;
};

test(`官方例子`, () => {
    return is(
        //
        majorityElement([3, 2, 3]),
        //
        3,
    );
});
test(`官方例子`, () => {
    return is(
        //
        majorityElement([2, 2, 1, 1, 1, 2, 2]),
        //
        2,
    );
});
