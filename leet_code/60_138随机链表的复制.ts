import {test, is} from "./libs/unit-test";

class _Node {
    val: number;
    next: _Node | null;
    random: _Node | null;

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
        this.random = random === undefined ? null : random;
    }
}
/**
 * 138. 随机链表的复制
 * https://leetcode.cn/problems/copy-list-with-random-pointer/description
 *
 * @description
 * 输入 head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出 [[7,null],[13,0],[11,4],[10,2],[1,0]]
 */
let copyRandomList: (head: _Node | null) => _Node | null;

/**
 * 迭代 + 节点拆分
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
copyRandomList = (head: _Node | null): _Node | null => {
    if (head === null) {
        return null;
    }

    for (let node = head; node !== null; node = node.next.next) {
        const newNode = new _Node(node.val, node.next, null);
        node.next = newNode;
    }

    for (let node = head; node !== null; node = node.next.next) {
        const newNode = node.next;
        newNode.random = node.random !== null ? node.random.next : null;
    }

    const newhead = head.next;

    for (let node = head; node !== null; node = node.next) {
        const newNode = node.next;
        node.next = node.next.next;
        newNode.next = newNode.next !== null ? newNode.next.next : null;
    }

    return newhead;
};
