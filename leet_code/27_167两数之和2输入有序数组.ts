import {test, is} from "./libs/unit-test";

/**
 * 167. 两数之和 II - 输入有序数组
 * https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description
 *
 * @description
 * 输入 numbers = [2,7,11,15] 递增序列, target = 9
 * 输出 [1,2]
 */
let twoSum: (numbers: number[], target: number) => number[];

/**
 * 双指针
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
twoSum = (numbers: number[], target: number): number[] => {
    let output: [number, number] = [-1, -1];

    let lowIndex = 0,
        highIndex = numbers.length - 1;

    while (lowIndex < highIndex) {
        let sum = numbers[lowIndex] + numbers[highIndex];

        if (sum === target) {
            return (output = [lowIndex + 1, highIndex + 1]);
        } else if (sum < target) {
            lowIndex++;
        } else {
            highIndex--;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        twoSum([-1, 0], -1),
        //
        [1, 2],
    );
});
test(`官方例子`, () => {
    return is(
        //
        twoSum([2, 7, 11, 15], 9),
        //
        [1, 2],
    );
});
test(`官方例子`, () => {
    return is(
        //
        twoSum([2, 3, 4], 6),
        //
        [1, 3],
    );
});
