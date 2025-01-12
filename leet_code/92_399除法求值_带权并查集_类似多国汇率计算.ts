import {test, is} from "./libs/unit-test";

/**
 * 399. 除法求值
 * https://leetcode.cn/problems/evaluate-division/description
 *
 * 问题1如何构建带权图
 * 问题2解决动态连通性 a / c = (a / b) * (b / c)
 * 问题3处理等价关系 vba = 1 / vab
 *
 * 带权并查集
 * 等式相等具有传递关系 , 即存在倍数关系
 * 只关注连通关系不关注连通过程
 * 一边查询一边修改结点的指向是并查集的特色
 *
 * 实践 :
 * 汇率换算
 * 1美元 = 157.6570 日元
 * 1人民币 = 21.4950 日元
 * 1英镑 = 1.2204 美元
 * 问 1人民币 = ? 英镑
 *
 * @description
 * 输入 equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 * 输出 [6.00000,0.50000,-1.00000,1.00000,-1.00000]
 *
 * 条件：a / b = 2.0  ,  b / c = 3.0
 * 问题：a / c = ? ,  b / a = ? ,  a / e = ? ,  a / a = ? ,  x / x = ?
 * 结果：[ a / c = 6.0 , b / a =  0.5 ,  a / e =  -1.0 , a / a  = 1.0 ,  x / x = -1.0 ]
 * 注意：e , x 是未定义的 且作为分母 => -1.0
 */

let calcEquation: (equations: string[][], values: number[], queries: string[][]) => number[];

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(M * L + Q * ⋅(L + M)) , 其中 M 为边的数量 , L 为字符串的平均长度 , Q 为询问的数量
 * 空间复杂度 O(N * L + M)  , 其中 N 为点的数量 , L 为字符串的平均长度 ,  M 为边的数量
 */
calcEquation = (equations: string[][], values: number[], queries: string[][]): number[] => {
    let maxWeight = 0;

    const equationHashMap = new Map();
    const equationCount = equations.length;

    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        if (equationHashMap.has(equations[equationIndex][0]) === false) {
            equationHashMap.set(equations[equationIndex][0], maxWeight++);
        }
        if (equationHashMap.has(equations[equationIndex][1]) === false) {
            equationHashMap.set(equations[equationIndex][1], maxWeight++);
        }
    }

    const equationEdgeHashMap = new Array(maxWeight).fill(0);
    for (let equationIndex = 0; equationIndex < maxWeight; equationIndex++) {
        equationEdgeHashMap[equationIndex] = [];
    }
    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        const va = equationHashMap.get(equations[equationIndex][0]);
        const vb = equationHashMap.get(equations[equationIndex][1]);

        // [va,vab]
        equationEdgeHashMap[va].push([vb, values[equationIndex]]);
        // [vb,vba]
        equationEdgeHashMap[vb].push([va, 1.0 / values[equationIndex]]);
    }

    const output = [];

    const queryCount = queries.length;
    for (let queryIndex = 0; queryIndex < queryCount; queryIndex++) {
        const queryItem = queries[queryIndex];
        let result = -1.0;

        // 分子分母都有参考
        if (equationHashMap.has(queryItem[0]) === true && equationHashMap.has(queryItem[1]) === true) {
            const va = equationHashMap.get(queryItem[0]);
            const vb = equationHashMap.get(queryItem[1]);

            // 分子分母相同
            if (va === vb) {
                result = 1.0;
            }
            // 分子分母不相同
            else {
                // 通过广度优先的方式 , 不断更新起点与当前点之间的路径长度 , 直到搜索到终点为止
                const stack = [];
                stack.push(va);

                const points = new Array(maxWeight).fill(-1.0);
                points[va] = 1.0;

                while (stack.length > 0 && points[vb] < 0) {
                    const vx = stack.pop();

                    for (const [vy, vxy] of equationEdgeHashMap[vx]) {
                        if (points[vy] < 0) {
                            points[vy] = points[vx] * vxy;
                            stack.push(vy);
                        }
                    }
                }

                result = points[vb];
            }
        }

        output[queryIndex] = result;
    }

    return output;
};

/**
 * 广度优先 + Floyd 弗洛伊德算法 - 预先求解图中所有顶点对之间最短路径的动态规划算法
 *
 * @description
 * 时间复杂度 O(M * L + N^3 + Q * L) , 其中 M 为边的数量 , L 为字符串的平均长度 , N 为点的数量 , Q 为询问的数量
 * 空间复杂度 O(N * L + N^2) , 其中 M 为边的数量 , L 为字符串的平均长度 , N 为点的数量
 */
calcEquation = (equations: string[][], values: number[], queries: string[][]): number[] => {
    let maxWeight = 0;

    const equationHashMap = new Map();
    const equationCount = equations.length;

    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        if (equationHashMap.has(equations[equationIndex][0]) === false) {
            equationHashMap.set(equations[equationIndex][0], maxWeight++);
        }
        if (equationHashMap.has(equations[equationIndex][1]) === false) {
            equationHashMap.set(equations[equationIndex][1], maxWeight++);
        }
    }

    // 预先计算出任意两点之间的距离
    const equationEdgeHashMap = new Array(maxWeight).fill(0).map(() => new Array(maxWeight).fill(-1.0));
    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        const va = equationHashMap.get(equations[equationIndex][0]);
        const vb = equationHashMap.get(equations[equationIndex][1]);
        equationEdgeHashMap[va][vb] = values[equationIndex];
        equationEdgeHashMap[vb][va] = 1.0 / values[equationIndex];
    }
    for (let weightIndex = 0; weightIndex < maxWeight; weightIndex++) {
        for (let i = 0; i < maxWeight; i++) {
            for (let j = 0; j < maxWeight; j++) {
                if (equationEdgeHashMap[i][weightIndex] > 0 && equationEdgeHashMap[weightIndex][j] > 0) {
                    equationEdgeHashMap[i][j] = equationEdgeHashMap[i][weightIndex] * equationEdgeHashMap[weightIndex][j];
                }
            }
        }
    }

    const queryCount = queries.length;

    const output = new Array(queryCount).fill(0);

    for (let queryIndex = 0; queryIndex < queryCount; queryIndex++) {
        const queryItem = queries[queryIndex];

        let result = -1.0;

        if (equationHashMap.has(queryItem[0]) === true && equationHashMap.has(queryItem[1]) === true) {
            const va = equationHashMap.get(queryItem[0]);
            const vb = equationHashMap.get(queryItem[1]);
            if (equationEdgeHashMap[va][vb] > 0) {
                result = equationEdgeHashMap[va][vb];
            }
        }

        output[queryIndex] = result;
    }

    return output;
};

/**
 * 带权并查集
 *
 * 等式相等具有传递关系 , 即存在倍数关系
 * 只关注连通关系不关注连通过程
 * 一边查询一边修改结点的指向是并查集的特色
 *
 * @description
 * 时间复杂度 O(M * L + N + M * logN + Q⋅ * (L + logN)) , 其中 M 为边的数量 , L 为字符串的平均长度 , N 为点的数量 , Q 为询问的数量
 * 空间复杂度 O(N * L) , 其中 L 为字符串的平均长度 , N 为点的数量
 */
calcEquation = (equations: string[][], values: number[], queries: string[][]): number[] => {
    const _MergeFunc = (f: number[], w: number[], vx: number, vy: number, val: number) => {
        const fx = _FindFValueFunc(f, w, vx);
        const fy = _FindFValueFunc(f, w, vy);

        f[fx] = fy;
        w[fx] = (val * w[vy]) / w[vx];
    };

    const _FindFValueFunc = (f: number[], w: number[], vx: number) => {
        if (f[vx] !== vx) {
            const father = _FindFValueFunc(f, w, f[vx]);

            w[vx] = w[vx] * w[f[vx]];
            f[vx] = father;
        }

        return f[vx];
    };

    let maxWeight = 0;

    const equationHashMap = new Map();
    const equationCount = equations.length;

    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        if (equationHashMap.has(equations[equationIndex][0]) === false) {
            equationHashMap.set(equations[equationIndex][0], maxWeight++);
        }
        if (equationHashMap.has(equations[equationIndex][1]) === false) {
            equationHashMap.set(equations[equationIndex][1], maxWeight++);
        }
    }

    // [0, 1, ... , maxWeight - 1]
    const f = new Array(maxWeight).fill(0).map((val, index) => index);
    const w = new Array(maxWeight).fill(1.0);
    for (let equationIndex = 0; equationIndex < equationCount; equationIndex++) {
        const va = equationHashMap.get(equations[equationIndex][0]);
        const vb = equationHashMap.get(equations[equationIndex][1]);

        _MergeFunc(f, w, va, vb, values[equationIndex]);
    }

    const queryCount = queries.length;

    const output = new Array(queryCount).fill(0);

    for (let queryIndex = 0; queryIndex < queryCount; queryIndex++) {
        const queryItem = queries[queryIndex];
        let result = -1.0;

        if (equationHashMap.has(queryItem[0]) === true && equationHashMap.has(queryItem[1]) === true) {
            const va = equationHashMap.get(queryItem[0]);
            const vb = equationHashMap.get(queryItem[1]);

            const fa = _FindFValueFunc(f, w, va);
            const fb = _FindFValueFunc(f, w, vb);

            if (fa === fb) {
                result = w[va] / w[vb];
            }
        }

        output[queryIndex] = result;
    }

    return output;
};
