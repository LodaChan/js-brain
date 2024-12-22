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
 * 141. 判断链表是否有环
 * https://leetcode.cn/problems/linked-list-cycle/description
 *
 * s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
 *
 * @description
 * 输入 head = [3,2,0,-4], pos = 1
 * 输出 true
 */
let hasCycle: (head: ListNode | null) => boolean;

/**
 * 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
hasCycle = (head: ListNode | null): boolean => {
    let output = false;

    const visitedSet: Set<ListNode> = new Set();

    while (head) {
        if (visitedSet.has(head) === true) {
            return (output = true);
        } else {
            visitedSet.add(head);
            head = head.next;
        }
    }

    return output;
};

/**
 * 快慢指针(类似龟兔赛跑)
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
hasCycle = (head: ListNode | null): boolean => {
    if (head == null || head.next == null) {
        return false;
    }
    let slow = head;
    let fast = head.next;

    while (slow !== fast) {
        if (fast === null || fast.next === null) {
            return false;
        }

        slow = slow.next;
        fast = fast.next.next;
    }

    return true;
};
