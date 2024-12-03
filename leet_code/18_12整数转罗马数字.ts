import {test, is} from "./libs/unit-test";

/**
 * 13. 罗马数字转整数
 * https://leetcode.cn/problems/roman-to-integer/description
 *
 * @description
 * 输入 1994
 * 输出 "M CM XC IV"
 *
 * Math.floor 向下取整
 * Math.ceil  向上取整
 */
let intToRoman: (num: number) => string;

/**
 * 数学模拟
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(1)
 */
intToRoman = (num: number): string => {
    const symbolList: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    const roman = [];
    for (const [intValue, symbolStr] of symbolList) {
        while (num >= intValue) {
            num -= intValue;
            roman.push(symbolStr);
        }
        if (num === 0) {
            break;
        }
    }
    return roman.join("");
};

/**
 * 求余 + 硬编码数字
 *
 * @description
 * 时间复杂度 O(1)
 * 空间复杂度 O(1)
 */
intToRoman = (num: number): string => {
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    const roman = [];
    roman.push(thousands[Math.floor(num / 1000)]);
    roman.push(hundreds[Math.floor((num % 1000) / 100)]);
    roman.push(tens[Math.floor((num % 100) / 10)]);
    roman.push(ones[num % 10]);

    return roman.join("");
};

test(`官方例子`, () => {
    return is(
        //
        intToRoman(3),
        //
        "III",
    );
});
test(`官方例子`, () => {
    return is(
        //
        intToRoman(1994),
        // M = 1000, CM = 900, XC = 90, IV = 4
        "MCMXCIV",
    );
});
