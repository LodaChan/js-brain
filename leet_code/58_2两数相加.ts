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
 * 2. 两数相加
 * https://leetcode.cn/problems/add-two-numbers/description
 *
 * @description
 * 输入 list1 = [2,4,3] , list2 = [5,6,4]
 * 输出 [7,0,8] <- 342 + 465 = 807
 */
let addTwoNumbers: (list1: ListNode | null, list2: ListNode | null) => ListNode | null;

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(max(m,n))
 * 空间复杂度 O(1)
 */
addTwoNumbers = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    let headNode = null,
        tailNode = null;

    /**
     * 下一位的进位 如 1 + 9 = 10 , 十位需要 +1
     */
    let carry = 0;

    while (list1 || list2) {
        const n1 = list1 ? list1.val : 0;
        const n2 = list2 ? list2.val : 0;

        const sum = n1 + n2 + carry;

        if (!headNode) {
            headNode = tailNode = new ListNode(sum % 10);
        } else {
            tailNode.next = new ListNode(sum % 10);
            tailNode = tailNode.next;
        }
        carry = Math.floor(sum / 10);

        if (list1) {
            list1 = list1.next;
        }
        if (list2) {
            list2 = list2.next;
        }
    }

    if (carry > 0) {
        tailNode.next = new ListNode(carry);
    }

    return headNode;
};
