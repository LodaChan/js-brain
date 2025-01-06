/**
 * 左子树 -> 右子树 -> 根节点
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
function postorderTraversalRecursive(root: TreeNode | null): number[] {
    const output: number[] = [];

    const _postorderFunc = (curNode: TreeNode | null) => {
        if (curNode) {
            _postorderFunc(curNode.left);

            _postorderFunc(curNode.right);

            output.push(curNode.val);
        }
    };

    _postorderFunc(root);

    return output;
}

/**
 * 非递归
 */
function postorderTraversalNonRecursive(root: TreeNode | null): number[] {
    let output: number[] = [];
    let stack: TreeNode[] = [];

    let lastVisitedNode: TreeNode | null = null;
    let curNode = root;

    while (curNode !== null || stack.length > 0) {
        while (curNode !== null) {
            stack.push(curNode);

            curNode = curNode.left;
        }

        curNode = stack[stack.length - 1];

        if (curNode.right === null || curNode.right === lastVisitedNode) {
            output.push(curNode.val);

            stack.pop();

            lastVisitedNode = curNode;

            curNode = null;
        }
        //
        else {
            curNode = curNode.right;
        }
    }

    return output;
}
