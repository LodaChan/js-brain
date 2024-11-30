import {test, is} from "./libs/unit-test";

/**
 * 80. 删除有序数组中的重复项 II
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description
 *
 * @description
 * 输入 [1, 2, 2, 2, 3]
 * 输出 [1, 2, 2, 3]
 */
let removeDuplicates: (nums: number[]) => number;

/**
 * 正向双指针 + 距离为2快指针与慢指针递推
 */
removeDuplicates = (nums: number[]): number => {
    console.log(nums);

    let k = 0;

    if (nums.length <= 2) {
        return (k = nums.length);
    }
    let slow = 2,
        fast = 2;
    while (fast < nums.length) {
        if (nums[slow - 2] != nums[fast]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }

    k = slow;

    nums = nums.slice(0, k);
    console.log(nums);

    return k;
};

test(`单数据`, () => {
    return is(
        //
        removeDuplicates([1]),
        //
        1,
    );
});
test(`不移除`, () => {
    return is(
        //
        removeDuplicates([1, 2, 3]),
        //
        3,
    );
});
test(`全移除`, () => {
    return is(
        //
        removeDuplicates([1, 1, 1]),
        //
        2,
    );
});
test(`前移除`, () => {
    return is(
        //
        removeDuplicates([1, 1, 1, 2]),
        //
        3,
    );
});
test(`中移除`, () => {
    return is(
        //
        removeDuplicates([1, 2, 2, 2, 3]),
        //
        4,
    );
});
test(`后移除`, () => {
    return is(
        //
        removeDuplicates([1, 2, 3, 3, 3]),
        //
        4,
    );
});
test(`官方例子`, () => {
    return is(
        //
        removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]),
        //
        7,
    );
});
test(`官方例子`, () => {
    return is(
        //
        removeDuplicates([1, 1, 1, 2, 2, 3]),
        //
        5,
    );
});
