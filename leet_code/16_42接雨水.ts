import {test, is} from "./libs/unit-test";

/**
 * 42. 接雨水
 * https://leetcode.cn/problems/trapping-rain-water
 *
 * @description
 * 输入 [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
 * 输出 6
 */
let trap: (height: number[]) => number;

/**
 * 单调栈
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
trap = (height: number[]): number => {
    let output = 0;

    const indexStack: number[] = [];

    for (let index = 0; index < height.length; index++) {
        // 当右边出现比栈顶大的数时，开始计算储水量
        while (indexStack.length > 0 && height[index] > height[indexStack[indexStack.length - 1]]) {
            const topStackIndex = indexStack.pop();

            // topStackIndex左边没柱子了不构成抽象容器
            if (indexStack.length === 0) {
                break;
            }

            // topStackIndex左边的柱子
            const preIndexOfTopStackIndex = indexStack[indexStack.length - 1];

            const dw = index - preIndexOfTopStackIndex - 1;
            const dt = Math.min(height[preIndexOfTopStackIndex], height[index]) - height[topStackIndex];
            output += dw * dt;
        }

        indexStack.push(index);
    }

    return output;
};

/**
 * 动态规划
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
trap = (height: number[]): number => {
    const n = height.length;
    if (n === 0) {
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    leftMax[0] = height[0];
    for (let index = 1; index < n; index++) {
        leftMax[index] = Math.max(leftMax[index - 1], height[index]);
    }

    const rightMax = new Array(n).fill(0);
    rightMax[n - 1] = height[n - 1];
    for (let index = n - 2; index >= 0; index--) {
        rightMax[index] = Math.max(rightMax[index + 1], height[index]);
    }

    let output = 0;
    for (let index = 0; index < n; index++) {
        output += Math.min(leftMax[index], rightMax[index]) - height[index];
    }
    return output;
};

/**
 * 动态规划 + 双指针
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
trap = (height: number[]): number => {
    let output = 0;

    let left = 0,
        right = height.length - 1;

    let leftMax = 0,
        rightMax = 0;

    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);

        if (height[left] < height[right]) {
            output += leftMax - height[left];
            left++;
        }
        //
        else {
            output += rightMax - height[right];
            right--;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]),
        //
        6,
    );
});
test(`官方例子`, () => {
    return is(
        //
        trap([4, 2, 0, 3, 2, 5]),
        //
        9,
    );
});
