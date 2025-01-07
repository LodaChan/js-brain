/**
 * 根节点 -> 左子树 -> 右子树
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
 * 深度优先(递归)
 */
function preorderTraversalRecursive(root: TreeNode | null): number[] {
    const output: number[] = [];

    const _preorderFunc = (curNode: TreeNode | null) => {
        if (curNode) {
            output.push(curNode.val);

            _preorderFunc(curNode.left);

            _preorderFunc(curNode.right);
        }
    };

    _preorderFunc(root);

    return output;
}

/**
 * 深度优先(非递归)(栈)
 */
function preorderTraversalNonRecursive(root: TreeNode | null): number[] {
    let output: number[] = [];
    let stack: TreeNode[] = [];

    let curNode = root;

    while (curNode !== null || stack.length > 0) {
        while (curNode !== null) {
            output.push(curNode.val);

            stack.push(curNode);

            curNode = curNode.left;
        }

        curNode = stack.pop()!;

        curNode = curNode.right;
    }

    return output;
}
