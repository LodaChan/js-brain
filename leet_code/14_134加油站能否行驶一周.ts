import {test, is} from "./libs/unit-test";

/**
 * 134. 加油站能否行驶一周
 * https://leetcode.cn/problems/gas-station/description
 *
 * @description
 * 输入 [1, 2, 3, 4, 5], [3, 4, 5, 1, 2]
 * 输出 3
 */
let canCompleteCircuit: (gas: number[], cost: number[]) => number;

/**
 * 贪心 + 双while + 偏移
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
canCompleteCircuit = (gas: number[], cost: number[]): number => {
    let output = -1;

    let startIndex = 0;

    while (startIndex < gas.length) {
        let sumOfGas = 0,
            sumOfCost = 0;

        /**
         * 满足总消耗小于等于总油量条件所能能通过的站数
         */
        let crossCount = 0;

        while (crossCount < gas.length) {
            const index = (startIndex + crossCount) % gas.length;
            sumOfGas += gas[index];
            sumOfCost += cost[index];

            if (sumOfCost > sumOfGas) {
                break;
            }

            crossCount++;
        }

        if (crossCount === gas.length) {
            return (output = startIndex);
        } else {
            startIndex = startIndex + crossCount + 1;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]),
        //
        3,
    );
});
test(`官方例子`, () => {
    return is(
        //
        canCompleteCircuit([2, 3, 4], [3, 4, 3]),
        //
        -1,
    );
});

test(`官方例子`, () => {
    return is(
        //
        canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1]),
        //
        3,
    );
});
