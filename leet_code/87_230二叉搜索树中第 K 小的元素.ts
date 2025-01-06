import {test, is} from "./libs/unit-test";

/**
 * 230. 二叉搜索树中第 K 小的元素
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description
 *
 * 二叉搜索树
 * 左子树只包含小于当前结点的数
 * 右子树只包含大于当前结点的数
 * 所有左子树和右子树自身必须也是二叉搜索树
 *
 * 平衡二叉搜索树AVL树
 * 每个结点的左子树和右子树的高度最多相差 1
 * 所有左子树和右子树自身必须也是平衡二叉搜索树
 * 一棵存有 n 个结点的平衡二叉搜索树的高度是 O(logn)
 *
 * @description
 * 输入 root = [3,1,4,null,2], k = 1
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

let kthSmallest: (root: TreeNode | null, k: number) => number;

/**
 * 中序遍历 + 二叉搜索树特点
 *
 * @description
 * 时间复杂度 O(H+k)
 * 空间复杂度 O(H)
 */
kthSmallest = (root: TreeNode | null, k: number): number => {
    const stack = [];

    let curNode = root;

    while (curNode !== null || stack.length > 0) {
        // 根据二叉搜索树找到最左(小)节点
        while (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        }

        curNode = stack.pop();
        k--;

        if (k === 0) {
            break;
        }

        curNode = curNode.right;
    }

    return curNode.val;
};

/**
 * 记录子树的结点数 + 哈希表
 *
 * @description
 * 时间复杂度 O(N)
 * 空间复杂度 O(N)
 */
kthSmallest = (root: TreeNode | null, k: number): number => {};

/**
 * 平衡二叉搜索树
 *
 * @description
 * 时间复杂度 O(N)
 * 空间复杂度 O(N)
 */
kthSmallest = (root: TreeNode | null, k: number): number => {};
