import {test, is} from "./libs/unit-test";

/**
 * 26. 移除有序数组中的重复元素
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description
 *
 * @description
 * 输入 [1, 2, 2, 3]
 * 输出 [1, 3]
 */
let removeDuplicates: (nums: number[]) => number;

/**
 * 正向双指针 + 距离为1快指针递推
 */
removeDuplicates = (nums: number[]): number => {
    console.log(nums);

    let k = 0;

    const n = nums.length;
    if (n === 0) {
        return (k = 0);
    }
    let fast = 1,
        slow = 1;

    while (fast < n) {
        if (nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }

        fast++;
    }

    k = slow;

    for (let index = k; index < nums.length; index++) {
        nums[index] = undefined;
    }

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
        removeDuplicates([1, 1]),
        //
        1,
    );
});
test(`前移除`, () => {
    return is(
        //
        removeDuplicates([1, 1, 2]),
        //
        2,
    );
});
test(`中移除`, () => {
    return is(
        //
        removeDuplicates([1, 2, 2, 3]),
        //
        3,
    );
});
test(`后移除`, () => {
    return is(
        //
        removeDuplicates([1, 2, 2]),
        //
        2,
    );
});
test(`官方例子`, () => {
    return is(
        //
        removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]),
        //
        5,
    );
});
