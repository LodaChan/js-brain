import {test, is} from "./libs/unit-test";

/**
 * 104. 二叉树的最大深度
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/description
 *
 *
 * @description
 * 输入 root = [3,9,20,null,null,15,7]
 * 输出 3
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

let maxDepth: (root: TreeNode | null) => number;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(h)
 */
maxDepth = (root: TreeNode | null): number => {
    if (root === null) {
        return 0;
    }
    //
    else {
        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);

        return Math.max(leftDepth, rightDepth) + 1;
    }
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
maxDepth = (root: TreeNode | null): number => {
    if (root === null) {
        return 0;
    }

    const queue: TreeNode[] = [root];

    let depth = 0;

    while (queue.length > 0) {
        let levelSize = queue.length;

        while (levelSize > 0) {
            const curNode = queue.shift()!;

            if (curNode.left) {
                queue.push(curNode.left);
            }

            if (curNode.right) {
                queue.push(curNode.right);
            }

            levelSize--;
        }

        depth++;
    }

    return depth;
};
