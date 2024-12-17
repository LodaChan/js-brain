import {test, is} from "./libs/unit-test";

/**
 * 1. 两数之和
 * https://leetcode.cn/problems/two-sum/description
 *
 * @description
 * 输入 nums = [2,7,11,15], target = 9
 * 输出 9
 */
let twoSum: (nums: number[], target: number) => number[];

/**
 * 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
twoSum = (nums: number[], target: number): number[] => {
    let output = [];

    const indexHashMap: Map<number, number> = new Map();

    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        const anotherNum = target - num;

        if (indexHashMap.has(anotherNum) === true) {
            return (output = [indexHashMap.get(anotherNum), index]);
        }

        indexHashMap[num] = index;
    }
    return output;
};

test(`官方例子`, () => {
    return is(
        twoSum([2, 7, 11, 15], 9),
        //
        [0, 1],
    );
});
test(`官方例子`, () => {
    return is(
        twoSum([3, 2, 4], 6),
        //
        [1, 2],
    );
});
test(`官方例子`, () => {
    return is(
        twoSum([3, 3], 6),
        //
        [0, 1],
    );
});
