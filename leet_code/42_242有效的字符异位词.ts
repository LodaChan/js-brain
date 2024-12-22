import {test, is} from "./libs/unit-test";

/**
 * 242. 有效的字符异位词
 * https://leetcode.cn/problems/valid-anagram/description
 *
 * str2是由str1的字母构建而成
 *
 * @description
 * 输入 s = "anagram", t = "nagaram"
 * 输出 true
 */
let isAnagram: (str1: string, str2: string) => boolean;

/**
 * 哈希表 + 计数
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(|∑|) , |∑| 是 str1 字符集的大小
 */
isAnagram = (str1: string, str2: string): boolean => {
    let output = false;

    const charCountHashMap: Map<string, number> = new Map();

    // 对字符1的字母进行计数
    for (let char1 of str1) {
        if (charCountHashMap.has(char1) === true) {
            charCountHashMap.set(char1, charCountHashMap.get(char1) + 1);
        } else {
            charCountHashMap.set(char1, 1);
        }
    }

    // 对字符2的字母进行减数
    for (let char2 of str2) {
        if (charCountHashMap.has(char2) === true) {
            const newCount = charCountHashMap.get(char2) - 1;
            charCountHashMap.set(char2, newCount);

            // 多了字符
            if (newCount < 0) {
                return (output = false);
            }
            // 用完了字符次数 , 更新哈希表
            else if (newCount === 0) {
                charCountHashMap.delete(char2);
            }
        } else {
            return (output = false);
        }
    }

    return (output = charCountHashMap.size === 0 ? true : false);
};

test(`官方例子`, () => {
    return is(
        isAnagram("anagram", "nagaram"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        isAnagram("rat", "car"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        isAnagram("ab", "a"),
        //
        false,
    );
});
