/**
 * 求组合
 * C(n, m) = n! / ((n - m)! * m!)
 */

/**
 * 递推 + 递归 + 回溯
 */
const getCombinations1 = (arr: number[], m: number): number[][] => {
    let output = [];

    const _recursiveFunc = (startIndex: number, currentCombination: number[]) => {
        if (currentCombination.length === m) {
            output.push([...currentCombination]);

            return;
        }

        for (let index = startIndex; index < arr.length; index++) {
            currentCombination.push(arr[index]);

            _recursiveFunc(index + 1, currentCombination);

            // 回溯 , 对 currentCombination 加入的数据 arr[index] 进行删除回退 , 不影响 index+1 的下次循环
            currentCombination.pop();
        }
    };

    _recursiveFunc(0, []);

    return output;
};

/**
 *  递推 + 递归
 */
const getCombinations2 = (arr: number[], m: number): number[][] => {
    const _getSubsetsFunc = (arr: number[], index: number): number[][] => {
        if (index === arr.length) {
            return [[]];
        }

        const subsets = _getSubsetsFunc(arr, index + 1);

        const output = [];

        subsets.forEach((subset) => {
            output.push(subset);
            output.push([arr[index], ...subset]);
        });

        return output;
    };

    const allSubsets = _getSubsetsFunc(arr, 0);
    return allSubsets.filter((subset) => subset.length === m);
};

/**
 * 模拟 + 位运算
 */
const getCombinations3 = (arr: number[], m: number): number[][] => {
    const output = [];

    /**
     * 包含个元素的集合 , 其所有可能的组合情况数量 2^n
     */
    const maxCombinationCount = Math.pow(2, arr.length);

    for (let combinationIndex = 0; combinationIndex < maxCombinationCount; combinationIndex++) {
        const currentCombination = [];
        let currentCombinationCounter = 0;

        for (let index = 0; index < arr.length; index++) {
            // 判断第 index 个元素是否在 combinationIndex 的组合中
            if ((combinationIndex & (1 << index)) !== 0) {
                currentCombination.push(arr[index]);
                currentCombinationCounter++;
            }
        }

        if (currentCombinationCounter === m) {
            output.push(currentCombination);
        }
    }

    return output;
};

const inputArr = [0, 1, 2, 3];

const combinations1 = getCombinations1(inputArr, 3);
console.log(combinations1);

const combinations2 = getCombinations2(inputArr, 3);
console.log(combinations2);

const combinations3 = getCombinations3(inputArr, 3);
console.log(combinations3);
// [
//     [0, 1, 2],
//     [0, 1, 3],
//     [0, 2, 3],
//     [1, 2, 3],
// ];
