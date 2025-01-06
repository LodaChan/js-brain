import {test, is} from "./libs/unit-test";

/**
 * 173. 二叉搜索树迭代器
 * https://leetcode.cn/problems/binary-search-tree-iterator/description
 *
 * @description
 * 输入 ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
 *      [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
 * 输出 [null, 3, 7, true, 9, true, 15, true, 20, false]
 *
 * 第1次调用next() 返回BST中的最小元素(默认是最左node)并内部定位到此node
 * hasNext()符合中序遍历的左根右顺序 如果有右侧可遍历的node返回true
 *
 * BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
 * bSTIterator.next();    // 返回 3
 * bSTIterator.next();    // 返回 7
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 9
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 15
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 20
 * bSTIterator.hasNext(); // 返回 False
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

/**
 * 扁平
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
class BSTIterator1 {
    private index: number = 0;
    private values: number[] = [];

    constructor(root: TreeNode | null) {
        const _inorderLoopFunc = (root: TreeNode | null, refValues: number[]) => {
            if (!root) {
                return;
            }

            _inorderLoopFunc(root.left, refValues);
            refValues.push(root.val);
            _inorderLoopFunc(root.right, refValues);
        };

        _inorderLoopFunc(root, this.values);
    }

    next(): number {
        const output = this.values[this.index];

        this.index++;

        return output;
    }

    hasNext(): boolean {
        return this.index < this.values.length;
    }
}

/**
 * 迭代
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(h)
 */
class BSTIterator2 {
    private cur: TreeNode | null;
    private stack: TreeNode[];

    constructor(root: TreeNode | null) {
        this.cur = root;
        this.stack = [];
    }

    next(): number {
        while (this.cur) {
            this.stack.push(this.cur);
            this.cur = this.cur.left;
        }

        this.cur = this.stack.pop();

        const value = this.cur.val;
        this.cur = this.cur.right;

        return value;
    }

    hasNext(): boolean {
        return this.cur !== null || this.stack.length > 0;
    }
}
