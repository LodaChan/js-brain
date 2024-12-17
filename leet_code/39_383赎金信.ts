import {test, is} from "./libs/unit-test";

/**
 * 383. 赎金信
 * https://leetcode.cn/problems/ransom-note/description
 *
 * @description
 * 输入 ransomNote = "a", magazine = "b"
 * 输出 false
 */
let canConstruct: (ransomNote: string, magazine: string) => boolean;

/**
 * 模拟
 *
 * @description
 * 时间复杂度 O(m + n)
 * 空间复杂度 O(|S|) , |S| = 26
 */
canConstruct = (ransomNote: string, magazine: string): boolean => {
    let output = false;

    const magazineHashMap = new Map();

    for (let charIndex = 0; charIndex < magazine.length; charIndex++) {
        const char = magazine[charIndex];
        if (magazineHashMap.has(char) === false) {
            magazineHashMap.set(char, 1);
        } else {
            magazineHashMap.set(char, magazineHashMap.get(char) + 1);
        }
    }

    for (let charIndex = 0; charIndex < ransomNote.length; charIndex++) {
        const char = ransomNote[charIndex];

        if (magazineHashMap.has(char) === false) {
            return (output = false);
        } else {
            magazineHashMap.set(char, magazineHashMap.get(char) - 1);

            if (magazineHashMap.get(char) === 0) {
                magazineHashMap.delete(char);
            }
        }
    }

    return (output = true);
};

test(`官方例子`, () => {
    return is(
        canConstruct("a", "b"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        canConstruct("aa", "ab"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        canConstruct("aa", "aab"),
        //
        true,
    );
});
