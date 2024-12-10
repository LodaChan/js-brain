import {test, is} from "./libs/unit-test";

/**
 * 15. 三数之和
 * https://leetcode.cn/problems/3sum/description
 *
 * @description
 * 输入 [-1, 0, 1, 2, -1, -4]
 * 输出 [ [-1, -1, 2], [-1, 0, 1] ]
 */
let threeSum: (nums: number[]) => [number, number, number][];

/**
 * 排序 + 双指针
 *
 * @description
 * 时间复杂度 O(N^2) N 是数组 nums 的长度
 * 空间复杂度 O(N) N 是数组 nums 的长度
 */
threeSum = (nums: number[]): [number, number, number][] => {
    nums.sort((a, b) => a - b);

    let output: [number, number, number][] = [];

    for (let first = 0; first < nums.length; first++) {
        if (first > 0 && nums[first] === nums[first - 1]) {
            continue;
        }

        let third = nums.length - 1;
        let target = -nums[first];

        for (let second = first + 1; second < nums.length; second++) {
            if (second > first + 1 && nums[second] == nums[second - 1]) {
                continue;
            }

            // 需要保证 b 的指针在 c 的指针的左侧
            while (second < third && nums[second] + nums[third] > target) {
                third--;
            }

            if (second == third) {
                break;
            }

            if (nums[second] + nums[third] == target) {
                output.push([nums[first], nums[second], nums[third]]);
            }
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        threeSum([-1, 0, 1, 2, -1, -4]),
        //
        [
            [-1, -1, 2],
            [-1, 0, 1],
        ],
    );
});
