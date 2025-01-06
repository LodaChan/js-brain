import {test, is} from "./libs/unit-test";

/**
 * 102. 二叉树的层序遍历
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description
 *
 * @description
 * 输入 root = [3,9,20,null,null,15,7]
 * 输出 [[3],[9,20],[15,7]]
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

let levelOrder: (root: TreeNode | null) => number[][];

/**
 * 广度优先搜索(队列)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
levelOrder = (root: TreeNode | null): number[][] => {
    let output: number[][] = [];

    if (!root) {
        return (output = []);
    }

    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const curLevelSize = queue.length;

        output.push([]);

        for (let index = 1; index <= curLevelSize; ++index) {
            const curNode = queue.shift();

            output[output.length - 1].push(curNode.val);

            if (curNode.left) {
                queue.push(curNode.left);
            }

            if (curNode.right) {
                queue.push(curNode.right);
            }
        }
    }

    return output;
};
