import {test, is} from "./libs/unit-test";

/**
 * 122. 买卖股票的最佳时机 II
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description
 *
 * @description
 * 输入 [7,1,5,3,6,4]
 * 输出 5-1 + 6-3 = 7
 */
let maxProfit: (prices: number[]) => number;

/**
 * 动态规划
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
maxProfit = (prices: number[]): number => {
    console.log(prices);

    const n = prices.length;
    let dp0 = 0,
        dp1 = -prices[0];
    for (let index = 1; index < n; index++) {
        let newDp0 = Math.max(dp0, dp1 + prices[index]);
        let newDp1 = Math.max(dp1, dp0 - prices[index]);
        dp0 = newDp0;
        dp1 = newDp1;
    }
    return dp0;
};

/**
 * 贪心
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
maxProfit = (prices: number[]): number => {
    console.log(prices);

    let totalProfit = 0;
    let n = prices.length;

    for (let index = 1; index < n; index++) {
        totalProfit += Math.max(0, prices[index] - prices[index - 1]);
    }

    return totalProfit;
};

test(`官方例子`, () => {
    return is(
        //
        maxProfit([7, 1, 5, 3, 6, 4]),
        //
        7,
    );
});
test(`官方例子`, () => {
    return is(
        //
        maxProfit([1, 2, 3, 4, 5]),
        //
        4,
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
