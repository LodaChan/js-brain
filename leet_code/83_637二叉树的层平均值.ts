import {test, is} from "./libs/unit-test";

/**
 * 637. 二叉树的层平均值
 * https://leetcode.cn/problems/average-of-levels-in-binary-tree/description
 *
 * @description
 * 输入 root = [3,9,20,null,null,15,7]
 * 输出 [3.00000,14.50000,11.00000]
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

let averageOfLevels: (root: TreeNode | null) => number[];

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
averageOfLevels = (root: TreeNode | null): number[] => {
    const _DFSFunc = (node: TreeNode | null, depth: number, refCounts: number[], refSums: number[]) => {
        if (node === null) {
            return;
        }

        if (depth < refSums.length) {
            refSums[depth] = refSums[depth] + node.val;
            refCounts[depth]++;
        }
        //
        else {
            refSums.push(node.val);
            refCounts.push(1);
        }

        _DFSFunc(node.left, depth + 1, refCounts, refSums);
        _DFSFunc(node.right, depth + 1, refCounts, refSums);
    };

    const counts = [];
    const sums = [];
    _DFSFunc(root, 0, counts, sums);

    const output = [];
    const depthCount = sums.length;
    for (let depth = 0; depth < depthCount; depth++) {
        output.push(sums[depth] / counts[depth]);
    }

    return output;
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
averageOfLevels = (root: TreeNode | null): number[] => {
    const output = [];

    const queue: TreeNode[] = [];
    if (root) {
        queue.push(root);
    }

    while (queue.length > 0) {
        let levelSum = 0;
        let levelSize = queue.length;

        for (let index = 0; index < levelSize; index++) {
            let curNode = queue.shift()!;

            levelSum += curNode.val;

            let leftNode = curNode.left,
                rightNode = curNode.right;

            if (leftNode) {
                queue.push(leftNode);
            }
            if (rightNode) {
                queue.push(rightNode);
            }
        }

        output.push(levelSum / levelSize);
    }

    return output;
};
