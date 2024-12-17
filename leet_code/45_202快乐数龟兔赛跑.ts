import {test, is} from "./libs/unit-test";

/**
 * 202. 快乐数
 * https://leetcode.cn/problems/happy-number/description
 *
 * 如果不是快乐数一定会进入一系列数的循环
 *
 * @description
 * 输入 n = 19
 * 输出 true
 */
let isHappy: (num: number) => boolean;

/**
 * 哈希表 + 循环检测
 *
 * @description
 * 时间复杂度 O(logn)
 * 空间复杂度 O(logn)
 */
isHappy = (num: number): boolean => {
    let seen: Set<number> = new Set();

    const _getNextNum = (inputNum: number): number => {
        let sum = 0;

        while (inputNum > 0) {
            let d = inputNum % 10;
            inputNum = Math.floor(inputNum / 10);
            sum += d ** 2;
        }

        return sum;
    };

    while (num !== 1 && seen.has(num) === false) {
        seen.add(num);

        num = _getNextNum(num);
    }

    return num === 1;
};

/**
 * 双指针(类似龟兔赛跑)
 *
 * @description
 * 时间复杂度 O(logn)
 * 空间复杂度 O(1)
 */
isHappy = (num: number): boolean => {
    const _getNextNum = (inputNum: number): number => {
        let sum = 0;

        while (inputNum > 0) {
            let d = inputNum % 10;
            inputNum = Math.floor(inputNum / 10);
            sum += d ** 2;
        }

        return sum;
    };

    let slow = num;
    let fast = _getNextNum(num);

    while (fast !== 1 && slow !== fast) {
        slow = _getNextNum(slow);
        // 模拟2倍速
        fast = _getNextNum(_getNextNum(fast));
    }

    return fast === 1;
};

/**
 * 数学挖掘 + 有限散列集
 *
 * @description
 * 时间复杂度 O(logn)
 * 空间复杂度 O(1)
 */
isHappy = (num: number): boolean => {
    const _getNextNum = (inputNum: number): number => {
        let sum = 0;

        while (inputNum > 0) {
            let d = inputNum % 10;
            inputNum = Math.floor(inputNum / 10);
            sum += d ** 2;
        }

        return sum;
    };

    const cycleSet = new Set([4, 16, 37, 58, 89, 145, 42, 20]);

    while (num != 1 && cycleSet.has(num) === false) {
        num = _getNextNum(num);
    }

    return num === 1;
};

test(`官方例子`, () => {
    return is(
        isHappy(19),
        // 1^2 + 9^2 = 82
        // 8^2 + 2^2 = 68
        // 6^2 + 8^2 = 100
        // 1^2 + 0^2 + 0^2 = 1
        true,
    );
});
test(`官方例子`, () => {
    return is(
        isHappy(7),
        // 7^2 = 49
        // 4^2 + 9^2 = 97
        // 9^2 + 7^2 = 130
        // 1^2 + 3^2 + 0^2 = 10
        // 1^2 + 0^2 = 1
        true,
    );
});
