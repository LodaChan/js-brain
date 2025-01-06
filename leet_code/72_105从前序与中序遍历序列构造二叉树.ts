import {test, is} from "./libs/unit-test";

/**
 * 105. 从前序与中序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description
 *
 * 构造二叉树并返回其根节点
 *
 * @description
 * 输入 preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出 [3,9,20,null,null,15,7]
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

let buildTree: (preorder: number[], inorder: number[]) => TreeNode | null;

/**
 * 递归
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
buildTree = (preorder: number[], inorder: number[]): TreeNode | null => {
    const indexHashMap: {[key: number]: number} = {};

    // 根据先序顺序构建index哈希表
    for (let index = 0; index < preorder.length; index++) {
        indexHashMap[inorder[index]] = index;
    }

    const _buildTreeFunc = (preorder: number[], inorder: number[], preorder_left: number, preorder_right: number, inorder_left: number, inorder_right: number): TreeNode | null => {
        if (preorder_left > preorder_right) {
            return null;
        }

        // 前序遍历确定root
        let preorder_root = preorder_left;
        // 中序遍历确定root
        let inorder_root = indexHashMap[preorder[preorder_root]];

        // 先把根节点建立出来
        let root = new TreeNode(preorder[preorder_root]);

        // 得到左子树中的节点数目
        let size_left_subtree = inorder_root - inorder_left;

        // 递归地构造左子树并连接到根节点
        // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
        root.left = _buildTreeFunc(preorder, inorder, preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1);

        // 递归地构造右子树并连接到根节点
        // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
        root.right = _buildTreeFunc(preorder, inorder, preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right);

        return root;
    };

    return _buildTreeFunc(preorder, inorder, 0, preorder.length - 1, 0, preorder.length - 1);
};

/**
 * 迭代
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
buildTree = (preorder: number[], inorder: number[]): TreeNode | null => {
    if (!preorder || preorder.length === 0) {
        return null;
    }

    let root = new TreeNode(preorder[0]);

    let stack = [];
    stack.push(root);

    let inorderIndex = 0;

    for (let index = 1; index < preorder.length; index++) {
        let preorderVal = preorder[index];

        let node = stack[stack.length - 1];

        // 左
        if (node.val !== inorder[inorderIndex]) {
            node.left = new TreeNode(preorderVal);
            stack.push(node.left);
        }
        // 右
        else {
            while (stack.length > 0 && stack[stack.length - 1].val === inorder[inorderIndex]) {
                node = stack.pop()!;
                inorderIndex++;
            }

            node.right = new TreeNode(preorderVal);

            stack.push(node.right);
        }
    }

    return root;
};
