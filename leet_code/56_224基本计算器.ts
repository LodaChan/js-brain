import {test, is} from "./libs/unit-test";

/**
 * 224. 本计算器
 * https://leetcode.cn/problems/basic-calculator/description
 *
 * s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
 *
 * @description
 * 输入 s = "(1+(4+5+2)-3)+(6+8)"
 * 输出 23
 */
let calculate: (s: string) => number;

/**
 * 栈(符号)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
calculate = (s: string): number => {
    const prefixSignStack = [1];

    /**
     * 数字前的符号标记
     */
    let prefixSign = 1;

    let output = 0;

    let index = 0;
    while (index < s.length) {
        if (s[index] === " ") {
            index++;
        }
        // +
        else if (s[index] === "+") {
            prefixSign = prefixSignStack[prefixSignStack.length - 1];
            index++;
        }
        // -
        else if (s[index] === "-") {
            prefixSign = -prefixSignStack[prefixSignStack.length - 1];
            index++;
        }
        // 左括号
        else if (s[index] === "(") {
            prefixSignStack.push(prefixSign);
            index++;
        }
        // 右括号
        else if (s[index] === ")") {
            prefixSignStack.pop();
            index++;
        }
        // 提取字符串的数字
        else {
            let num = 0;

            while (index < s.length && !isNaN(Number(s[index])) === true && s[index] !== " ") {
                num = num * 10 + s[index].charCodeAt(0) - "0".charCodeAt(0);
                index++;
            }

            output += prefixSign * num;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        calculate("(1+(4+5+2)-3)+(6+8)"),
        //
        23,
    );
});
