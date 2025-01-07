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
 * @description
 * 输入 root = [2,1,3]
 * 输出 true
 *
 * 输入 root = [5,1,4,null,null,3,6]
 * 输出 false
 * 根节点的值是 5 , 但是右子节点的值是 4
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

let isValidBST: (root: TreeNode | null) => boolean;

/**
 * 递归
 *
 * @description
 * 时间复杂度 O(H+k)
 * 空间复杂度 O(H)
 */
isValidBST = (root: TreeNode | null): boolean => {
    const _helperFunc = (curNode: TreeNode | null, lower: number, upper: number) => {
        if (curNode === null) {
            return true;
        }

        if (curNode.val <= lower || curNode.val >= upper) {
            return false;
        }

        return _helperFunc(curNode.left, lower, curNode.val) && _helperFunc(curNode.right, curNode.val, upper);
    };

    return _helperFunc(root, -Infinity, Infinity);
};

/**
 * 深度优先(中序)
 *
 * @description
 * 时间复杂度 O(H+k)
 * 空间复杂度 O(H)
 */
isValidBST = (root: TreeNode | null): boolean => {
    let output = false;

    let stack = [];
    let inorderVal = -Infinity;

    let curNode = root;

    while (stack.length > 0 || curNode !== null) {
        while (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        }

        curNode = stack.pop();

        if (curNode.val <= inorderVal) {
            return (output = false);
        }

        inorderVal = curNode.val;
        curNode = curNode.right;
    }

    return (output = true);
};
