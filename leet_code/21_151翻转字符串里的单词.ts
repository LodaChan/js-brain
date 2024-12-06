import {test, is} from "./libs/unit-test";

/**
 * 151. 翻转字符串里的单词
 * https://leetcode.cn/problems/reverse-words-in-a-string/description
 *
 * @description
 * 输入 "  hello       world  "
 * 输出 "world hello"
 */
let reverseWords: (str: string) => string;

/**
 * 双端队列
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
reverseWords = (str: string): string => {
    let output: string[] = [];

    let Index = 0;
    let endIndex = str.length - 1;

    // [mk] 1 移除空格
    while (str[Index] === " ") {
        Index++;
    }
    while (str[endIndex] === " ") {
        endIndex--;
    }

    // [mk] 2
    let wordItem = "";
    while (Index <= endIndex) {
        // 空格,头插,重置
        if (str[Index] === " " && wordItem.length > 0) {
            output.splice(0, 0, wordItem);
            wordItem = "";
        }
        // 字符
        else if (str[Index] !== " ") {
            wordItem += str[Index];
        }

        Index++;
    }
    output.splice(0, 0, wordItem);

    return output.join(" ");
};

test(`官方例子`, () => {
    return is(
        //
        reverseWords("leetcode"),
        //
        "leetcode",
    );
});
test(`官方例子`, () => {
    return is(
        //
        reverseWords("the sky is blue"),
        //
        "blue is sky the",
    );
});
test(`官方例子`, () => {
    return is(
        //
        reverseWords(" hello  world "),
        //
        "world hello",
    );
});
test(`官方例子`, () => {
    return is(
        //
        reverseWords("a good  example"),
        //
        "example good a",
    );
});
