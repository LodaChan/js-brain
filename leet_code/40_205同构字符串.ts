import {test, is} from "./libs/unit-test";

/**
 * 205. 同构字符串
 * https://leetcode.cn/problems/isomorphic-strings/description
 *
 * @description
 * 输入 s = "egg", t = "add"
 * 输出 true
 */
let isIsomorphic: (str1: string, str2: string) => boolean;

/**
 * 索引 + 哈希表
 *
 * @description
 * 时间复杂度 O(n)
 * 空间复杂度 O(∣Σ∣) , ∣Σ∣是 str1与str2出现字符集大小
 */
isIsomorphic = (str1: string, str2: string): boolean => {
    let output = false;

    /**
     * 以字符为 key , 出现的索引列表为 value
     */
    const hashMap1: Map<string, number[]> = new Map();
    const hashMap2: Map<string, number[]> = new Map();

    for (let charIndex = 0; charIndex < str1.length; charIndex++) {
        // 处理 str1
        const char1 = str1[charIndex];

        if (hashMap1.has(char1) === true) {
            hashMap1.set(char1, [...hashMap1.get(char1), charIndex]);
        } else {
            hashMap1.set(char1, [charIndex]);
        }

        // 处理 str2
        const char2 = str2[charIndex];
        if (hashMap2.has(char2) === true) {
            hashMap2.set(char2, [...hashMap2.get(char2), charIndex]);
        } else {
            hashMap2.set(char2, [charIndex]);
        }

        // 不是同构的判断
        // 1 哈希表的长度
        // 2 当前字符对应出现的索引集合
        if (hashMap1.size !== hashMap2.size || JSON.stringify(hashMap1.get(char1)) !== JSON.stringify(hashMap2.get(char2))) {
            return (output = false);
        }
    }

    return (output = true);
};

test(`官方例子`, () => {
    return is(
        isIsomorphic("egg", "add"),
        //
        true,
    );
});
test(`官方例子`, () => {
    return is(
        isIsomorphic("foo", "foo"),
        //
        false,
    );
});
test(`官方例子`, () => {
    return is(
        isIsomorphic("badc", "baba"),
        //
        false,
    );
});
