import {test, is} from "./libs/unit-test";

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

/**
 * 19. 删除链表的倒数第N个节点
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/description
 *
 * @description
 * 输入 head = [1,2,3,4,5], n = 2
 * 输出 [1,2,3,5]
 */
let removeNthFromEnd: (head: ListNode | null, nk: number) => ListNode | null;

/**
 * 链表深度
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
removeNthFromEnd = (head: ListNode | null, n: number): ListNode | null => {
    const getDepthFunc = (head: ListNode) => {
        let cur = head;
        let depth = 0;

        while (cur !== null) {
            depth++;

            cur = cur.next;
        }

        return depth;
    };

    let dummyNode = new ListNode(0, head);
    let cur = dummyNode;
    const depth = getDepthFunc(head);

    for (let index = 1; index < depth - n + 1; index++) {
        cur = cur.next;
    }

    // 直接跳过倒数第N个节点
    cur.next = cur.next.next;

    return dummyNode.next;
};

/**
 * 双指针 + 错位
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
removeNthFromEnd = (head: ListNode | null, n: number): ListNode | null => {
    const dummyNode = new ListNode(0, head);

    let fast = head;
    let slow = dummyNode;

    for (let index = 0; index < n; index++) {
        fast = fast.next;
    }

    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummyNode.next;
};
