import {test, is} from "./libs/unit-test";

/**
 * 226. 翻转二叉树
 * https://leetcode.cn/problems/invert-binary-tree/description
 *
 *
 * @description
 * 输入 root = [2,1,3]
 * 输出 [2,3,1]
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

let invertTree: (root: TreeNode | null) => TreeNode | null;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
invertTree = (root: TreeNode | null): TreeNode | null => {
    if (root === null) {
        return null;
    }

    const left = invertTree(root.left);
    const right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
};
