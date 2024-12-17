import {test, is} from "./libs/unit-test";

/**
 * 73. 矩阵置零
 * https://leetcode.cn/problems/set-matrix-zeroes/description
 *
 * 如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0
 * @description
 * 输入 matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出 [[1,0,1],[0,0,0],[1,0,1]]
 */
let setZeroes: (matrix: number[][]) => void;

/**
 * 标记行数组 + 标记列数组
 *
 * @description
 * 时间复杂度 O(rowCount * columnCount)
 * 空间复杂度 O(rowCount + columnCount)
 */
setZeroes = (matrix: number[][]) => {
    const rowCount = matrix.length,
        columnCount = matrix[0].length;
    const rowFlag = new Array(rowCount).fill(false);
    const columnFlag = new Array(columnCount).fill(false);

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            if (matrix[rowIndex][columnIndex] === 0) {
                rowFlag[rowIndex] = columnFlag[columnIndex] = true;
            }
        }
    }

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            if (rowFlag[rowIndex] || columnFlag[columnIndex]) {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }
};

/**
 * 第1行 和 第1列 = 标记行数组 + 标记列数组
 *
 * @description
 * 时间复杂度 O(rowCount * columnCount)
 * 空间复杂度 O(1)
 */
setZeroes = (matrix: number[][]) => {
    const rowCount = matrix.length,
        columnCount = matrix[0].length;
    let flag_col_zero = false,
        flag_row_zero = false;

    // 第1列
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        if (matrix[rowIndex][0] === 0) {
            flag_col_zero = true;
        }
    }
    // 第1行
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        if (matrix[0][columnIndex] === 0) {
            flag_row_zero = true;
        }
    }

    // 将零转移到 第1列 与 第1行
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 1; columnIndex < columnCount; columnIndex++) {
            if (matrix[rowIndex][columnIndex] === 0) {
                matrix[rowIndex][0] = matrix[0][columnIndex] = 0;
            }
        }
    }

    // 对角线类比行列置零
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 1; columnIndex < columnCount; columnIndex++) {
            if (matrix[rowIndex][0] === 0 || matrix[0][columnIndex] === 0) {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }

    // 如果第1列有0全部置零
    if (flag_col_zero) {
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            matrix[rowIndex][0] = 0;
        }
    }

    // 如果第1行有0全部置零
    if (flag_row_zero) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            matrix[0][columnIndex] = 0;
        }
    }
};

test(`官方例子`, () => {
    return is(
        setZeroes([
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
        ]),
        //
        [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1],
        ],
    );
});
