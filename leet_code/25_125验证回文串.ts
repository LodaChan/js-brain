import {test, is} from "./libs/unit-test";

/**
 * 125. 验证回文串
 * https://leetcode.cn/problems/valid-palindrome/description
 *
 * utf-8 编码
 * " " 十进制是 32
 * a   十进制是 97
 * z   十进制是 122
 * String.fromCharCode(97) 得到a
 * "a".charCodeAt(0) 得到97
 * @description
 * 输入 "A man, a plan, a canal: Panama"
 * 输出 true
 */
let isPalindrome: (str: string) => boolean;

/**
 * 模拟
 * @description
 * 时间复杂度 O(∣s∣) 其实就是 O(n)
 * 空间复杂度 O(1)
 */
isPalindrome = (str: string): boolean => {
    let output = true;

    if (str.length === 0) {
        return (output = false);
    }

    str = str.toLowerCase();

    const charHashMap: Map<string, number> = new Map();

    // 0-9
    for (let numValue = 0; numValue <= 9; numValue++) {
        charHashMap.set(`${numValue}`, `${numValue}`.charCodeAt(0));
    }
    // a-z
    for (let charCode = 97; charCode <= 122; charCode++) {
        charHashMap.set(String.fromCharCode(charCode), charCode);
    }

    let leftIndex = 0;
    let rightIndex = str.length - 1;

    while (leftIndex < rightIndex) {
        let leftChar = str[leftIndex];

        if (charHashMap.has(leftChar) === true) {
        } else {
            leftIndex++;
            continue;
        }

        let rightChar = str[rightIndex];
        if (charHashMap.has(rightChar) === true) {
        } else {
            rightIndex--;
            continue;
        }

        if (leftChar !== rightChar) {
            return (output = false);
        } else {
            leftIndex++;
            rightIndex--;
        }
    }

    return output;
};

test(`官方例子`, () => {
    return is(
        // 1个空格
        isPalindrome(" "),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isPalindrome("0P"),
        //  "0p"
        false,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isPalindrome("A man, a plan, a canal: Panama"),
        //  "amanaplanacanalpanama"
        true,
    );
});
test(`官方例子`, () => {
    return is(
        //
        isPalindrome("race a car"),
        //  "raceacar"
        false,
    );
});
