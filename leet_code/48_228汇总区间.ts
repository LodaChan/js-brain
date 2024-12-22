import {test, is} from "./libs/unit-test";

/**
 * 228. 汇总区间
 * https://leetcode.cn/problems/summary-ranges/description
 *
 *
 * @description
 * 输入 [0,1,2,4,5,7]
 * 输出 ["0->2","4->5","7"]
 */
let summaryRanges: (nums: number[]) => string[];

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
summaryRanges = (nums: number[]): string[] => {
    let output = [];

    const numSet = new Set();

    for (let num of nums) {
        numSet.add(num);
    }

    for (let num of nums) {
        if (numSet.has(num) === true) {
            let min = num;
            let max = num;

            while (numSet.has(min - 1) === true) {
                numSet.delete(min - 1);
                min--;
            }

            while (numSet.has(max + 1) === true) {
                numSet.delete(max + 1);
                max++;
            }

            if (min !== max) {
                output.push(`${min}->${max}`);
            } else {
                output.push(`${num}`);
            }
        }
    }

    return output;
};

/**
 * 区间
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
summaryRanges = (nums: number[]): string[] => {
    const output = [];
    let index = 0;

    while (index < nums.length) {
        const lowIndex = index;
        index++;

        while (index < nums.length && nums[index] === nums[index - 1] + 1) {
            index++;
        }

        // 有递增 则 递增
        // 无递增 则 回溯
        const highIndex = index - 1;
        const temp = ["" + nums[lowIndex]];
        if (lowIndex < highIndex) {
            temp.push("->");
            temp.push("" + nums[highIndex]);
        }

        output.push(temp.join(""));
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        summaryRanges([0, 1, 2, 4, 5, 7]),
        // [0,2] --> "0->2"
        // [4,5] --> "4->5"
        // [7,7] --> "7"
        ["0->2", "4->5", "7"],
    );
});
