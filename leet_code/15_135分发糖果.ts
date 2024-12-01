import {test, is} from "./libs/unit-test";

/**
 * 135. 分发糖果
 * https://leetcode.cn/problems/candy/description
 *
 *
 */
let candy: (ratings: number[]) => number;

/**
 * 两次遍历 + 临时存储空间
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
candy = (ratings: number[]): number => {
    const n = ratings.length;
    const left = new Array(n).fill(0);

    for (let index = 0; index < n; index++) {
        if (index > 0 && ratings[index] > ratings[index - 1]) {
            left[index] = left[index - 1] + 1;
        } else {
            left[index] = 1;
        }
    }

    let right = 0,
        output = 0;

    for (let index = n - 1; index > -1; index--) {
        if (index < n - 1 && ratings[index] > ratings[index + 1]) {
            right++;
        } else {
            right = 1;
        }
        output += Math.max(left[index], right);
    }

    return output;
};

/**
 * 贪心 + 4阈值 + 递增用递增解决 + 递减用递增解决
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
candy = (ratings: number[]): number => {
    const n = ratings.length;

    /**
     * 最少准备的糖果数量
     */
    let output = 1;
    /**
     * 最近的递增序列的长度 inc
     */
    let inc = 1;
    /**
     * 递减序列的长度 dec
     */
    let dec = 0;
    /**
     * 前一个同学分得的糖果数量
     */
    let pre = 1;

    for (let i = 1; i < n; i++) {
        // 递增序列
        if (ratings[i - 1] <= ratings[i]) {
            dec = 0;
            if (ratings[i] === ratings[i - 1]) {
                pre = 1;
            } else {
                pre++;
            }
            output += pre;
            inc = pre;
        }
        // 递减序列
        else {
            dec++;
            if (dec === inc) {
                dec++;
            }
            output += dec;
            pre = 1;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        candy([1, 0, 2]),
        //
        5,
    );
});
test(`官方例子`, () => {
    return is(
        //
        candy([1, 2, 2]),
        //
        4,
    );
});
