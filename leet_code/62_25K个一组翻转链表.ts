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
 * 25. K个一组翻转链表
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/description
 *
 * @description
 * 输入 head = [1,2,3,4,5], k = 3
 * 输出 [3,2,1,4,5]
 */
let reverseKGroup: (head: ListNode | null, k: number) => ListNode | null;

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
reverseKGroup = (head: ListNode | null, k: number): ListNode | null => {
    const _reverseFunc = (head: ListNode, tail: ListNode) => {
        let last = tail.next;
        let cur = head;

        while (last !== tail) {
            const tempNext = cur.next;

            cur.next = last;
            last = cur;
            cur = tempNext;
        }

        return [tail, head];
    };

    const dummyNode = new ListNode(-1);
    dummyNode.next = head;

    let chunkHead = dummyNode;
    let cur = head;

    while (cur) {
        let chunkTail = chunkHead;

        for (let index = 0; index < k; index++) {
            chunkTail = chunkTail.next;

            // 最后一组不满足K的深度不进行翻转
            if (chunkTail === null) {
                return dummyNode.next;
            }
        }

        // 先缓存
        const nextChunkHead = chunkTail.next;

        const [newChunkHead, newChunkTail] = _reverseFunc(cur, chunkTail);

        // 重新连接
        chunkHead.next = newChunkHead;
        chunkTail = newChunkTail;
        chunkTail.next = nextChunkHead;

        // 下一个chunk
        chunkHead = chunkTail;
        cur = chunkTail.next;
    }

    return dummyNode.next;
};
