import {test, is} from "./libs/unit-test";

/**
 * 121. 买卖股票的最佳时机
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description
 *
 * @description
 * 输入 [1, 4, 2]
 * 输出 3
 */
let maxProfit: (prices: number[]) => number;

/**
 * 动态规划 + 双阈值
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
maxProfit = (prices: number[]): number => {
    console.log(prices);

    let maxChunkProfit = 0;

    if (prices.length <= 1) {
        return maxChunkProfit;
    }

    let minPrice = Number.MAX_VALUE;

    for (let index = 0; index < prices.length; index++) {
        if (prices[index] < minPrice) {
            minPrice = prices[index];
        }
        //
        else if (prices[index] - minPrice > maxChunkProfit) {
            maxChunkProfit = prices[index] - minPrice;
        }
    }

    return maxChunkProfit;
};

test(`单例子`, () => {
    return is(
        //
        maxProfit([1]),
        //
        0,
    );
});
test(`官方例子`, () => {
    return is(
        //
        maxProfit([7, 1, 5, 3, 6, 4]),
        //
        5,
    );
});
test(`官方例子`, () => {
    return is(
        //
        maxProfit([1, 4, 2]),
        //
        3,
    );
});

test(`官方例子`, () => {
    return is(
        //
        maxProfit([7, 6, 4, 3, 1]),
        //
        0,
    );
});
