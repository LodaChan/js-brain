import {test, is} from "./libs/unit-test";

/**
 * 114. 二叉树展开为链表
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description
 *
 * 展开后的单链表应该同样使用 TreeNode , 其中 right 子指针指向链表中下一个结点 , 而左子指针始终为 null
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同
 * @description
 * 输入 root = [1,2,5,3,4,null,6]
 * 输出 [1,null,2,null,3,null,4,null,5,null,6]
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

let flatten: (root: TreeNode | null) => void;

/**
 * 前驱节点
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
flatten = (root: TreeNode | null) => {
    let curNode = root;

    while (curNode !== null) {
        // 如果有左子树
        if (curNode.left !== null) {
            const nextNode = curNode.left;

            let finalNode = nextNode;
            while (finalNode.right !== null) {
                finalNode = finalNode.right;
            }
            // 将左子树的最底右节点与当前的右节点连接
            finalNode.right = curNode.right;

            curNode.left = null;
            curNode.right = nextNode;
        }

        curNode = curNode.right;
    }
};
