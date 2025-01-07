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
 * 广度优先(队列)
 */
function breadthFirstSearch(root: TreeNode | null): number[] {
    const output: number[] = [];

    if (root === null) {
        return output;
    }

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const curNode = queue.shift()!;

        if (curNode) {
            output.push(curNode.val);

            if (curNode.left) {
                queue.push(curNode.left);
            }

            if (curNode.right) {
                queue.push(curNode.right);
            }
        }
    }

    return output;
}
