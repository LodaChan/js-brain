import {test, is} from "./libs/unit-test";

/**
 * 286. 生命游戏3X3细胞状态判定
 * https://leetcode.cn/problems/game-of-life/description
 *
 * @description
 * 输入 board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * 输出 [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 */
let gameOfLife: (board: number[][]) => void;

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(m * n)
 */
gameOfLife = (board: number[][]) => {
    /**
     * rowIndex时    中间 下面 上面
     * columnIndex时 中间 右边 左边
     */
    const neighborDirections = [0, 1, -1];
    const rowCount = board.length;
    const columnCount = board[0].length;

    const cloneBoard = new Array(rowCount).fill(0).map(() => new Array(columnCount).fill(0));
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            cloneBoard[rowIndex][columnIndex] = board[rowIndex][columnIndex];
        }
    }

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            let liveNeighborCount = 0;

            // 3X3网格遍历
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // 排除自己
                    if ((neighborDirections[i] === 0 && neighborDirections[j] === 0) === false) {
                        const neighborRowIndex = rowIndex + neighborDirections[i];
                        const neighborColumnIndex = columnIndex + neighborDirections[j];

                        // 边界限定 与 计数
                        if (
                            neighborRowIndex >= 0 &&
                            neighborRowIndex < rowCount &&
                            neighborColumnIndex >= 0 &&
                            neighborColumnIndex < columnCount &&
                            cloneBoard[neighborRowIndex][neighborColumnIndex] === 1
                        ) {
                            liveNeighborCount += 1;
                        }
                    }
                }
            }

            // 规则1或规则3
            if (cloneBoard[rowIndex][columnIndex] === 1 && (liveNeighborCount < 2 || liveNeighborCount > 3)) {
                board[rowIndex][columnIndex] = 0;
            }
            // 规则4
            if (cloneBoard[rowIndex][columnIndex] === 0 && liveNeighborCount === 3) {
                board[rowIndex][columnIndex] = 1;
            }
        }
    }
};

/**
 * 引入2个新状态标记
 *
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(1)
 */
gameOfLife = (board: number[][]) => {
    /**
     * rowIndex时    中间 下面 上面
     * columnIndex时 中间 右边 左边
     */
    const neighborDirections = [0, 1, -1];
    const rowCount = board.length;
    const columnCount = board[0].length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            let liveNeighborCount = 0;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // 排除自己
                    if ((neighborDirections[i] === 0 && neighborDirections[j] === 0) === false) {
                        const neighborRowIndex = rowIndex + neighborDirections[i];
                        const neighborColumnIndex = columnIndex + neighborDirections[j];

                        if (
                            neighborRowIndex >= 0 &&
                            neighborRowIndex < rowCount &&
                            neighborColumnIndex >= 0 &&
                            neighborColumnIndex < columnCount &&
                            // -1 代表这个细胞过去 是活的现在死了
                            // 2  代表这个细胞过去 是死的现在活了
                            // 基于老数据老状态就所以只需要处理 -1 和 1 , 2种情况
                            Math.abs(board[neighborRowIndex][neighborColumnIndex]) === 1
                        ) {
                            liveNeighborCount += 1;
                        }
                    }
                }
            }

            // 规则1或规则3
            if (board[rowIndex][columnIndex] === 1 && (liveNeighborCount < 2 || liveNeighborCount > 3)) {
                // -1 代表这个细胞过去 是活的现在死了
                board[rowIndex][columnIndex] = -1;
            }
            // 规则4
            if (board[rowIndex][columnIndex] === 0 && liveNeighborCount === 3) {
                // 2  代表这个细胞过去 是死的现在活了
                board[rowIndex][columnIndex] = 2;
            }
        }
    }

    // 更新状态
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            if (board[rowIndex][columnIndex] > 0) {
                board[rowIndex][columnIndex] = 1;
            } else {
                board[rowIndex][columnIndex] = 0;
            }
        }
    }
};

test(`官方例子`, () => {
    return is(
        gameOfLife([
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ]),
        //
        [
            [0, 0, 0],
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ],
    );
});
test(`官方例子`, () => {
    return is(
        gameOfLife([
            [1, 1],
            [1, 0],
        ]),
        //
        [
            [1, 1],
            [1, 1],
        ],
    );
});
