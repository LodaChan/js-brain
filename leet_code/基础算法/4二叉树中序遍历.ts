/**
 * 左子树 -> 根节点 -> 右子树
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/**
 * 递归
 */
function inorderTraversalRecursive(root: TreeNode | null): number[] {
    const output: number[] = [];

    const _inorderFunc = (curNode: TreeNode | null) => {
        if (curNode) {
            _inorderFunc(curNode.left);

            output.push(curNode.val);

            _inorderFunc(curNode.right);
        }
    };

    _inorderFunc(root);

    return output;
}

/**
 * 非递归
 */
function inorderTraversalNonRecursive(root: TreeNode | null): number[] {
    let output: number[] = [];
    let stack: TreeNode[] = [];

    let curNode = root;

    while (curNode !== null || stack.length > 0) {
        while (curNode !== null) {
            stack.push(curNode);

            curNode = curNode.left;
        }

        curNode = stack.pop()!;

        output.push(curNode.val);

        curNode = curNode.right;
    }

    return output;
}
