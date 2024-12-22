import {test, is} from "./libs/unit-test";

/**
 * 57. 插入区间
 * https://leetcode.cn/problems/insert-interval/description
 *
 *
 * @description
 * 输入 intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出 [[1,5],[6,9]]
 */
let insert: (intervals: number[][], newInterval: number[]) => number[][];

/**
 * 单一方向(后加) + 区间(交集并集)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
insert = (intervals: number[][], newInterval: number[]): number[][] => {
    let L = newInterval[0];
    let R = newInterval[1];
    let isAlreadyInserted = false;

    const cloneIntervals = [];

    for (const interval of intervals) {
        // newInterval 在 interval 右侧且无交集
        if (interval[0] > R) {
            if (isAlreadyInserted === false) {
                cloneIntervals.push([L, R]);
                isAlreadyInserted = true;
            }

            cloneIntervals.push(interval);
        }
        // newInterval 在 interval 左侧且无交集
        else if (interval[1] < L) {
            cloneIntervals.push(interval);
        }
        // newInterval 与 interval 有交集，计算并集
        else {
            L = Math.min(L, interval[0]);
            R = Math.max(R, interval[1]);
        }
    }

    if (isAlreadyInserted === false) {
        cloneIntervals.push([L, R]);
    }

    const output = new Array(cloneIntervals.length).fill([0, 0]);
    for (let index = 0; index < cloneIntervals.length; index++) {
        output[index] = cloneIntervals[index];
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        insert(
            [
                [1, 3],
                [6, 9],
            ],
            [2, 5],
        ),
        //
        [
            [1, 5],
            [6, 9],
        ],
    );
});
