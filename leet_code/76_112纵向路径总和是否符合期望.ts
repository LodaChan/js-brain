import {test, is} from "./libs/unit-test";

/**
 * 112. 纵向路径总和是否符合期望
 * https://leetcode.cn/problems/path-sum/description
 *
 * 最后1个节点left与right都是null
 *
 * @description
 * 输入 root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
 * 输出 true
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

let hasPathSum: (root: TreeNode | null, targetSum: number) => boolean;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
    if (root == null) {
        return false;
    }

    if (root.left === null && root.right === null) {
        return targetSum === root.val;
    }

    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
    let output = false;

    if (root === null) {
        return (output = false);
    }

    let queNode: TreeNode[] = [root];
    let queVal: number[] = [root.val];

    while (queNode.length > 0) {
        let curNode = queNode.shift()!;
        let curNodeVal = queVal.shift()!;

        if (curNode.left === null && curNode.right === null) {
            if (curNodeVal === targetSum) {
                return (output = true);
            }

            continue;
        }

        if (curNode.left !== null) {
            queNode.push(curNode.left);
            queVal.push(curNode.left.val + curNodeVal);
        }

        if (curNode.right !== null) {
            queNode.push(curNode.right);
            queVal.push(curNode.right.val + curNodeVal);
        }
    }

    return (output = false);
};
