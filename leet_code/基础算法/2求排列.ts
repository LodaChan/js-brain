/**
 * 求排列
 * A(n, m) = n! / (n-m)!
 */

/**
 * 递归 + 交换元素 + 回溯
 */
const getPermutation1 = (arr: number[]): number[][] => {
    const output = [];

    const _recursiveFunc = (leftIndex: number, rightIndex: number) => {
        if (leftIndex === rightIndex) {
            output.push([...arr]);

            return;
        }
        for (let index = leftIndex; index < rightIndex; index++) {
            // 交换元素
            [arr[leftIndex], arr[index]] = [arr[index], arr[leftIndex]];

            _recursiveFunc(leftIndex + 1, rightIndex);

            // 回溯 , 还原交换
            [arr[leftIndex], arr[index]] = [arr[index], arr[leftIndex]];
        }
    };

    _recursiveFunc(0, arr.length);

    return output;
};

const testArr = [0, 1, 2];

const permutation1 = getPermutation1(testArr);
console.log(permutation1);

// [
//     [0, 1, 2],
//     [0, 2, 1],
//     [1, 0, 2],
//     [1, 2, 0],
//     [2, 1, 0],
//     [2, 0, 1],
// ];
