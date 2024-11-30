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
 * 动态规划 + 排序后递推
 *
 * @description
 * 时间复杂度 O(nlogn)
 * 空间复杂度 O(1)
 */
hIndex = (citations: number[]): number => {
    citations.sort((a, b) => b - a);
    console.log(citations);

    let maxHIndex = 0;

    for (let index = 0; index < citations.length; index++) {
        if (citations[index] >= index + 1) {
            maxHIndex++;
        } else {
            break;
        }
    }

    return maxHIndex;
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
