import {test, is} from "./libs/unit-test";

/**
 * 55. 跳跃游戏
 * https://leetcode.cn/problems/jump-game/description
 *
 * @description
 * 输入 [3, 2, 1, 0, 4]
 * 输出 false
 */
let canJump: (nums: number[]) => boolean;

/**
 * 贪心
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
canJump = (nums: number[]): boolean => {
    console.log(nums);

    let output = false;

    let n = nums.length;
    let maxJumpIndex = 0;

    for (let index = 0; index < n; index++) {
        if (index <= maxJumpIndex) {
            maxJumpIndex = Math.max(maxJumpIndex, index + nums[index]);
            if (maxJumpIndex >= n - 1) {
                return (output = true);
            }
        }
    }

    return output;
};

test(`不用跳`, () => {
    return is(
        //
        canJump([0]),
        //
        true,
    );
});

test(`官方例子`, () => {
    return is(
        //
        canJump([1]),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        canJump([2, 3, 1, 1, 4]),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        canJump([2, 5, 0, 0]),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        canJump([3, 2, 1, 0, 4]),
        //
        false,
    );
});
