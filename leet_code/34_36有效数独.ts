import {test, is} from "./libs/unit-test";

/**
 * 36. 有效数独
 * https://leetcode.cn/problems/valid-sudoku/description
 *
 * @description
 * 输入 board =
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * 输出 true
 */
let isValidSudoku: (board: string[][]) => boolean;

/**
 * 行转数组 + 列转数组 + 小矩阵转数组 + charCode 实现一次遍历
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(1)
 */
isValidSudoku = (board: string[][]): boolean => {
    let output = false;

    const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
            const curNum = board[rowIndex][columnIndex];

            if (curNum !== ".") {
                // 利用 charCode 之差 解决
                const curNumIndex = curNum.charCodeAt(0) - "0".charCodeAt(0) - 1;

                rows[rowIndex][curNumIndex]++;

                columns[columnIndex][curNumIndex]++;

                subboxes[Math.floor(rowIndex / 3)][Math.floor(columnIndex / 3)][curNumIndex]++;

                // 遍历了 rowIndex 后马上进行  行重复检查 列重复检查 3X3子矩阵重复
                if (rows[rowIndex][curNumIndex] > 1 || columns[columnIndex][curNumIndex] > 1 || subboxes[Math.floor(rowIndex / 3)][Math.floor(columnIndex / 3)][curNumIndex] > 1) {
                    return (output = false);
                }
            }
        }
    }

    return (output = true);
};

test(`官方例子`, () => {
    return is(
        isValidSudoku([
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ]),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        isValidSudoku([
            ["8", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ]),
        //
        false,
    );
});
