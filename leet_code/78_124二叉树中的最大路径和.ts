import {test, is} from "./libs/unit-test";

/**
 * 124. 二叉树中的最大路径和
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/description
 *
 * @description
 * 输入 root = [1,2,3]
 * 输出 6
 * 最优路径是 2 -> 1 -> 3 路径和为 2 + 1 + 3 = 6
 *
 * 输入 root = [-10,9,20,null,null,15,7]
 * 输出 42
 * 最优路径是 15 -> 20 -> 7 路径和为 15 + 20 + 7 = 42
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

let maxPathSum: (root: TreeNode | null) => number;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
maxPathSum = (root: TreeNode | null): number => {
    let output = Number.MIN_SAFE_INTEGER;

    const _DFSFunc = (cur: TreeNode | null): number => {
        if (cur === null) {
            return 0;
        }

        let leftVal = Math.max(0, _DFSFunc(cur.left));
        let rightVal = Math.max(0, _DFSFunc(cur.right));

        let pathVal = leftVal + cur.val + rightVal;

        output = Math.max(output, pathVal);

        return cur.val + Math.max(leftVal, rightVal);
    };

    _DFSFunc(root);

    return output;
};
