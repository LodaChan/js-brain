import {test, is} from "./libs/unit-test";

/**
 * 200. 岛屿数量
 * https://leetcode.cn/problems/number-of-islands/description
 * 
 * 1是陆地
 * 0是海洋
 * 
 * @description
 * 输入 grid = [
     ["1","1","1","1","0"],
     ["1","1","0","1","0"],
     ["1","1","0","0","0"],
     ["0","0","0","0","0"]
   ]
 * 输出 1
 * 
 * 输入 grid = [
     ["1","1","0","0","0"],
     ["1","1","0","0","0"],
     ["0","0","1","0","0"],
     ["0","0","0","1","1"]
   ]
 * 输出 3
 */

let numIslands: (grid: string[][]) => number;

/**
 * 深度优先 + 标记
 *
 * @description
 * 时间复杂度 O(N) , N = xCount * yCount
 * 空间复杂度 O(N) , N = xCount * yCount
 */
numIslands = (grid: string[][]): number => {
    let output = 0;

    let yCount = grid.length;
    if (yCount == 0) {
        return (output = 0);
    }
    let xCount = grid[0].length;

    const _DFSFunc = (grid: string[][], yIndex: number, xIndex: number) => {
        // 越界处理
        if (yIndex < 0 || xIndex < 0 || yIndex >= yCount || xIndex >= xCount) {
            return;
        }
        //当遇到海洋0时就跳出不继续递归
        if (grid[yIndex][xIndex] === "0") {
            return;
        }

        // 将连续的陆地1改为海洋0
        grid[yIndex][xIndex] = "0";

        // 上
        _DFSFunc(grid, yIndex + 1, xIndex);
        // 下
        _DFSFunc(grid, yIndex - 1, xIndex);
        // 右
        _DFSFunc(grid, yIndex, xIndex + 1);
        // 左
        _DFSFunc(grid, yIndex, xIndex - 1);
    };

    for (let yIndex = 0; yIndex < yCount; yIndex++) {
        for (let xIndex = 0; xIndex < xCount; xIndex++) {
            if (grid[yIndex][xIndex] === "1") {
                output++;

                // 遇到一个陆地标记1 , 通过计数后递归将相连的陆地全部变成海洋0
                _DFSFunc(grid, yIndex, xIndex);
            }
        }
    }

    return output;
};
