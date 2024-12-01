import {test, is} from "./libs/unit-test";

/**
 * 274. H 指数
 * https://leetcode.cn/problems/h-index/description
 *
 * @description
 * itations[i] 表示研究者的第 i 篇论文被引用的次数
 * h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h 篇论文被引用次数大于等于 h 。如果 h 有多种可能的值，h 指数 是其中最大的那个。
 * 输入 [3, 0, 6, 1, 5]  有3篇论文每篇至少被引用了3次所以是3
 * 输出 3
 */
let hIndex: (citations: number[]) => number;

/**
 * 分治 + 排序
 *
 * @description
 * 时间复杂度 O(nlogn)
 * 空间复杂度 O(nlogn)
 */
hIndex = (citations: number[]): number => {
    citations.sort((a, b) => a - b);

    let output = 0,
        index = citations.length - 1;

    while (index >= 0 && citations[index] > output) {
        output++;
        index--;
    }

    return output;
};

/**
 * 二分搜素
 *
 * @description
 * 时间复杂度 O(nlogn)
 * 空间复杂度 O(1)
 */
hIndex = (citations: number[]): number => {
    let left = 0,
        right = citations.length;

    while (left < right) {
        // +1 防止死循环
        let mid = Math.floor((left + right + 1) / 2);
        let cnt = 0;
        for (let citation of citations) {
            if (citation >= mid) {
                cnt++;
            }
        }
        if (cnt >= mid) {
            // 要找的答案在 [mid,right] 区间内
            left = mid;
        } else {
            // 要找的答案在 [0,mid) 区间内
            right = mid - 1;
        }
    }

    return left;
};

/**
 * 计数排序
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
hIndex = (citations: number[]): number => {
    let output = 0;

    let n = citations.length,
        total = 0;
    const counter = new Array(n + 1).fill(0);

    for (let index = 0; index < n; index++) {
        if (citations[index] >= n) {
            counter[n]++;
        } else {
            counter[citations[index]]++;
        }
    }

    // 有大于等于index篇论文时
    for (let index = n; index >= 0; index--) {
        total += counter[index];

        if (total >= index) {
            return (output = index);
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        hIndex([1, 3, 1]),
        //
        1,
    );
});
test(`官方例子`, () => {
    return is(
        //
        hIndex([3, 0, 6, 1, 5]),
        //
        3,
    );
});
