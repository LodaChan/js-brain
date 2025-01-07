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

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    next: TreeNode | null;

    constructor(val?: number, left?: TreeNode, right?: TreeNode, next?: TreeNode) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.next = next === undefined ? null : next;
    }
}

let connect: (root: TreeNode | null) => TreeNode | null;

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
connect = (root: TreeNode | null): TreeNode | null => {
    if (root === null) {
        return null;
    }

    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        let lastNode = null;

        for (let index = 1; index <= levelSize; index++) {
            let f = queue.shift()!;

            if (f.left) {
                queue.push(f.left);
            }
            if (f.right) {
                queue.push(f.right);
            }

            if (index !== 1) {
                lastNode.next = f;
            }

            lastNode = f;
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

//     let startNode = root;

//     while (startNode != null) {
//         last = null;
//         nextStart = null;

//         for (let p = startNode; p !== null; p = p.next) {
//             if (p.left !== null) {
//                 handle(p.left);
//             }

//             if (p.right !== null) {
//                 handle(p.right);
//             }
//         }

//         startNode = nextStart;
//     }

//     return root;
// };
