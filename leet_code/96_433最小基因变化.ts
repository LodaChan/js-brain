import {test, is} from "./libs/unit-test";

/**
 * 433. 最小基因变化
 * https://leetcode.cn/problems/minimum-genetic-mutation/description
 *
 * "AACCGGTT" > "AACCGGTA" 就是一次基因变化
 * 基因库 bank 记录了所有有效的基因变化 , 只有基因库中的基因才是有效的基因序列
 *
 * @description
 * 输入 start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
 * 输出 1
 *
 * 输入 start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
 * 输出 2
 */

let minMutation: (startGene: string, endGene: string, bank: string[]) => number;

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(C * n * m) n 为基因序列的长度 , m 为数组 bank 的长度 , C=4
 * 空间复杂度 O(n * m)
 */
minMutation = (startGene: string, endGene: string, bank: string[]): number => {
    const bankSet = new Set();
    const visitedSet = new Set();

    const keys = ["A", "C", "G", "T"];
    for (const geneItem of bank) {
        bankSet.add(geneItem);
    }

    if (startGene === endGene) {
        return 0;
    }

    // 如果结束基因没在基因库 , 肯定是无法确定基因数
    if (bankSet.has(endGene) === false) {
        return -1;
    }

    const queue = [startGene];
    visitedSet.add(startGene);

    let changeCount = 1;

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const curGene = queue.shift();

            for (let j = 0; j < 8; j++) {
                for (let k = 0; k < 4; k++) {
                    if (curGene[j] !== keys[k]) {
                        const cloneCurGene = [...curGene];
                        cloneCurGene[j] = keys[k];
                        const nextGene = cloneCurGene.join("");

                        if (visitedSet.has(nextGene) === false && bankSet.has(nextGene) === true) {
                            if (nextGene === endGene) {
                                return changeCount;
                            }

                            queue.push(nextGene);
                            visitedSet.add(nextGene);
                        }
                    }
                }
            }
        }

        changeCount++;
    }

    return (changeCount = -1);
};

/**
 * 预先处理 + 广度优先
 *
 * @description
 * 时间复杂度 O(m * n^2) , m 为基因序列的长度 , n 为数组 bank 的长度
 * 空间复杂度 O(n^2) , n 为数组 bank 的长度
 */
minMutation = (startGene: string, endGene: string, bank: string[]): number => {
    const m = startGene.length;
    const n = bank.length;

    const adj = new Array(n).fill(0).map(() => new Array());

    let endIndex = -1;

    // 预处理
    for (let i = 0; i < n; i++) {
        if (endGene === bank[i]) {
            endIndex = i;
        }

        for (let j = i + 1; j < n; j++) {
            let mutations = 0;
            for (let k = 0; k < m; k++) {
                if (bank[i][k] !== bank[j][k]) {
                    mutations++;
                }
                if (mutations > 1) {
                    break;
                }
            }

            if (mutations === 1) {
                adj[i].push(j);
                adj[j].push(i);
            }
        }
    }

    if (endIndex === -1) {
        return -1;
    }

    const queue = [];
    const visited = new Array(n).fill(0);

    let step = 1;

    for (let i = 0; i < n; i++) {
        let mutationsCount = 0;

        for (let k = 0; k < m; k++) {
            if (startGene[k] !== bank[i][k]) {
                mutationsCount++;
            }
            if (mutationsCount > 1) {
                break;
            }
        }

        if (mutationsCount === 1) {
            queue.push(i);
            visited[i] = true;
        }
    }

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const curIndex = queue.shift();

            if (curIndex === endIndex) {
                return step;
            }

            for (const nextGene of adj[curIndex]) {
                if (visited[nextGene] === true) {
                    continue;
                }

                visited[nextGene] = true;
                queue.push(nextGene);
            }
        }

        step++;
    }

    return -1;
};
