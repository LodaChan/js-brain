import {test, is} from "./libs/unit-test";

/**
 * 452. 用最少数量的箭引爆全部气球
 * https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description
 *
 * 若有一个气球的直径的开始和结束坐标为 xstart xend 且满足  xstart ≤ x ≤ xend 则该气球会被引爆
 *
 * @description
 * 输入 points = [[10,16],[2,8],[1,6],[7,12]]
 * 输出 2
 */
let findMinArrowShots: (points: number[][]) => number;

/**
 * 排序 + 贪心
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
findMinArrowShots = (points: number[][]): number => {
    let output = 1;

    if (points.length === 0) {
        return (output = 0);
    }

    points.sort((a, b) => a[1] - b[1]);

    let lastBallPosition = points[0][1];
    for (let ball of points) {
        // 不是连续的区间
        if (ball[0] > lastBallPosition) {
            lastBallPosition = ball[1];
            output++;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        findMinArrowShots([
            [1, 6],
            [2, 8],
            [7, 12],
            [10, 16],
        ]),
        // 在x = 6处射出箭 击破气球[2,8]和[1,6]
        // 在x = 11处发射箭 击破气球[10,16]和[7,12]
        2,
    );
});
