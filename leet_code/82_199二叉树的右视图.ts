import {test, is} from "./libs/unit-test";

/**
 * 199. 二叉树的右视图
 * https://leetcode.cn/problems/binary-tree-right-side-view/description
 *
 * @description
 * 输入 root = [1,2,3,null,5,null,4]
 * 输出 [1,3,4]
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

let rightSideView: (root: TreeNode | null) => number[];

/**
 * 深度优先搜索 + 双存储栈 + 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
rightSideView = (root: TreeNode | null): number[] => {
    const depthRightValueHashMap: Map<number, number> = new Map();

    const stack: TreeNode[] = [];
    const depthStack: number[] = [];
    let maxDepth: number = -1;

    if (root) {
        stack.push(root);
        depthStack.push(0);
    }

    while (stack.length > 0) {
        const curNode = stack.pop();
        const curDepth = depthStack.pop()!;

        if (curNode) {
            maxDepth = Math.max(maxDepth, curDepth);

            if (depthRightValueHashMap.has(curDepth) === false) {
                depthRightValueHashMap.set(curDepth, curNode.val);
            }

            stack.push(curNode.left);
            stack.push(curNode.right);

            depthStack.push(curDepth + 1);
            depthStack.push(curDepth + 1);
        }
    }

    const output = [];
    for (let depth = 0; depth <= maxDepth; depth++) {
        output.push(depthRightValueHashMap.get(depth));
    }
    return output;
};

/**
 * 广度优先搜索 + 双存储队列 + 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
rightSideView = (root: TreeNode | null): number[] => {
    const depthRightValueHashMap: Map<number, number> = new Map();

    const queue: TreeNode[] = [];
    const depthQueue: number[] = [];
    let maxDepth: number = -1;

    if (root) {
        queue.push(root);
        depthQueue.push(0);
    }

    while (queue.length > 0) {
        const curNode = queue.shift();
        const curDepth = depthQueue.shift()!;

        if (curNode) {
            maxDepth = Math.max(maxDepth, curDepth);

            depthRightValueHashMap.set(curDepth, curNode.val);

            if (curNode.left) {
                queue.push(curNode.left);
                depthQueue.push(curDepth + 1);
            }

            if (curNode.right) {
                queue.push(curNode.right);
                depthQueue.push(curDepth + 1);
            }
        }
    }

    const output = [];
    for (let depth = 0; depth <= maxDepth; depth++) {
        output.push(depthRightValueHashMap.get(depth));
    }
    return output;
};
