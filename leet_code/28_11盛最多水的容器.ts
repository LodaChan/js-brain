import {test, is} from "./libs/unit-test";

/**
 * 11. 盛最多水的容器
 * https://leetcode.cn/problems/container-with-most-water/description
 *
 * @description
 * 输入 [1,8,6,2,5,4,8,3,7]
 * 输出 49
 */
let maxArea: (height: number[]) => number;

/**
 * 贪心 + 双指针
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
maxArea = (height: number[]): number => {
    let output = 0;

    let leftIndex = 0,
        rightIndex = height.length - 1;

    while (leftIndex < rightIndex) {
        let area = Math.min(height[leftIndex], height[rightIndex]) * (rightIndex - leftIndex);

        output = Math.max(output, area);

        if (height[leftIndex] <= height[rightIndex]) {
            leftIndex++;
        } else {
            rightIndex--;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]),
        //
        49,
    );
});
test(`官方例子`, () => {
    return is(
        maxArea([1, 1]),
        //
        1,
    );
});
