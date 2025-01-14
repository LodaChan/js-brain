import {test, is} from "./libs/unit-test";

/**
 * 909. 蛇形棋
 * https://leetcode.cn/problems/snakes-and-ladders/description
 *
 * 原问题等价于在有向图上求出从 1 到 n^2 的最短路长度
 *
 * @description
 * 输入 board = [
 *                [-1,-1,-1,-1,-1,-1],
 *                [-1,-1,-1,-1,-1,-1],
 *                [-1,-1,-1,-1,-1,-1],
 *                [-1,35,-1,-1,13,-1],
 *                [-1,-1,-1,-1,-1,-1],
 *                [-1,15,-1,-1,-1,-1]
 *             ]
 * 输出 4
 * 首先 , 从方格 1 [第 5 行 , 第 0 列] 开始
 * 先决定移动到方格 2  , 并必须爬过梯子移动到到方格 15
 * 然后决定移动到方格 17 [第 3 行 , 第 4 列] , 必须爬过蛇到方格 13
 * 接着决定移动到方格 14  , 且必须通过梯子移动到方格 35
 * 最后决定移动到方格 36 , 游戏结束
 * 可以证明需要至少 4 次移动才能到达最后一个方格 , 所以答案是 4
 */

let snakesAndLadders: (board: number[][]) => number;

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(n^2)
 */
snakesAndLadders = (board: number[][]): number => {
    const id2rc = (id: number, n: number) => {
        let r = Math.floor((id - 1) / n),
            c = (id - 1) % n;
        if (r % 2 === 1) {
            c = n - 1 - c;
        }
        return [n - 1 - r, c];
    };

    let output = -1;

    const n = board.length;
    const visted = new Array(n * n + 1).fill(0);

    const queue = [
        [
            // 起点id
            1,
            // 移动次数
            0,
        ],
    ];

    while (queue.length > 0) {
        const p = queue.shift();

        for (let i = 1; i <= 6; ++i) {
            let nextId = p[0] + i;

            if (nextId > n * n) {
                // 超出边界
                break;
            }

            // 得到下一步的行列
            const rc = id2rc(nextId, n);

            // 存在蛇或梯子
            if (board[rc[0]][rc[1]] > 0) {
                nextId = board[rc[0]][rc[1]];
            }

            // 到达终点
            if (nextId === n * n) {
                return (output = p[1] + 1);
            }

            // 扩展新状态
            if (!visted[nextId]) {
                visted[nextId] = true;
                queue.push([nextId, p[1] + 1]);
            }
        }
    }

    return (output = -1);
};
