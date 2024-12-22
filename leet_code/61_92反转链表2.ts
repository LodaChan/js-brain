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
 * 92. 反转链表 II
 * https://leetcode.cn/problems/reverse-linked-list-ii/description
 *
 * @description
 * 输入 head = [1,2,3,4,5], left = 2, right = 4
 * 输出 [1,4,3,2,5]  2,3,4 -> 4,3,2
 */
let reverseBetween: (head: ListNode | null, left: number, right: number) => ListNode | null;

/**
 * 反转 + 拼接
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
reverseBetween = (head: ListNode | null, leftIndex: number, rightIndex: number): ListNode | null => {
    const _reverseFunc = (head: ListNode) => {
        let last = null;
        let cur = head;

        while (cur) {
            const tempNext = cur.next;

            cur.next = last;
            last = cur;
            cur = tempNext;
        }
    };

    const dummyNode = new ListNode(-1);
    dummyNode.next = head;

    let prefix = dummyNode;
    for (let index = 0; index < leftIndex - 1; index++) {
        prefix = prefix.next;
    }

    let right = prefix;
    for (let index = 0; index < rightIndex - leftIndex + 1; index) {
        right = right.next;
    }

    let left = prefix.next;
    let suffix = right.next;

    // 切断原链表
    prefix.next = null;
    right.next = null;

    // 反转 left->right 得到 right->left
    _reverseFunc(left);

    // 重新连接
    prefix.next = right;
    left.next = suffix;

    return dummyNode.next;
};

/**
 * 头插
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
reverseBetween = (head: ListNode | null, leftIndex: number, rightIndex: number): ListNode | null => {
    const dummyNode = new ListNode(-1);
    dummyNode.next = head;

    let prefix = dummyNode;
    for (let index = 0; index < leftIndex - 1; ++index) {
        prefix = prefix.next;
    }

    /**
     * 区域左起点
     */
    let cur = prefix.next;

    for (let index = 0; index < rightIndex - leftIndex; ++index) {
        const tempNextAsNewPrefix = cur.next;

        cur.next = tempNextAsNewPrefix.next;
        tempNextAsNewPrefix.next = prefix.next;

        prefix.next = tempNextAsNewPrefix;
    }

    return dummyNode.next;
};
