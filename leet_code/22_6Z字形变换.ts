import {test, is} from "./libs/unit-test";

/**
 * 6. Z字形变换
 * https://leetcode.cn/problems/zigzag-conversion/description
 *
 * @description
 * 输入 s = "PAYPALISHIRING", numRows = 3
 * 输出 "PAHNAPLSIIGYIR"
 */
let convert: (str: string, numRows: number) => string;

/**
 * 压缩矩阵空间
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
convert = (str: string, numRows: number): string => {
    if (numRows === 1 || numRows >= str.length) {
        return str;
    }

    const dt = numRows * 2 - 2;
    const matrix = new Array(numRows).fill("");

    for (let charIndex = 0, rowIndex = 0; charIndex < str.length; charIndex++) {
        matrix[rowIndex] += str[charIndex];

        // 向下移动
        if (charIndex % dt < numRows - 1) {
            rowIndex++;
        }
        // 向右上移动
        else {
            rowIndex--;
        }
    }

    return matrix.join("");
};

/**
 * 直接构建
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
convert = (str: string, numRows: number): string => {
    if (numRows === 1 || numRows >= str.length) {
        return str;
    }

    const output = [];

    const dt = numRows * 2 - 2;

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        for (let charIndex = 0; charIndex < str.length - rowIndex; charIndex += dt) {
            // 向下移动
            output.push(str[charIndex + rowIndex]);

            // 因为Z型排列,所以不是首行和不是最后一行的同一行,补全还有1个字符需要补全到右侧
            // 反推 anotherCharIndexOfSameRow = (charIndex + dt) - rowIndex 得到
            if (0 < rowIndex && rowIndex < numRows - 1 && charIndex + dt - rowIndex < str.length) {
                let anotherCharIndexOfSameRow = charIndex + dt - rowIndex;
                output.push(str[anotherCharIndexOfSameRow]);
            }
        }

        console.log(rowIndex, output);
    }

    return output.join("");
};

test(`官方例子`, () => {
    return is(
        //
        convert("PAYPALISHIRING", 3),
        //
        "PAHNAPLSIIGYIR",
        // P   A   H   N
        // A P L S I I G
        // Y   I   R
    );
});
test(`官方例子`, () => {
    return is(
        //
        convert("PAYPALISHIRING", 4),
        //
        "PINALSIGYAHRPI",
        // P     I    N
        // A   L S  I G
        // Y A   H R
        // P     I
    );
});
test(`官方例子`, () => {
    return is(
        //
        convert("A", 1),
        //
        "A",
    );
});
