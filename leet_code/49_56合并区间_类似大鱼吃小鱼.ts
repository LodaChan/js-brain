import {test, is} from "./libs/unit-test";

/**
 * 56. 合并区间
 * https://leetcode.cn/problems/merge-intervals/description
 *
 *
 * @description
 * 输入 intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出 [[1,6],[8,10],[15,18]]
 */
let merge: (intervals: number[][]) => number[][];

/**
 * 排序(类似大鱼吃小鱼) + 区间
 *
 * @description
 * 时间复杂度 O(n * logn)
 * 空间复杂度 O(logn)
 */
merge = (intervals: number[][]): number[][] => {
    if (intervals.length === 0) {
        return [];
    }

    intervals.sort((a: number[], b: number[]) => a[0] - b[0]);

    const output = [];

    for (let index = 0; index < intervals.length; index++) {
        const [L, R] = intervals[index];
        if (output.length === 0 || output[output.length - 1][1] < L) {
            output.push([L, R]);
        } else {
            output[output.length - 1][1] = Math.max(output[output.length - 1][1], R);
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        merge([
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
        ]),
        //
        [
            [1, 6],
            [8, 10],
            [15, 18],
        ],
    );
});
