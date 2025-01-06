import {test, is} from "./libs/unit-test";

/**
 * 49. 字母异位词分组
 * https://leetcode.cn/problems/group-anagrams/description
 *
 * for (let [key, value] of MapObj)
 * for (let [key, value] of MapObj.entries())
 * Array.from(MapObj.values()))
 *
 * @description
 * 输入 strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出 [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
let groupAnagrams: (strs: string[]) => string[][];

/**
 * 排序 + 新标识符
 *
 * @description
 * 时间复杂度 O(n * k * logk) , k 是 strs 中的字符串的的最大长度
 * 空间复杂度 O(n * k)
 */
groupAnagrams = (strs: string[]): string[][] => {
    let output = [];

    const skeletonHashMap: Map<string, string[]> = new Map();

    for (let word of strs) {
        const skeleton = Array.from(word).sort().toString();

        if (skeletonHashMap.has(skeleton) === false) {
            skeletonHashMap.set(skeleton, [word]);
        } else {
            skeletonHashMap.set(skeleton, [...skeletonHashMap.get(skeleton), word]);
        }
    }

    return (output = Array.from(skeletonHashMap.values()));
};

/**
 * 计数 + 新标识符
 *
 * @description
 * 时间复杂度 O(n * ( k +∣Σ∣)) , k 是 strs 中的字符串的的最大长度 Σ 是字符集
 * 空间复杂度 O(n * ( k +∣Σ∣)) , k 是 strs 中的字符串的的最大长度 Σ 是字符集
 */
groupAnagrams = (strs: string[]): string[][] => {
    let output = [];

    const map = new Object();
    for (let word of strs) {
        const count = new Array<number>(26).fill(0);

        for (let char of word) {
            count[char.charCodeAt(0) - 97]++;
        }

        const skeleton = count.toString();

        map[skeleton] ? map[skeleton].push(word) : (map[skeleton] = [word]);
    }
    return (output = Object.values(map));
};

test(`官方例子`, () => {
    return is(
        groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]),
        //
        [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
    );
});
test(`官方例子`, () => {
    return is(
        groupAnagrams(["a"]),
        //
        [["a"]],
    );
});
test(`官方例子`, () => {
    return is(
        groupAnagrams([""]),
        //
        [[""]],
    );
});
