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
 * 深度优先(递归)
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
 * 深度优先(非递归)(栈)
 */
function postorderTraversalNonRecursive(root: TreeNode | null): number[] {
    let output: number[] = [];
    let stack: TreeNode[] = [];

    let lastVisitedNode: TreeNode | null = null;
    let curNode = root;

    while (curNode !== null || stack.length > 0) {
        findTheMostLeftNodeJsLabel: while (curNode !== null) {
            stack.push(curNode);

            curNode = curNode.left;
        }

        // 为了还能处理 根子节点 , 只能取栈顶 , 不出栈(与先序中序不同)
        curNode = stack[stack.length - 1];

        // 当前节点的 right 不存在或已访问过
        // 场景1 : 当前节点 是 最左子节点 , 则 right 必定是 null
        // 场景2 : 当前节点 是 根子节点(无right)
        // 场景4 : 当前节点 是 最右子节点, 则 right 必定是 null , 且标记为已访问过
        // 场景5 : 当前节点 是 根子节点(有right且已访问过)
        if (curNode.right === null || curNode.right === lastVisitedNode) {
            output.push(curNode.val);
            stack.pop();

            // 标记已访问过
            lastVisitedNode = curNode;

            // 当前节点 不需要再入栈了 , 直接取下一个栈顶
            curNode = null;
        }
        // 当前节点的 right 存在且未访问过
        // 更新 curNode 为 根子节点的右子节点
        // 通过 findTheMostLeftNodeJsLabel 入栈
        // 场景3  : 当前节点 是 根子节点(有right且没访问过)
        else {
            curNode = curNode.right;
        }
    }

    return output;
}
