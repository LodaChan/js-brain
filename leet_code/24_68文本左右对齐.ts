import {test, is} from "./libs/unit-test";

/**
 * 68. 文本左右对齐
 * https://leetcode.cn/problems/text-justification/description
 *
 * @description
 * 输入 words = ["This", "is", "an", "example", "of", "text", "justification."]
 * 输出
 * [
 *  "This    is    an",
 *  "example  of text",
 *  "justification.  "
 * ]
 */
let fullJustify: (words: string[], lineMaxWidth: number) => string[];

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(m)
 * 空间复杂度 O(m)
 */
fullJustify = (words: string[], maxWidth: number): string[] => {
    const getBlankStrFunc = (emptySpaceCount: number) => {
        return new Array(emptySpaceCount).fill(" ").join("");
    };

    const output = [];
    let rightWordItemIndex = 0;

    while (true) {
        const leftWordItemIndex = rightWordItemIndex;
        /**
         * 行字母长度,不包括空格
         */
        let lineCharCount = 0;

        while (rightWordItemIndex < words.length && lineCharCount + words[rightWordItemIndex].length + rightWordItemIndex - leftWordItemIndex <= maxWidth) {
            lineCharCount += words[rightWordItemIndex].length;
            rightWordItemIndex++;
        }

        // 最后一行：单词左对齐 , 且单词之间应只有一个空格 , 在行末填充剩余空格
        if (rightWordItemIndex === words.length) {
            const s = words.slice(leftWordItemIndex).join(" ");
            output.push(s + getBlankStrFunc(maxWidth - s.length));
            break;
        }

        const lineWordsCount = rightWordItemIndex - leftWordItemIndex;
        const totalEmptySpaceCount = maxWidth - lineCharCount;

        // 只有一个单词：该单词左对齐 , 在行末填充空格
        if (lineWordsCount === 1) {
            output.push(words[leftWordItemIndex] + getBlankStrFunc(totalEmptySpaceCount));
            continue;
        }
        // 多个单词
        const avgEmptySpaceCount = Math.floor(totalEmptySpaceCount / (lineWordsCount - 1));
        const extraEmptySpaceCount = totalEmptySpaceCount % (lineWordsCount - 1);
        // 如果 extraEmptySpaceCount > 0 , 需要在单词1与单词2之间额外补1个空格
        const str1 = words.slice(leftWordItemIndex, leftWordItemIndex + extraEmptySpaceCount + 1).join(getBlankStrFunc(avgEmptySpaceCount + 1));
        const str2 = words.slice(leftWordItemIndex + extraEmptySpaceCount + 1, rightWordItemIndex).join(getBlankStrFunc(avgEmptySpaceCount));
        output.push(str1 + getBlankStrFunc(avgEmptySpaceCount) + str2);
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16),
        //  [
        //   "This    is    an",
        //   "example  of text",
        //   "justification.  "
        //  ]
        ["This    is    an", "example  of text", "justification.  "],
    );
});
test(`官方例子`, () => {
    return is(
        //
        fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16),
        // [
        //   "What   must   be",
        //   "acknowledgment  ",
        //   "shall be        "
        // ]
        ["What   must   be", "acknowledgment  ", "shall be        "],
    );
});
test(`官方例子`, () => {
    return is(
        //
        fullJustify(["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20),
        // [
        //   "Science  is  what we",
        //   "understand      well",
        //   "enough to explain to",
        //   "a  computer.  Art is",
        //   "everything  else  we",
        //   "do                  "
        // ]
        ["Science  is  what we", "understand      well", "enough to explain to", "a  computer.  Art is", "everything  else  we", "do                  "],
    );
});
