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
 * 59. 合并两个有序链表
 * https://leetcode.cn/problems/merge-two-sorted-lists/description
 *
 * @description
 * 输入 list1 = [1,2,4], list2 = [1,3,4]
 * 输出 [1,1,2,3,4,4]
 */
let mergeTwoLists: (list1: ListNode | null, list2: ListNode | null) => ListNode | null;

/**
 * 迭代
 *
 * @description
 * 时间复杂度 O(m + n)
 * 空间复杂度 O(1)
 */
mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    const newList = new ListNode(-1);

    let prevNode = newList;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            prevNode.next = list1;
            list1 = list1.next;
        } else {
            prevNode.next = list2;
            list2 = list2.next;
        }

        prevNode = prevNode.next;
    }

    // 补全后面的节点
    prevNode.next = list1 === null ? list2 : list1;

    return newList.next;
};

/**
 * 递归
 *
 * @description
 * 时间复杂度 O(m + n)
 * 空间复杂度 O(m + n)
 */
mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    if (list1 === null) {
        return list2;
    } else if (list2 === null) {
        return list1;
    } else if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};
