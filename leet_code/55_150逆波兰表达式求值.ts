import {test, is} from "./libs/unit-test";

/**
 * 150. 逆波兰表达式求值
 * https://leetcode.cn/problems/evaluate-reverse-polish-notation/description
 *
 * @description
 * 输入 tokens = ["2","1","+","3","*"]
 * 输出 9
 */
let evalRPN: (tokens: string[]) => number;

/**
 * 栈
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
evalRPN = (tokens: string[]): number => {
    const stack: number[] = [];

    const operatorFuncMap = new Map();
    operatorFuncMap.set("+", (a: number, b: number) => {
        return a + b;
    });
    operatorFuncMap.set("-", (a: number, b: number) => {
        return a - b;
    });
    operatorFuncMap.set("*", (a: number, b: number) => {
        return a * b;
    });
    operatorFuncMap.set("/", (a: number, b: number) => {
        return a / b > 0 ? Math.floor(a / b) : Math.ceil(a / b);
    });

    for (let token of tokens) {
        if (operatorFuncMap.has(token) === false) {
            stack.push(parseInt(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(operatorFuncMap.get(token)(a, b));
        }
    }

    return stack.pop();
};

test(`官方例子`, () => {
    return is(
        evalRPN(["2", "1", "+", "3", "*"]),
        // ((2 + 1) * 3) = 9
        9,
    );
});
test(`官方例子`, () => {
    return is(
        evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]),
        // ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
        // = ((10 * (6 / (12 * -11))) + 17) + 5
        // = ((10 * (6 / -132)) + 17) + 5
        // = ((10 * 0) + 17) + 5
        // = (0 + 17) + 5
        // = 17 + 5
        // = 22
        22,
    );
});
