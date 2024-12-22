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
 * 61. 轮转链表
 * https://leetcode.cn/problems/rotate-list/description
 *
 * @description
 * 输入 head = [0,1,2], k = 4
 * 输出 [2,0,1]
 */
let rotateRight: (head: ListNode | null, k: number) => ListNode | null;

/**
 * 求深度 + 连接成环 + 移动 + 断开成链
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
rotateRight = (head: ListNode | null, k: number): ListNode | null => {
    if (k === 0 || !head || !head.next) {
        return head;
    }

    let depth = 1;
    let cur = head;
    while (cur.next) {
        cur = cur.next;
        depth++;
    }

    let moveCount = depth - (k % depth);
    if (moveCount === depth) {
        return head;
    }

    // 连接成环
    cur.next = head;

    // 移动
    while (moveCount) {
        cur = cur.next;
        moveCount--;
    }

    const output = cur.next;

    // 断开成链
    cur.next = null;

    return output;
};
