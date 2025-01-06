import {test, is} from "./libs/unit-test";

/**
 * 380. O(1) 时间插入、删除和获取随机元素
 * https://leetcode.cn/problems/insert-delete-getrandom-o1/description
 *
 * @description
 * RandomizedSet() 初始化 RandomizedSet 对象
 * bool insert(int val) 当元素 val 不存在时,向集合中插入该项,并返回 true ；否则,返回 false
 * bool remove(int val) 当元素 val 存在时,从集合中移除该项,并返回 true ；否则,返回 false
 * int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）
 * 每个元素应该有 相同的概率 被返回
 *
 * [null, true, false, true, 1 or 2, true, false, 2]
 * RandomizedSet randomizedSet = new RandomizedSet();
 * randomizedSet.insert(1); // 向集合中插入 1 返回 true
 * randomizedSet.remove(2); // 返回 false
 * randomizedSet.insert(2); // 向集合中插入 2 返回 true
 * randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2
 * randomizedSet.remove(1); // 从集合中移除 1 ,返回 true
 * randomizedSet.insert(2); // 2 已在集合中,所以返回 false
 * randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字,getRandom 总是返回 2
 *
 * 哈希表 + 末尾栈移位思想
 *
 * @description
 *
 * [].shift()
 * 会改变原数组
 * 用途1:删除的第1个元素
 * 用途2:返回删除的第1个元素
 *
 * [].pop()
 * 会改变原数组
 * 用途1:删除的最后1个元素
 * 用途2:返回删除的最后1个元素
 */
class RandomizedSet {
    constructor() {}

    private nums: number[] = [];
    /**
     * 数字 是 key
     * 数字 在 nums 的 index 作为 value
     */
    private numsIndexHashMap = new Map();

    insert(val: number): boolean {
        let output = false;

        if (this.numsIndexHashMap.has(val) === true) {
            return (output = false);
        }

        let index = this.nums.length;
        this.nums.push(val);
        this.numsIndexHashMap.set(val, index);

        return (output = true);
    }

    remove(val: number): boolean {
        let output = false;

        if (this.numsIndexHashMap.has(val) === false) {
            return (output = false);
        }

        let index = this.numsIndexHashMap.get(val);
        // update
        this.nums[index] = this.nums[this.nums.length - 1];
        this.numsIndexHashMap.set(this.nums[index], index);
        // delete
        this.nums.pop();
        this.numsIndexHashMap.delete(val);

        return (output = true);
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.nums.length);
        return this.nums[randomIndex];
    }
}
