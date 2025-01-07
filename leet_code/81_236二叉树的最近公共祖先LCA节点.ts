import {test, is} from "./libs/unit-test";

/**
 * 236. 二叉树的最近公共祖先LCA节点
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description
 *
 * 子问题抽象左右子树包含p与q
 *
 * @description
 * 输入 root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出 3
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

let lowestCommonAncestor: (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null) => TreeNode | null;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
lowestCommonAncestor = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null => {
    let output: TreeNode | null;

    const _DFSFunc = (cur: TreeNode | null, p: TreeNode | null, q: TreeNode | null): boolean => {
        if (cur === null) {
            return false;
        }

        const lson = _DFSFunc(cur.left, p, q);
        const rson = _DFSFunc(cur.right, p, q);

        // 子问题抽象左右子树包含p与q
        if ((lson && rson) || ((cur.val === p.val || cur.val === q.val) && (lson || rson))) {
            output = cur;
        }

        return lson || rson || cur.val === p.val || cur.val === q.val;
    };

    _DFSFunc(root, p, q);

    return output;
};

/**
 * 模拟 + 哈希表(存储父节点)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
lowestCommonAncestor = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null => {
    let output: TreeNode | null;

    /**
     * 存储左右子树值的根节点
     */
    const parentNodeHashMap: Map<number, TreeNode> = new Map();
    const rootOfPNodeSet: Set<number> = new Set();

    const _DFSFunc = (cur: TreeNode | null) => {
        if (cur === null) {
            return;
        }

        if (cur.left) {
            parentNodeHashMap.set(cur.left.val, cur);
            _DFSFunc(cur.left);
        }

        if (cur.right) {
            parentNodeHashMap.set(cur.right.val, cur);
            _DFSFunc(cur.right);
        }
    };

    _DFSFunc(root);

    // 不断向上找p的根节点
    let tempRootOfP = p;
    while (tempRootOfP) {
        // 将可能存在的根节点的值存储到rootOfPNodeSet
        rootOfPNodeSet.add(tempRootOfP.val);
        tempRootOfP = parentNodeHashMap.get(tempRootOfP.val) || null;
    }

    // 不断向上找q的根节点
    let tempQ = q;
    while (tempQ) {
        // 如果有相同的根节点 , 跳出
        if (rootOfPNodeSet.has(tempQ.val) === true) {
            return (output = tempQ);
        }
        tempQ = parentNodeHashMap.get(tempQ.val) || null;
    }

    return (output = null);
};
