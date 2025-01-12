import {test, is} from "./libs/unit-test";

/**
 * 130. 被围绕的区域类似围棋吃子
 * https://leetcode.cn/problems/surrounded-regions/description
 *
 * "O" 构成的连续区域
 * 上下左右方向都有 "X" 围绕 , 将 "O" 构成的连续区域 变成 "X"
 *
 * @description
 * 输入 grid = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出 [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 */

let solve: (grid: string[][]) => void;

/**
 * 深度优先 + 新标记
 *
 * @description
 * 时间复杂度 O(N) , N = xCount * yCount
 * 空间复杂度 O(N) , N = xCount * yCount
 */
solve = (board: string[][]): void => {
    let yCount = board.length;
    if (yCount == 0) {
        return;
    }
    let xCount = board[0].length;

    const newStateLabel = "#";

    const _DFSFunc = (board: string[][], yIndex: number, xIndex: number) => {
        // 边界处理
        if (yIndex < 0 || yIndex >= yCount || xIndex < 0 || xIndex >= xCount) {
            return;
        }

        // 当遇到 遇到 不是"O" 就跳出不继续递归
        if (board[yIndex][xIndex] !== "O") {
            return;
        }

        board[yIndex][xIndex] = newStateLabel;

        // 上
        _DFSFunc(board, yIndex + 1, xIndex);
        // 下
        _DFSFunc(board, yIndex - 1, xIndex);
        // 右
        _DFSFunc(board, yIndex, xIndex + 1);
        // 左
        _DFSFunc(board, yIndex, xIndex - 1);
    };

    // 在4个边界上的"O"开始进行递归 - 左右边界
    for (let yIndex = 0; yIndex < yCount; yIndex++) {
        _DFSFunc(board, yIndex, 0);
        _DFSFunc(board, yIndex, xCount - 1);
    }
    // 在4个边界上的"O"开始进行递归 - 上下边界 避免重复的2个角
    for (let xIndex = 1; xIndex < xCount - 1; xIndex++) {
        _DFSFunc(board, 0, xIndex);
        _DFSFunc(board, yCount - 1, xIndex);
    }

    for (let yIndex = 0; yIndex < yCount; yIndex++) {
        for (let xIndex = 0; xIndex < xCount; xIndex++) {
            //  newStateLabel 变回 "O"
            if (board[yIndex][xIndex] == newStateLabel) {
                board[yIndex][xIndex] = "O";
            }
            // 上下左右方向都有 "X" 围绕 , 将 "O" 构成的连续区域 变成 "X"
            else if (board[yIndex][xIndex] == "O") {
                board[yIndex][xIndex] = "X";
            }
        }
    }
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(N) , N = xCount * yCount
 * 空间复杂度 O(N) , N = xCount * yCount
 */
solve = (board: string[][]): void => {
    let xIndexArr = [1, -1, 0, 0];
    let yIndexArr = [0, 0, 1, -1];

    let yCount = board.length;
    if (yCount === 0) {
        return;
    }
    let xCount = board[0].length;

    const newStateLabel = "#";

    let queue = [];

    for (let yIndex = 0; yIndex < yCount; yIndex++) {
        if (board[yIndex][0] === "O") {
            queue.push([yIndex, 0]);
            board[yIndex][0] = newStateLabel;
        }
        if (board[yIndex][xCount - 1] === "O") {
            queue.push([yIndex, xCount - 1]);
            board[yIndex][xCount - 1] = newStateLabel;
        }
    }
    for (let xIndex = 1; xIndex < xCount - 1; xIndex++) {
        if (board[0][xIndex] === "O") {
            queue.push([0, xIndex]);
            board[0][xIndex] = newStateLabel;
        }
        if (board[yCount - 1][xIndex] === "O") {
            queue.push([yCount - 1, xIndex]);
            board[yCount - 1][xIndex] = newStateLabel;
        }
    }

    while (queue.length > 0) {
        let cellXYIndex = queue.shift()!;

        let xIndexOffet = cellXYIndex[0],
            yIndexOffet = cellXYIndex[1];

        for (let offetIndex = 0; offetIndex < 4; offetIndex++) {
            let xIndex = xIndexOffet + xIndexArr[offetIndex],
                yIndex = yIndexOffet + yIndexArr[offetIndex];

            if (xIndex < 0 || yIndex < 0 || xIndex >= yCount || yIndex >= xCount || board[xIndex][yIndex] !== "O") {
                continue;
            }

            queue.push([xIndex, yIndex]);

            board[xIndex][yIndex] = newStateLabel;
        }
    }

    for (let yIndex = 0; yIndex < yCount; yIndex++) {
        for (let xIndex = 0; xIndex < xCount; xIndex++) {
            if (board[yIndex][xIndex] === newStateLabel) {
                board[yIndex][xIndex] = "O";
            }
            //
            else if (board[yIndex][xIndex] === "O") {
                board[yIndex][xIndex] = "X";
            }
        }
    }
};
