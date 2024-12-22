import {test, is} from "./libs/unit-test";

/**
 * 146. LRU缓存
 * https://leetcode.cn/problems/lru-cache/description
 *
 * 会优先淘汰最久未被使用的数据
 * 标记为最近使用 = 查询 或 更新value 或 新加入
 *
 * @description
 * 输入 ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 *      [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出 [null, null, null, 1, null, -1, null, -1, 3, 4]
 *
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1 , 1使用了
 * lRUCache.put(3, 3); // 该操作会使得  2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 */

class DoubleLinkedNode {
    key: number;
    value: number;
    prev: DoubleLinkedNode | null;
    next: DoubleLinkedNode | null;
    constructor(key?: number, value?: number) {
        this.key = key === undefined ? 0 : key;
        this.value = value === undefined ? 0 : value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * 哈希表 + 正向反向2个链表
 */
class LRUCache {
    private cacheNodeHashMap: Map<number, DoubleLinkedNode> = new Map();
    private size: number = 0;
    private capacity: number;

    /**
     * 越常用越靠前
     */
    private headLink: DoubleLinkedNode;
    /**
     * 越常用越靠后
     */
    private tailLink: DoubleLinkedNode;

    /**
     * @param capacity 初始化的容量
     */
    constructor(capacity: number) {
        this.capacity = capacity;

        this.headLink = new DoubleLinkedNode();
        this.tailLink = new DoubleLinkedNode();

        this.headLink.next = this.tailLink;
        this.tailLink.prev = this.headLink;
    }

    /**
     * 标记为最近使用 = 查询 或 更新value 或 新加入
     */
    private makeNodeAsRecentlyUsedForGetOrUpdateFunc(node: DoubleLinkedNode): void {
        // 1
        this.updateNodePrevAndNextAsDeleteFunc(node);

        // 2
        this.addToHeadLinkNextFunc(node);
    }

    /**
     * 将节点加入到 head链顶
     */
    private addToHeadLinkNextFunc(newNode: DoubleLinkedNode): void {
        newNode.prev = this.headLink;
        newNode.next = this.headLink.next;

        // 原head的next的prev 更新为newNode
        this.headLink.next!.prev = newNode;
        // 原head的next 更新为newNode
        this.headLink.next = newNode;
    }

    /**
     * 删除节点 = 更新 node 的 prev 和 next
     */
    private updateNodePrevAndNextAsDeleteFunc(node: DoubleLinkedNode): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
    }

    /**
     * 删除最近未使用
     */
    private removeNotRecentlyUsedNodeFromTailFunc(): DoubleLinkedNode {
        const notUsedRecentlyNode = this.tailLink.prev!;

        this.updateNodePrevAndNextAsDeleteFunc(notUsedRecentlyNode);

        return notUsedRecentlyNode;
    }

    /**
     * 每次查询当作被使用1次 , 需要加到 head链的头部
     */
    get(key: number): number {
        let output = -1;

        const matchCacheNode = this.cacheNodeHashMap.get(key);

        if (matchCacheNode) {
            this.makeNodeAsRecentlyUsedForGetOrUpdateFunc(matchCacheNode);

            return (output = matchCacheNode.value);
        }

        return (output = -1);
    }

    put(key: number, value: number): void {
        const matchCacheNode = this.cacheNodeHashMap.get(key);

        //  有
        if (matchCacheNode) {
            matchCacheNode.value = value;

            this.makeNodeAsRecentlyUsedForGetOrUpdateFunc(matchCacheNode);
        }
        // 无
        else {
            const newNode = new DoubleLinkedNode(key, value);
            this.cacheNodeHashMap.set(key, newNode);

            this.addToHeadLinkNextFunc(newNode);

            this.size++;
            if (this.size > this.capacity) {
                const notRecentlyUsedNode = this.removeNotRecentlyUsedNodeFromTailFunc();

                this.cacheNodeHashMap.delete(notRecentlyUsedNode.key);

                this.size--;
            }
        }
    }
}
