import {test, is} from "./libs/unit-test";

/**
 * 219. 存在重复元素 II
 * https://leetcode.cn/problems/contains-duplicate-ii/description
 *
 * 是否存在两个 不同的索引 i 和 j
 * 满足 nums[i] === nums[j] 且 abs(i - j) <= k
 *
 * @description
 * 输入 nums = [1,2,3,1], k = 3
 * 输出 true
 */
let containsNearbyDuplicate: (nums: number[], k: number) => boolean;

/**
 * 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
containsNearbyDuplicate = (nums: number[], k: number): boolean => {
    const kMap = new Map();

    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];

        if (kMap.has(num) === true && index - kMap.get(num) <= k) {
            return true;
        }

        kMap.set(num, index);
    }

    return false;
};

/**
 * 滑动窗口
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(k)
 */
containsNearbyDuplicate = (nums: number[], k: number): boolean => {
    const kSet = new Set();

    for (let index = 0; index < nums.length; index++) {
        // 头减
        if (index > k) {
            kSet.delete(nums[index - k - 1]);
        }

        if (kSet.has(nums[index]) === true) {
            return true;
        }

        // 尾加
        kSet.add(nums[index]);
    }

    return false;
};

test(`官方例子`, () => {
    return is(
        containsNearbyDuplicate([1, 2, 3, 1], 3),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        containsNearbyDuplicate([1, 2, 1], 0),
        //
        false,
    );
});
