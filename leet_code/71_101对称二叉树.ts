import {test, is} from "./libs/unit-test";

/**
 * 101. 对称二叉树
 * https://leetcode.cn/problems/symmetric-tree/description
 *
 * 是否轴对称
 *
 * @description
 * 输入 root = [1,2,2,3,4,4,3]
 * 输出 true
 *
 * 输入 root = [1,2,2,null,3,null,3]
 * 输出 false
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

let isSymmetric: (root: TreeNode | null) => boolean;

/**
 * 递归
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
isSymmetric = (root: TreeNode | null): boolean => {
    const _checkFunc = (p: TreeNode | null, q: TreeNode | null): boolean => {
        if (!p && !q) {
            return true;
        }

        if (!p || !q) {
            return false;
        }

        return p.val === q.val && _checkFunc(p.left, q.right) && _checkFunc(p.right, q.left);
    };

    return _checkFunc(root.left, root.right);
};

/**
 * 迭代
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
isSymmetric = (root: TreeNode | null): boolean => {
    const _checkFunc = (p: TreeNode | null, q: TreeNode | null): boolean => {
        const queue: (TreeNode | null)[] = [];
        queue.push(p);
        queue.push(q);

        while (queue.length > 0) {
            p = queue.shift()!;
            q = queue.shift()!;

            if (!p && !q) {
                continue;
            }

            if (!p || !q || p.val !== q.val) {
                return false;
            }

            queue.push(p.left);
            queue.push(q.right);

            queue.push(p.right);
            queue.push(q.left);
        }

        return true;
    };

    return _checkFunc(root.left, root.right);
};
