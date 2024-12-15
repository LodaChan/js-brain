import {test, is} from "./libs/unit-test";

/**
 * 238. 除自身以外数组的乘积
 * https://leetcode.cn/problems/product-of-array-except-self/description
 *
 * @description
 * 输入 [1, 2, 3, 4]
 * 输出 [24, 12, 8, 6]
 */
let productExceptSelf: (nums: number[]) => number[];

/**
 *
 * 前缀和 + 先左构建乘积列表,再右乘积
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
productExceptSelf = (nums: number[]): number[] => {
    const length = nums.length;
    const output = new Array<number>(length);

    // answer[i] 表示索引 i 左侧所有元素的乘积
    // 因为索引为 0 的元素左侧没有元素, 所以 answer[0] = 1
    output[0] = 1;
    for (let index = 1; index < length; index++) {
        output[index] = nums[index - 1] * output[index - 1];
    }

    // R 为右侧所有元素的乘积
    // 刚开始右边没有元素,所以 R = 1
    let R = 1;
    for (let index = length - 1; index >= 0; index--) {
        // 对于索引 i,左边的乘积为 answer[i],右边的乘积为 R
        output[index] = output[index] * R;
        // R 需要包含右边所有的乘积,所以计算下一个结果时需要将当前值乘到 R 上
        R *= nums[index];
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        productExceptSelf([1, 2, 3, 4]),
        //
        [24, 12, 8, 6],
    );
});
test(`官方例子`, () => {
    return is(
        //
        productExceptSelf([-1, 1, 0, -3, 3]),
        //
        [0, 0, 9, 0, 0],
    );
});
