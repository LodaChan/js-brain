import {test, is} from "./libs/unit-test";

/**
 * 189. 轮转数组
 * https://leetcode.cn/problems/rotate-array/description
 *
 * @description
 * 输入 [0, 1, 2, 3, 4, 5, 6, 7] , k = 3
 * 输出 [5, 6, 7, 0, 1, 2, 3, 4]
 */
let rotate: (nums: number[], k: number) => number[];

/**
 * 索引补K后基于nums.length求余 + 临时存储空间
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
rotate = (nums: number[], k: number): number[] => {
    console.log(nums);
    console.log(k);

    let newNums = new Array(k);

    for (let index = 0; index < nums.length; index++) {
        newNums[(index + k) % nums.length] = nums[index];
    }

    for (let index = 0; index < nums.length; index++) {
        nums[index] = newNums[index];
    }

    console.log(nums);
    return nums;
};

/**
 * 环形替换
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
rotate = (nums: number[], k: number): number[] => {
    console.log(nums);
    console.log(k);

    const n = nums.length;

    /**
     * 求最大公约数
     */
    const _GCDFunc = (x: number, y: number) => (y ? _GCDFunc(y, x % y) : x);

    k = k % n;

    let count = _GCDFunc(k, n);
    for (let start = 0; start < count; ++start) {
        let current = start;
        let prev = nums[start];
        do {
            const next = (current + k) % n;
            const temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
        } while (start !== current);
    }

    console.log(nums);
    return nums;
};

/**
 * 动态规划 + 数组1次翻转再2次分段翻转
 *
 * @description
 * 时间复杂度 O(2n)
 * 空间复杂度 O(1)
 */
rotate = (nums: number[], k: number): number[] => {
    console.log(nums);
    console.log(k);

    k = nums.length % k;

    const _reverseFunc = (nums: number[], startIndex: number, endIndex: number) => {
        while (startIndex < endIndex) {
            const temp = nums[startIndex];
            nums[startIndex] = nums[endIndex];
            nums[endIndex] = temp;
            startIndex++;
            endIndex--;
        }
    };
    _reverseFunc(nums, 0, nums.length - 1);
    _reverseFunc(nums, 0, k - 1);
    _reverseFunc(nums, k, nums.length - 1);

    console.log(nums);
    return nums;
};

test(`单例子`, () => {
    return is(
        //
        rotate([1], 2),
        //
        [1],
    );
});
test(`过程例子`, () => {
    return is(
        //
        rotate([1, 2], 1),
        //
        [2, 1],
    );
});
test(`过程例子`, () => {
    return is(
        //
        rotate([1, 2], 2),
        //
        [1, 2],
    );
});
test(`官方例子`, () => {
    return is(
        //
        rotate([0, 1, 2, 3, 4, 5, 6, 7], 3),
        //
        [5, 6, 7, 0, 1, 2, 3, 4],
    );
});
test(`官方例子`, () => {
    return is(
        //
        rotate([-1, -100, 3, 99], 2),
        //
        [3, 99, -1, -100],
    );
});
