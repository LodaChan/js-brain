import {test, is} from "./libs/unit-test";

/**
 * 129. 求根节点到叶节点拼接数字之和
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/description
 *
 * @description
 * 输入 root = [1,2,3]
 * 输出 25
 * 从根到叶子节点路径 1->2 代表数字 12
 * 从根到叶子节点路径 1->3 代表数字 13
 * 因此数字总和 = 12 + 13 = 25
 *
 * 输入 root = [4,9,0,5,1]
 * 输出 1026
 * 从根到叶子节点路径 4->9->5 代表数字 495
 * 从根到叶子节点路径 4->9->1 代表数字 491
 * 从根到叶子节点路径 4->0 代表数字 40
 * 因此数字总和 = 495 + 491 + 40 = 1026
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

let sumNumbers: (root: TreeNode | null) => number;

/**
 * 深度优先搜索(递归)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
sumNumbers = (root: TreeNode | null): number => {
    const _DFSFunc = (root: TreeNode | null, prevSum: number) => {
        if (root === null) {
            return 0;
        }

        const sum = prevSum * 10 + root.val;

        if (root.left == null && root.right == null) {
            return sum;
        }
        //
        else {
            return _DFSFunc(root.left, sum) + _DFSFunc(root.right, sum);
        }
    };

    return _DFSFunc(root, 0);
};
/**
 * 广度优先搜索(队列)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
sumNumbers = (root: TreeNode | null): number => {
    if (root === null) {
        return 0;
    }

    let sum = 0;
    const nodeQueue = [];
    const numQueue = [];

    nodeQueue.push(root);
    numQueue.push(root.val);

    while (nodeQueue.length > 0) {
        const node = nodeQueue.shift();
        const num = numQueue.shift();

        const left = node.left,
            right = node.right;

        if (left === null && right === null) {
            sum += num;
        }
        //
        else {
            if (left !== null) {
                nodeQueue.push(left);
                numQueue.push(num * 10 + left.val);
            }
            if (right !== null) {
                nodeQueue.push(right);
                numQueue.push(num * 10 + right.val);
            }
        }
    }

    return sum;
};
