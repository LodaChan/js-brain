import {test, is} from "./libs/unit-test";

/**
 * 88. 合并两个有序数组
 * https://leetcode.cn/problems/merge-sorted-array/description/
 *
 * @description
 * 输入 [1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3
 * 输出 [1, 2, 3, 4, 5, 6]
 *
 * [].slice(start,end)
 * 不会改变原数组
 * 用途1:返回取值[start,index)
 *
 * [].splice(start,deleteCount,appendItem1,...,appendItemN)
 * 会改变原数组
 * 用途1:start前插
 * 用途2:start含后删,返回被移除的数组 [start,...,start+deleteCount-1]
 *
 * 惰性函数
 * 针对不同的业务,如多次执行 or 存在耗时较多的判断,那么可以将函数当作1个变量进行处理
 */
let merge: (nums1: number[], m: number, nums2: number[], n: number) => number[];

/**
 * 正向双指针 + 临时存储空间 + 重新赋值
 *
 * @description
 * 时间复杂度 O(m + n)
 * 空间复杂度 O(2)
 */
merge = (nums1: number[], m: number, nums2: number[], n: number): number[] => {
    console.log(`参数`, nums1);
    console.log(`参数`, nums2);

    let sorted = new Array(m + n).fill(0);

    let index1 = 0;
    let index2 = 0;
    let cur = 0;

    while (index1 < m || index2 < n) {
        if (index1 === m) {
            cur = nums2[index2];
            index2++;
        } else if (index2 === n) {
            cur = nums1[index1];
            index1++;
        } else if (nums1[index1] < nums2[index2]) {
            cur = nums1[index1];
            index1++;
        } else {
            cur = nums2[index2];
            index2++;
        }

        sorted[index1 + index2 - 1] = cur;
    }

    for (let index = 0; index < m + n; index++) {
        nums1[index] = sorted[index];
    }

    return nums1;
};

/**
 * 逆向双指针
 *
 * @description
 * 时间复杂度 O(m + n)
 * 空间复杂度 O(1)
 *
 * 1 num1后面有足够剩余空间容纳num2
 * 2
 * 任一时刻
 * num1中有 m-(index1+1) 个元素放到已用空间
 * num2中有 n-(index2+1) 个元素放到已用空间
 * num1中已用空间是 m+n-(index1+1)
 * 构建不等式 m+n-index1-1 >= m-index1-1 + n-index2-1
 * 简化后 index2 >= -1
 * 因为 index2 >= 0 , 所以
 * index1(含)右侧的已用空间足够容纳index1已插入的元素与index2已插入的元素
 * 不会产生index1未插入的元素被index2已插入的元素覆盖的问题
 */
merge = (nums1: number[], m: number, nums2: number[], n: number): number[] => {
    console.log(`参数`, nums1);
    console.log(`参数`, nums2);

    let index1 = m - 1;
    let index2 = n - 1;
    let tail = m + n - 1;
    let cur: number;

    while (index1 >= 0 || index2 >= 0) {
        //
        if (index1 === -1) {
            cur = nums2[index2];
            index2--;
        }
        //
        else if (index2 === -1) {
            cur = nums1[index1];
            index1--;
        }
        //
        else if (nums1[index1] > nums2[index2]) {
            cur = nums1[index1];
            index1--;
        }
        //
        else {
            cur = nums2[index2];
            index2--;
        }

        nums1[tail] = cur;
        tail--;
    }

    return nums1;
};

test(`正序,无交集`, () => {
    return is(
        //
        merge([1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3),
        //
        [1, 2, 3, 4, 5, 6],
    );
});
test(`倒序,无交集`, () => {
    return is(
        //
        merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3),
        //
        [1, 2, 3, 4, 5, 6],
    );
});

test(`正序,有交集`, () => {
    return is(
        //
        merge([1, 2, 3, 0, 0, 0], 3, [2, 3, 4], 3),
        //
        [1, 2, 2, 3, 3, 4],
    );
});
test(`倒序,有交集`, () => {
    return is(
        //
        merge([2, 3, 4, 0, 0, 0], 3, [1, 2, 3], 3),
        //
        [1, 2, 2, 3, 3, 4],
    );
});

test(`num1多元素,num2无元素`, () => {
    return is(
        //
        merge([1, 2, 3], 3, [], 0),
        //
        [1, 2, 3],
    );
});
test(`num1单元素,num2无元素`, () => {
    return is(
        //
        merge([1], 1, [], 0),
        //
        [1],
    );
});
test(`num1无元素,num2多元素`, () => {
    return is(
        //
        merge([0], 0, [1, 2, 3], 3),
        //
        [1, 2, 3],
    );
});
test(`num1无元素,num2单元素`, () => {
    return is(
        //
        merge([0], 0, [1], 1),
        //
        [1],
    );
});
test(`num1无元素,num2无元素`, () => {
    return is(
        //
        merge([0], 0, [], 0),
        //
        [0],
    );
});
