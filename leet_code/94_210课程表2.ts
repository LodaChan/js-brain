import {test, is} from "./libs/unit-test";

/**
 * 210. 课程表 II
 * https://leetcode.cn/problems/course-schedule-ii/description
 *
 * 转换为有向无环图的层次遍历
 *
 * @description
 * 输入 numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * 输出 [0,2,1,3] 或 [0,1,2,3]
 * 总共有 4 门课程
 * 要学习课程 3 , 你应该先完成课程 1 和课程 2
 * 并且课程 1 和课程 2 都应该排在课程 0 之后
 * 因此 一个正确的课程顺序是 [0,1,2,3]
 * 另一个正确的排序是 [0,2,1,3]
 */

let findOrder: (numCourses: number, prerequisites: number[][]) => number[];

/**
 * 深度优先
 *
 * @description
 * 时间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 * 空间复杂度 O(n + m) 其中 n 为课程数 , m 为先修课程的要求数
 */
findOrder = (numCourses: number, prerequisites: number[][]): number[] => {
    // 存储有向图
    let edges: number[][] = [];

    // 标记每个节点的状态：0=未搜索 , 1=搜索中 , 2=已完成
    let visited: number[] = [];

    // 用数组来模拟栈 , 下标 n-1 为栈底 , 0 为栈顶
    let output: number[] = [];

    // 判断有向图中是否有环
    let valid = true;
    // 栈下标
    let index: number;

    const _DFSFunc = (courseIndex: number) => {
        visited[courseIndex] = 1;

        // 搜索其相邻节点
        // 只要发现有环 , 立刻停止搜索
        for (let toCourseIndex of edges[courseIndex]) {
            // 如果「未搜索」那么搜索相邻节点
            if (visited[toCourseIndex] === 0) {
                _DFSFunc(toCourseIndex);

                if (valid === false) {
                    return;
                }
            }
            // 如果「搜索中」说明找到了环
            else if (visited[toCourseIndex] === 1) {
                valid = false;
                return;
            }
        }

        // 将节点标记为「已完成」
        visited[courseIndex] = 2;

        // 将节点入栈
        output[index] = courseIndex;
        index--;
    };

    for (let courseIndex = 0; courseIndex < numCourses; courseIndex++) {
        edges.push([]);
    }

    visited = new Array(numCourses).fill(0);
    output = new Array(numCourses);
    index = numCourses - 1;

    for (let [toCourseIndex, fromCourseIndex] of prerequisites) {
        edges[fromCourseIndex].push(toCourseIndex);
    }

    // 每次挑选一个「未搜索」的节点 , 开始进行深度优先搜索
    for (let courseIndex = 0; courseIndex < numCourses && valid === true; courseIndex++) {
        if (visited[courseIndex] === 0) {
            _DFSFunc(courseIndex);
        }
    }

    if (!valid) {
        return (output = []);
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
findOrder = (numCourses: number, prerequisites: number[][]): number[] => {
    let edges: number[][] = [];

    // 存储每个节点的入度
    let indeg: number[] = [];

    // 存储答案
    let output: number[] = [];
    // 答案下标
    let index: number = 0;

    // 初始化 edges 数组
    for (let courseIndex = 0; courseIndex < numCourses; ++courseIndex) {
        edges.push([]);
    }
    indeg = new Array(numCourses).fill(0);
    output = new Array(numCourses);

    for (let [toCourseIndex, fromCourseIndex] of prerequisites) {
        edges[fromCourseIndex].push(toCourseIndex);

        indeg[toCourseIndex]++;
    }

    // 使用数组来模拟队列
    let queue = [];

    // 将所有入度为 0 的节点放入队列中
    for (let courseIndex = 0; courseIndex < numCourses; ++courseIndex) {
        if (indeg[courseIndex] === 0) {
            queue.push(courseIndex);
        }
    }

    while (queue.length > 0) {
        let curNode = queue.shift()!;

        output[index++] = curNode;

        for (let toCourseIndex of edges[curNode]) {
            indeg[toCourseIndex]--;

            // 如果相邻节点 toCourseIndex 的入度为 0 , 就可以选 toCourseIndex 对应的课程了
            if (indeg[toCourseIndex] === 0) {
                queue.push(toCourseIndex);
            }
        }
    }

    if (index !== numCourses) {
        return (output = []);
    }

    return output;
};
