import {test, is} from "./libs/unit-test";

/**
 * 133. 克隆图
 * https://leetcode.cn/problems/clone-graph/description
 *
 * 双向图的单向构建
 * 常见于内存管理中引用的可达性表示
 *
 * @description
 * 输入 adjList = [[2,4],[1,3],[2,4],[1,3]]
 * 输出 [[2,4],[1,3],[2,4],[1,3]]
 *
 * 图中有 4 个节点。
 * 节点 1 的值是 1 , 它有两个邻居 节点 2 和 4
 * 节点 2 的值是 2 , 它有两个邻居 节点 1 和 3
 * 节点 3 的值是 3 , 它有两个邻居 节点 2 和 4
 * 节点 4 的值是 4 , 它有两个邻居 节点 1 和 3
 */

class GraphNode {
    val: number;
    neighbors: GraphNode[];

    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

let cloneGraph: (node: GraphNode | null) => GraphNode | null;

/**
 * 深度优先(递归)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
const visitedHashMap: Map<GraphNode, GraphNode> = new Map();
cloneGraph = (node: GraphNode | null): GraphNode | null => {
    if (node === null) {
        return node;
    }

    if (visitedHashMap.has(node) === true) {
        return visitedHashMap.get(node)!;
    }
    //
    else {
        const cloneNode = new GraphNode(node.val, []);
        visitedHashMap.set(node, cloneNode);

        for (const neighborNode of node.neighbors) {
            cloneNode.neighbors.push(cloneGraph(neighborNode));
        }
    }

    return cloneNode;
};

/**
 * 广度优先(队列)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */

cloneGraph = (node: GraphNode | null): GraphNode | null => {
    if (node === null) {
        return node;
    }

    const visitedHashMap: Map<GraphNode, GraphNode> = new Map();

    const queue = [node];

    visitedHashMap.set(node, new GraphNode(node.val, []));

    while (queue.length > 0) {
        const curNode = queue.shift()!;

        for (const neighborNode of curNode.neighbors) {
            if (visitedHashMap.has(neighborNode) === false) {
                visitedHashMap.set(neighborNode, new GraphNode(neighborNode.val, []));
                queue.push(neighborNode);
            }

            visitedHashMap.get(curNode)!.neighbors.push(visitedHashMap.get(neighborNode)!);
        }
    }

    return visitedHashMap.get(node);
};
