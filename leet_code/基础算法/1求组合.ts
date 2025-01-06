/**
 * 求组合
 * C(n, m) = n! / ((n - m)! * m!)
 */

/**
 * 递推 + 递归 + 回溯
 */
const getCombinations1 = (nums: number[], m: number): number[][] => {
    let output: number[][] = [];

    const _recursiveFunc = (startIndex: number, refCombination: number[]) => {
        if (refCombination.length === m) {
            output.push([...refCombination]);

            return;
        }

        for (let index = startIndex; index < nums.length; index++) {
            refCombination.push(nums[index]);

            _recursiveFunc(index + 1, refCombination);

            // 回溯 , 对 currentCombination 加入的数据 arr[index] 进行删除回退 , 不影响 index+1 的下次循环
            refCombination.pop();
        }
    };

    _recursiveFunc(0, []);

    return output;
};

/**
 *  递推 + 递归
 */
const getCombinations2 = (nums: number[], m: number): number[][] => {
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

    const allSubsets = _getSubsetsFunc(nums, 0);
    return allSubsets.filter((subset) => subset.length === m);
};

/**
 * 模拟 + 位运算
 */
const getCombinations3 = (nums: number[], m: number): number[][] => {
    const output = [];

    /**
     * 包含个元素的集合 , 其所有可能的组合情况数量 2^n
     */
    const maxCombinationCount = Math.pow(2, nums.length);

    for (let combinationIndex = 0; combinationIndex < maxCombinationCount; combinationIndex++) {
        const chunkCombination = [];
        let chunkCombinationCounter = 0;

        for (let index = 0; index < nums.length; index++) {
            // 判断第 index 个元素是否在 combinationIndex 的组合中
            if ((combinationIndex & (1 << index)) !== 0) {
                chunkCombination.push(nums[index]);
                chunkCombinationCounter++;
            }
        }

        if (chunkCombinationCounter === m) {
            output.push(chunkCombination);
        }
    }

    return output;
};

const testArr = [0, 1, 2, 3];

const combinations1 = getCombinations1(testArr, 3);
console.log(combinations1);

const combinations2 = getCombinations2(testArr, 3);
console.log(combinations2);

const combinations3 = getCombinations3(testArr, 3);
console.log(combinations3);
// [
//     [0, 1, 2],
//     [0, 1, 3],
//     [0, 2, 3],
//     [1, 2, 3],
// ];
