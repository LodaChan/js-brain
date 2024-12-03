import {test, is} from "./libs/unit-test";

/**
 * 13. 罗马数字转整数
 * https://leetcode.cn/problems/roman-to-integer/description
 *
 * @description
 * 输入 "MCMXCIV"
 * 输出 1994
 */
let romanToInt: (s: string) => number;

/**
 * 数学模拟
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
romanToInt = (inputStr: string): number => {
    const symbolHashMap = new Map();
    symbolHashMap.set("I", 1);
    symbolHashMap.set("V", 5);
    symbolHashMap.set("X", 10);
    symbolHashMap.set("L", 50);
    symbolHashMap.set("C", 100);
    symbolHashMap.set("D", 500);
    symbolHashMap.set("M", 1000);

    let output = 0;
    const n = inputStr.length;

    for (let index = 0; index < n; index++) {
        const symbolValue = symbolHashMap.get(inputStr[index]);

        if (index < n - 1 && symbolValue < symbolHashMap.get(inputStr[index + 1])) {
            output = output - symbolValue;
        } else {
            output = output + symbolValue;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        //
        romanToInt("III"),
        //
        3,
    );
});
test(`官方例子`, () => {
    return is(
        //
        romanToInt("IV"),
        //
        4,
    );
});
test(`官方例子`, () => {
    return is(
        //
        romanToInt("IX"),
        //
        9,
    );
});
test(`官方例子`, () => {
    return is(
        //
        romanToInt("LVIII"),
        // L = 50, V= 5, III = 3
        58,
    );
});
test(`官方例子`, () => {
    return is(
        //
        romanToInt("MCMXCIV"),
        // M = 1000, CM = 900, XC = 90, IV = 4
        1994,
    );
});
