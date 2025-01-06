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
 * 分治(Boyer-Moore 摩尔投票算法)
 */
majorityElement = (nums: number[]): number => {
    console.log(nums);

    let mostNum: number;
    let count = 0;

    for (let index = 0; index < nums.length; index++) {
        if (count === 0) {
            mostNum = nums[index];
        }

        count += nums[index] === mostNum ? 1 : -1;
    }
    console.log(count);

    return mostNum;
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
