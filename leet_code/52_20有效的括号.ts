import {test, is} from "./libs/unit-test";

/**
 * 20. 有效的括号
 * https://leetcode.cn/problems/valid-parentheses/description
 *
 * @description
 * 输入 s = "()[]{}"
 * 输出 true
 */
let isValid: (expression: string) => boolean;

/**
 * 单调栈
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n+∣Σ∣) ∣Σ∣是符号的字符集
 */
isValid = (expression: string): boolean => {
    let output = false;

    const symbolArr = expression.split("");

    // 不是偶数
    if (symbolArr.length % 2 > 0) {
        return (output = false);
    }

    const stack = [];

    const symbolMap = new Map([
        //
        ["(", ")"],
        //
        ["{", "}"],
        //
        ["[", "]"],
    ]);

    for (let index = 0; index < symbolArr.length; index++) {
        const currentSymbol = symbolArr[index];

        // 符号俩俩配对
        if (stack.length > 0 && symbolMap.get(stack[stack.length - 1]) === currentSymbol) {
            stack.pop();
        } else {
            stack.push(currentSymbol);
        }
    }

    return (output = stack.length === 0 ? true : false);
};

test(`官方例子`, () => {
    return is(
        isValid("()[]{}"),
        //
        true,
    );
});
