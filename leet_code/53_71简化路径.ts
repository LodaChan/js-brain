import {test, is} from "./libs/unit-test";

/**
 * 71. 简化路径
 * https://leetcode.cn/problems/simplify-path/description
 *
 * @description
 * 输入 path = "/home/user/Documents/../Pictures"
 * 输出 "/home/user/Pictures"
 */
let simplifyPath: (path: string) => string;

/**
 * 单调栈
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
simplifyPath = (path: string): string => {
    const arr = path.split("/");
    const stack = [];

    for (const item of arr) {
        if (item === "..") {
            if (stack.length > 0) {
                stack.pop();
            }
        } else if (item.length > 0 && item !== ".") {
            stack.push(item);
        }
    }

    return `/${stack.join("/")}`;
};

test(`官方例子`, () => {
    return is(
        simplifyPath("/home/user/Documents/../Pictures"),
        //
        "/home/user/Pictures",
    );
});
