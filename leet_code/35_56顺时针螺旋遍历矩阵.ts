import {test, is} from "./libs/unit-test";

/**
 * 56. 顺时针螺旋遍历矩阵
 * https://leetcode.cn/problems/spiral-matrix/description
 *
 * @description
 * 输入 matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出 [1,2,3,6,9,8,7,4,5]
 */
let spiralOrder: (matrix: number[][]) => number[];

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(m * n)
 */
spiralOrder = (matrix: number[][]): number[] => {
    let output = [];

    if (!matrix.length || !matrix[0].length) {
        return (output = []);
    }

    const rows = matrix.length,
        columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
    const total = rows * columns;
    output = new Array(total).fill(0);

    let rowIndex = 0;
    let columnIndex = 0;
    let directionIndex = 0;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    for (let index = 0; index < total; index++) {
        output[index] = matrix[rowIndex][columnIndex];

        visited[rowIndex][columnIndex] = true;

        const nextRow = rowIndex + directions[directionIndex][0],
            nextColumn = columnIndex + directions[directionIndex][1];

        // 根据求余来确定下1个方向
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && visited[nextRow][nextColumn] === false)) {
            directionIndex = (directionIndex + 1) % 4;
        }

        rowIndex += directions[directionIndex][0];
        columnIndex += directions[directionIndex][1];
    }

    return output;
};

/**
 * 圈层 + 模拟
 *
 * @description
 * 时间复杂度 O(m * n)
 * 空间复杂度 O(1)
 */
spiralOrder = (matrix: number[][]): number[] => {
    let output = [];

    if (!matrix.length || !matrix[0].length) {
        return (output = []);
    }

    const rows = matrix.length,
        columns = matrix[0].length;

    let left = 0,
        right = columns - 1,
        top = 0,
        bottom = rows - 1;

    while (left <= right && top <= bottom) {
        // 上
        for (let column = left; column <= right; column++) {
            output.push(matrix[top][column]);
        }

        // 右
        for (let row = top + 1; row <= bottom; row++) {
            output.push(matrix[row][right]);
        }

        if (left < right && top < bottom) {
            // 下
            for (let column = right - 1; column > left; column--) {
                output.push(matrix[bottom][column]);
            }

            // 左
            for (let row = bottom; row > top; row--) {
                output.push(matrix[row][left]);
            }
        }

        // 模拟缩圈
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        spiralOrder([
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
        spiralOrder([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
        ]),
        //
        [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
    );
});
