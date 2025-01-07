import {test, is} from "./libs/unit-test";

/**
 * 106. 从中序与后序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description
 *
 * 构造二叉树并返回其根节点
 *
 * @description
 * 输入 inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
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

let buildTree: (inorder: number[], postorder: number[]) => TreeNode | null;

/**
 * 递归 + 先序哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
buildTree = (inorder: number[], postorder: number[]): TreeNode | null => {
    const indexHashMapOfInorder = new Map();

    inorder.forEach((val, index) => {
        indexHashMapOfInorder.set(val, index);
    });

    let postIndex = postorder.length - 1;

    const _helperFunc = (in_left_index: number, in_right_index: number) => {
        if (in_left_index > in_right_index) {
            return null;
        }

        // 根据 后序遍历规则 确定最后1个元素为rootNode
        const rootVal = postorder[postIndex];
        const rootNode = new TreeNode(rootVal);

        const rootIndex = indexHashMapOfInorder.get(rootVal);

        postIndex--;

        rootNode.right = _helperFunc(rootIndex + 1, in_right_index);

        rootNode.left = _helperFunc(in_left_index, rootIndex - 1);

        return rootNode;
    };

    return _helperFunc(0, inorder.length - 1);
};

/**
 * 迭代
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
buildTree = (inorder: number[], postorder: number[]): TreeNode | null => {
    if (postorder.length == 0) {
        return null;
    }

    const root = new TreeNode(postorder[postorder.length - 1]);
    const stack = [];

    stack.push(root);

    let inorderIndex = inorder.length - 1;

    for (let index = postorder.length - 2; index >= 0; index--) {
        let postorderVal = postorder[index];
        let node = stack[stack.length - 1];

        if (node.val !== inorder[inorderIndex]) {
            node.right = new TreeNode(postorderVal);
            stack.push(node.right);
        }
        //
        else {
            while (stack.length > 0 && stack[stack.length - 1].val === inorder[inorderIndex]) {
                node = stack.pop();

                inorderIndex--;
            }

            node.left = new TreeNode(postorderVal);

            stack.push(node.left);
        }
    }

    return root;
};
