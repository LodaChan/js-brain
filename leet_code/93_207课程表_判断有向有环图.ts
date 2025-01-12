import {test, is} from "./libs/unit-test";

/**
 * 207. 课程表
 * https://leetcode.cn/problems/course-schedule/description
 *
 * 构建有向图
 * 判断是否是有向有环图
 * {toCourseIndex: 1, fromCourseIndex: 0};
 * {toCourseIndex: 0, fromCourseIndex: 1};
 *
 * @description
 * 输入 numCourses = 2 prerequisites = [[课程1,课程0]]
 * 输出 true
 * 共2门课程
 * 学习课程1前必须学习课程0
 */

let canFinish: (numCourses: number, prerequisites: number[][]) => boolean;

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 * 空间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 */
canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const coursePrerequisitesHashMap: number[][] = [];

    // 存储节点的访问状态 , 0 表示未访问 , 1 表示正在访问 , 2 表示已访问
    let courseVisitedStateHashMap: number[] = [];

    let output = true;

    const _DFSFunc = (courseIndex: number): void => {
        courseVisitedStateHashMap[courseIndex] = 1;

        for (let toCourseIndex of coursePrerequisitesHashMap[courseIndex]) {
            // 未访问继续递归
            if (courseVisitedStateHashMap[toCourseIndex] === 0) {
                _DFSFunc(toCourseIndex);

                if (output === false) {
                    return;
                }
            }
            // 有超前依赖
            else if (courseVisitedStateHashMap[toCourseIndex] === 1) {
                output = false;
                return;
            }
        }

        courseVisitedStateHashMap[courseIndex] = 2;
    };

    // 初始化 coursePrerequisitesHashMap
    for (let courseIndex = 0; courseIndex < numCourses; courseIndex++) {
        coursePrerequisitesHashMap.push([]);
    }

    // 填充 课程依赖关系 到 coursePrerequisitesHashMap
    for (let [toCourseIndex, fromCourseIndex] of prerequisites) {
        coursePrerequisitesHashMap[fromCourseIndex].push(toCourseIndex);
    }

    courseVisitedStateHashMap = new Array(numCourses).fill(0);

    for (let courseIndex = 0; courseIndex < numCourses && output === true; courseIndex++) {
        // 如果课程是 0 表示未访问
        if (courseVisitedStateHashMap[courseIndex] === 0) {
            _DFSFunc(courseIndex);
        }
    }

    return output;
};

/**
 * 广度优先
 *
 * @description
 * 时间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 * 空间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 */
canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    let coursePrerequisitesHashMap: number[][] = [];
    // 存储入度信息
    let fromCourseHashMap: number[] = [];

    for (let courseIndex = 0; courseIndex < numCourses; ++courseIndex) {
        coursePrerequisitesHashMap.push([]);
    }
    fromCourseHashMap = new Array(numCourses).fill(0);

    for (let [toCourseIndex, fromCourseIndex] of prerequisites) {
        coursePrerequisitesHashMap[fromCourseIndex].push(toCourseIndex);
        fromCourseHashMap[toCourseIndex]++;
    }

    let queue = [];

    for (let courseIndex = 0; courseIndex < numCourses; ++courseIndex) {
        if (fromCourseHashMap[courseIndex] === 0) {
            queue.push(courseIndex);
        }
    }

    let visited = 0;

    while (queue.length > 0) {
        visited++;

        let curNode = queue.shift()!;

        for (let toCourseIndex of coursePrerequisitesHashMap[curNode]) {
            fromCourseHashMap[toCourseIndex]--;

            if (fromCourseHashMap[toCourseIndex] === 0) {
                queue.push(toCourseIndex);
            }
        }
    }

    return visited === numCourses;
};
