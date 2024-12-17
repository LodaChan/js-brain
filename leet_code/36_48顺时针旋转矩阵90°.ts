import {test, is} from "./libs/unit-test";

/**
 * 48. 顺时针旋转矩阵90°
 * https://leetcode.cn/problems/rotate-image/description
 *
 * @description
 * 输入 matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出 [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 */
let rotate: (matrix: number[][]) => void;

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(n^2)
 */
rotate = (matrix: number[][]) => {
    const rowCount = matrix.length;
    const newMatrix = new Array(rowCount).fill(0).map(() => new Array(rowCount).fill(0));

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < rowCount; columnIndex++) {
            newMatrix[columnIndex][rowCount - rowIndex - 1] = matrix[rowIndex][columnIndex];
        }
    }

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < rowCount; columnIndex++) {
            matrix[rowIndex][columnIndex] = newMatrix[rowIndex][columnIndex];
        }
    }
};

/**
 * 原地旋转
 *
 * @description
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 */
rotate = (matrix: number[][]) => {
    const n = matrix.length;

    for (let rowIndex = 0; rowIndex < Math.floor(n / 2); rowIndex++) {
        for (let columnIndex = 0; columnIndex < Math.floor((n + 1) / 2); columnIndex++) {
            const temp = matrix[rowIndex][columnIndex];

            // 逆时针赋值替换
            matrix[rowIndex][columnIndex] = matrix[n - columnIndex - 1][rowIndex];
            matrix[n - columnIndex - 1][rowIndex] = matrix[n - rowIndex - 1][n - columnIndex - 1];
            matrix[n - rowIndex - 1][n - columnIndex - 1] = matrix[columnIndex][n - rowIndex - 1];
            matrix[columnIndex][n - rowIndex - 1] = temp;
        }
    }
};

/**
 * 水平翻转 + 对角线翻转 = 顺时针旋转90°
 *
 * @description
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 */
rotate = (matrix: number[][]) => {
    const rowCount = matrix.length;

    // 水平翻转
    for (let rowIndex = 0; rowIndex < Math.floor(rowCount / 2); rowIndex++) {
        for (let columnIndex = 0; columnIndex < rowCount; columnIndex++) {
            [matrix[rowIndex][columnIndex], matrix[rowCount - rowIndex - 1][columnIndex]] = [matrix[rowCount - rowIndex - 1][columnIndex], matrix[rowIndex][columnIndex]];
        }
    }

    // 对角线翻转
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < rowIndex; columnIndex++) {
            [matrix[rowIndex][columnIndex], matrix[columnIndex][rowIndex]] = [matrix[columnIndex][rowIndex], matrix[rowIndex][columnIndex]];
        }
    }
};

test(`官方例子`, () => {
    return is(
        rotate([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]),
        //
        [1, 2, 3, 6, 9, 8, 7, 4, 5],
    );
});
test(`官方例子`, () => {
    return is(
        rotate([
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
        ]),
        //
        [
            [15, 13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7, 10, 11],
        ],
    );
});
