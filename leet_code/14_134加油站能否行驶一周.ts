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

    const n = gas.length;

    let startIndex = 0;

    while (startIndex < n) {
        let sumOfGas = 0,
            sumOfCost = 0;
        let cnt = 0;

        while (cnt < n) {
            const j = (startIndex + cnt) % n;
            sumOfGas += gas[j];
            sumOfCost += cost[j];
            if (sumOfCost > sumOfGas) {
                break;
            }
            cnt++;
        }

        if (cnt === n) {
            return (output = startIndex);
        } else {
            startIndex = startIndex + cnt + 1;
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
