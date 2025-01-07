import {test, is} from "./libs/unit-test";

/**
 * 103. 二叉树的锯齿形层序遍历
 * https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description
 *
 * @description
 * 输入 root = [3,9,20,null,null,15,7]
 * 输出 [[3],[20,9],[15,7]]
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

let zigzagLevelOrder: (root: TreeNode | null) => number[][];

/**
 * 广度优先 + 双端队列
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
zigzagLevelOrder = (root: TreeNode | null): number[][] => {
    let output: number[][] = [];

    if (!root) {
        return (output = []);
    }

    const queue = [root];

    let isOrderLeftFlag = true;

    while (queue.length > 0) {
        let levelValues = [];

        const curLevelSize = queue.length;

        for (let index = 0; index < curLevelSize; ++index) {
            const curNode = queue.shift();

            if (isOrderLeftFlag === true) {
                levelValues.push(curNode.val);
            }
            //
            else {
                levelValues.unshift(curNode.val);
            }

            if (curNode.left) {
                queue.push(curNode.left);
            }
            if (curNode.right) {
                queue.push(curNode.right);
            }
        }

        output.push(levelValues);

        // 如果从左至右 每次将被遍历到的元素插入至双端队列的末尾
        // 如果从右至左 每次将被遍历到的元素插入至双端队列的头部
        isOrderLeftFlag = !isOrderLeftFlag;
    }

    return output;
};
