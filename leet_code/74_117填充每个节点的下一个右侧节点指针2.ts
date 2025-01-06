import {test, is} from "./libs/unit-test";

/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 * https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/description
 *
 *
 * @description
 * 输入 root = [1,2,3,4,5,null,7]
 * 输出 [1,#,2,3,#,4,5,7,#]
 */

class _Node {
    val: number;
    left: _Node | null;
    right: _Node | null;
    next: _Node | null;

    constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.next = next === undefined ? null : next;
    }
}

let connect: (root: _Node | null) => _Node | null;

/**
 * 层次遍历
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
connect = (root: _Node | null): _Node | null => {
    if (root === null) {
        return null;
    }

    const queue = [root];

    while (queue.length > 0) {
        const n = queue.length;

        let last = null;
        for (let index = 1; index <= n; index++) {
            let f = queue.shift();
            if (f.left !== null) {
                queue.push(f.left);
            }
            if (f.right !== null) {
                queue.push(f.right);
            }
            if (index !== 1) {
                last.next = f;
            }
            last = f;
        }
    }

    return root;
};

/**
 * 复用next指针
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
// let last = null,
//     nextStart = null;
// const handle = (p) => {
//     if (last !== null) {
//         last.next = p;
//     }
//     if (nextStart === null) {
//         nextStart = p;
//     }
//     last = p;
// };
// var connect = function (root) {
//     if (root === null) {
//         return null;
//     }
//     let start = root;
//     while (start != null) {
//         last = null;
//         nextStart = null;
//         for (let p = start; p !== null; p = p.next) {
//             if (p.left !== null) {
//                 handle(p.left);
//             }
//             if (p.right !== null) {
//                 handle(p.right);
//             }
//         }
//         start = nextStart;
//     }
//     return root;
// };
