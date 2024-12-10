import {test, is} from "./libs/unit-test";

/**
 * 45. 最小跳跃次数
 * https://leetcode.cn/problems/jump-game-ii/description
 *
 * @description
 * 输入 [2, 3, 1, 1, 4]
 * 输出 2
 */
let minJumpCount: (nums: number[]) => number;

/**
 * 动态规划 + 贪心 + 反向递推最小index值匹配
 *
 * @description
 * 时间复杂度 (n^2)
 * 空间复杂度 O(1)
 */
minJumpCount = (nums: number[]): number => {
    let steps = 0;

    let finalJumpIndex = nums.length - 1;

    while (finalJumpIndex > 0) {
        for (let index = 0; index < finalJumpIndex; index++) {
            if (index + nums[index] >= finalJumpIndex) {
                finalJumpIndex = index;
                steps++;
                break;
            }
        }
    }

    return steps;
};

/**
 * 动态规划 + 贪心 + 正向递推区域最大index
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
minJumpCount = (nums: number[]): number => {
    let steps = 0;

    let maxIndex = 0;
    let preStepMaxIndex = 0;

    for (let index = 0; index < nums.length - 1; index++) {
        maxIndex = Math.max(index + nums[index], maxIndex);
        if (index === preStepMaxIndex) {
            preStepMaxIndex = maxIndex;
            steps++;
        }
    }

    return steps;
};

test(`官方例子`, () => {
    return is(
        //
        minJumpCount([2, 3, 1, 1, 4]),
        //
        2,
    );
});
test(`官方例子`, () => {
    return is(
        //
        minJumpCount([2, 3, 0, 1, 4]),
        //
        2,
    );
});
