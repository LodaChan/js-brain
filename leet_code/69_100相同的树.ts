import {test, is} from "./libs/unit-test";

/**
 * 100. 相同的树
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/description
 *
 *
 * @description
 * 输入 p = [1,2,1], q = [1,1,2]
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

let isSameTree: (root1: TreeNode | null, root2: TreeNode | null) => boolean;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(min(n,m))
 * 空间复杂度 O(min(n,m))
 */
isSameTree = (root1: TreeNode | null, root2: TreeNode | null): boolean => {
    if (root1 == null && root2 == null) {
        return true;
    }
    //
    else if (root1 == null || root2 == null) {
        return false;
    }
    //
    else if (root1.val !== root2.val) {
        return false;
    }
    //
    else {
        return isSameTree(root1.left, root2.left) && isSameTree(root1.right, root2.right);
    }
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(min(n,m))
 * 空间复杂度 O(min(n,m))
 */
isSameTree = (root1: TreeNode | null, root2: TreeNode | null): boolean => {
    if (root1 == null && root2 == null) {
        return true;
    }
    //
    else if (root1 == null || root2 == null) {
        return false;
    }

    const queue1 = [];
    queue1.push(root1);
    const queue2 = [];
    queue2.push(root2);

    while (queue1.length > 0 && queue2.length > 0) {
        const root1Node = queue1.shift()!;
        const root2Node = queue2.shift()!;

        if (root1Node.val != root2Node.val) {
            return false;
        }

        let left1 = root1Node.left,
            right1 = root1Node.right,
            left2 = root2Node.left,
            right2 = root2Node.right;

        if ((left1 === null) !== (left2 === null)) {
            return false;
        }

        if ((right1 === null) !== (right2 === null)) {
            return false;
        }

        if (left1) {
            queue1.push(left1);
        }
        if (right1) {
            queue1.push(right1);
        }

        if (left2) {
            queue2.push(left2);
        }
        if (right2) {
            queue2.push(right2);
        }
    }

    return queue1.length === queue2.length;
};
