import {test, is} from "./libs/unit-test";

/**
 * 530. 二叉搜索树的最小绝对差
 * https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description
 *
 * @description
 * 输入 root = [4,2,6,1,3]
 * 输出 1
 *
 * 输入 root = [1,0,48,null,null,12,49]
 * 输出 1
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

let getMinimumDifference: (root: TreeNode | null) => number;

/**
 * 深度优先(递归) + 中序
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
getMinimumDifference = (root: TreeNode | null): number => {
    let output = Number.MAX_SAFE_INTEGER,
        preVal = -1;

    const _DFSFunc = (curNode: TreeNode | null) => {
        if (curNode === null) {
            return;
        }

        _DFSFunc(curNode.left);

        if (preVal === -1) {
            preVal = curNode.val;
        }
        //
        else {
            output = Math.min(output, curNode.val - preVal);
            preVal = curNode.val;
        }

        _DFSFunc(curNode.right);
    };

    _DFSFunc(root);

    return output;
};
