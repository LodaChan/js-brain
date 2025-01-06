import {test, is} from "./libs/unit-test";

/**
 * 27. 移除元素
 * https://leetcode.cn/problems/remove-element/description
 *
 * @description
 * 输入 [3, 2, 3, 2, 3], 3
 * 输出 [2, 2, undefined, undefined, undefined]
 */
let removeElement: (nums: number[], val: number) => number;

/**
 * 正向(同起点快慢)双指针 + 数据抹除
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
removeElement = (nums: number[], val: number): number => {
    console.log(nums);
    console.log(val);

    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }

    for (let count = nums.length; count > left; count--) {
        nums[count - 1] = undefined;
    }

    console.log(nums);

    return left;
};

/**
 * 双向双指针 + 数据抹除
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
removeElement = (nums: number[], val: number): number => {
    console.log([...nums], val);

    let left = 0;
    // 不是常规的 nums.length-1
    // 左指针 left 和右指针 right 重合的时候 , 左右指针必定遍历完数组中所有的元素
    let right = nums.length;

    while (left < right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            nums[right - 1] = undefined;
            right--;
        } else {
            left++;
        }
    }

    console.log(nums);

    return left;
};

test(`全移除`, () => {
    return is(
        //
        removeElement([1, 1, 1], 1),
        //
        0,
    );
});
test(`无移除`, () => {
    return is(
        //
        removeElement([1, 2, 3], 4),
        //
        3,
    );
});
test(`前移除`, () => {
    return is(
        //
        removeElement([3, 2, 2], 3),
        //
        2,
    );
});
test(`中移除`, () => {
    return is(
        //
        removeElement([3, 2, 2, 3], 2),
        //
        2,
    );
});
test(`后移除`, () => {
    return is(
        //
        removeElement([2, 2, 3], 3),
        //
        2,
    );
});
test(`前移除,中移除,后移除`, () => {
    return is(
        //
        removeElement([3, 2, 3, 2, 3], 3),
        //
        2,
    );
});
test(`前移除,中移除`, () => {
    return is(
        //
        removeElement([3, 2, 3, 2, 4], 3),
        //
        3,
    );
});
test(`前移除,后移除`, () => {
    return is(
        //
        removeElement([3, 2, 2, 3], 3),
        //
        2,
    );
});
test(`中移除,后移除`, () => {
    return is(
        //
        removeElement([0, 2, 2, 3, 2], 2),
        //
        2,
    );
});
test(`官方例子`, () => {
    return is(
        //
        removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2),
        //
        5,
    );
});
