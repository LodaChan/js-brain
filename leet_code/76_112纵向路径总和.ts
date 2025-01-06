import {test, is} from "./libs/unit-test";

/**
 * 112. 纵向路径总和
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
 * 深度优先搜索(递归)
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
        return targetSum == root.val;
    }

    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

/**
 * 广度优先搜索(队列)
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

    let queNode: TreeNode[] = [];
    let queVal: number[] = [];

    queNode.push(root);
    queVal.push(root.val);

    while (queNode.length > 0) {
        let cur = queNode.shift()!;
        let temp = queVal.shift()!;

        if (cur.left === null && cur.right === null) {
            if (temp === targetSum) {
                return (output = true);
            }

            continue;
        }

        if (cur.left !== null) {
            queNode.push(cur.left);
            queVal.push(cur.left.val + temp);
        }

        if (cur.right !== null) {
            queNode.push(cur.right);
            queVal.push(cur.right.val + temp);
        }
    }

    return (output = false);
};
