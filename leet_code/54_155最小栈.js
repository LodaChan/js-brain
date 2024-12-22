import {test, is} from "./libs/unit-test";

/**
 * 155. MinStack
 * https://leetcode.cn/problems/min-stack
 *
 * @description
 * 输入 ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"] 和 [[], [-2], [0], [-3], [], [], [], []]
 * 输出 [null, null, null, null, -3, null, 0, -2]
 */

/**
 * 单调栈
 * 时间复杂度 O(1)
 * 空间复杂度 O(n)
 */
var MinStack = function () {
    this.stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function (x) {
    this.stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function () {
    this.stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
    return this.min_stack[this.min_stack.length - 1];
};
