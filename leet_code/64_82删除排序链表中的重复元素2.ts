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
 * 82. 删除排序链表中的重复元素 II
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description
 *
 * @description
 * 输入 head = [1,1,1,2,3]
 * 输出 [2,3]
 */
let deleteDuplicates: (head: ListNode | null) => ListNode | null;

/**
 * 遍历 + 阈值
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
deleteDuplicates = (head: ListNode | null): ListNode | null => {
    if (head === null) {
        return head;
    }

    const dummy = new ListNode(0, head);

    let cur = dummy;
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const target = cur.next.val;
            while (cur.next && cur.next.val === target) {
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }

    return dummy.next;
};
