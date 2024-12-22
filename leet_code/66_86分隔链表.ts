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
 * 86. 分隔链表
 * https://leetcode.cn/problems/partition-list/description
 *
 * @description
 * 输入 head = [1,4,3,2,5,2], x = 3
 * 输出 [1,2,2,4,3,5]
 */
let partition: (head: ListNode | null, x: number) => ListNode | null;

/**
 * 双链表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
partition = (head: ListNode | null, x: number): ListNode | null => {
    let smallX = new ListNode(0);
    const smallXHead = smallX;

    let largeX = new ListNode(0);
    const largeXHead = largeX;

    while (head !== null) {
        if (head.val < x) {
            smallX.next = head;
            smallX = smallX.next;
        } else {
            largeX.next = head;
            largeX = largeX.next;
        }

        head = head.next;
    }

    // 切断大链表的连接
    largeX.next = null;
    // 连接小链表与大链表
    smallX.next = largeXHead.next;

    return smallXHead.next;
};
