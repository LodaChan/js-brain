import {test, is} from "./libs/unit-test";

/**
 * 58. 最后一个单词的长度
 * https://leetcode.cn/problems/length-of-last-word/description
 *
 * @description
 * 输入 "   fly me   to   the moon  "
 * 输出  4
 */
let lengthOfLastWord: (inputStr: string) => number;

/**
 * 反向遍历
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
lengthOfLastWord = (inputStr: string): number => {
    let index = inputStr.length - 1;

    while (inputStr[index] === " ") {
        index--;
    }

    let output = 0;
    while (index >= 0 && inputStr[index] !== " ") {
        output++;
        index--;
    }

    return output;
};
test(`官方例子`, () => {
    return is(
        //
        lengthOfLastWord("a"),
        //
        1,
    );
});
test(`官方例子`, () => {
    return is(
        //
        lengthOfLastWord("Hello World"),
        //
        5,
    );
});
test(`官方例子`, () => {
    return is(
        //
        lengthOfLastWord("   fly me   to   the moon  "),
        //
        4,
    );
});
test(`官方例子`, () => {
    return is(
        //
        lengthOfLastWord("luffy is still joyboy"),
        //
        6,
    );
});
