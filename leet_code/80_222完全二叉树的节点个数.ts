import {test, is} from "./libs/unit-test";

/**
 * 222. 完全二叉树的节点个数
 * https://leetcode.cn/problems/count-complete-tree-nodes/description
 *
 * @description
 * 输入 root = [1,2,3,4,5,6]
 * 输出 6
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

let countNodes: (root: TreeNode | null) => number;

/**
 * 递归
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
countNodes = (root: TreeNode | null): number => {
    return root === null ? 0 : countNodes(root.left) + 1 + countNodes(root.right);
};

/**
 * 二分查找 + 位运算
 *
 * @description
 * 时间复杂度 O((log n)^2) 视为  O(h^2)
 * 空间复杂度 O(1)
 */
countNodes = (root: TreeNode | null): number => {
    const exists = (root: TreeNode | null, level: number, kIndex: number) => {
        let bits = 1 << (level - 1);

        let cur = root;

        while (cur !== null && bits > 0) {
            if (!(bits & kIndex)) {
                cur = cur.left;
            }
            //
            else {
                cur = cur.right;
            }

            bits >>= 1;
        }

        return cur !== null;
    };

    if (root === null) {
        return 0;
    }

    let cur = root;
    /**
     * 二叉树的层级 [0,1,...,h]
     */
    let level = 0;

    while (cur.left !== null) {
        level++;
        cur = cur.left;
    }

    let minCount = 1 << level,
        maxCount = (1 << (level + 1)) - 1;

    while (minCount < maxCount) {
        const midCount = Math.floor((maxCount - minCount + 1) / 2) + minCount;

        if (exists(root, level, midCount) === true) {
            minCount = midCount;
        }
        //
        else {
            maxCount = midCount - 1;
        }
    }

    return minCount;
};
