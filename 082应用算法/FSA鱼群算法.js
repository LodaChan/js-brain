// # 鱼群算法（Fish Swarm Algorithm，FSA）

// 是一种基于自然界中鱼群行为的群智能算法。它模拟了鱼群在寻找食物、逃避捕食者以及保持群体整洁等行为时的决策过程。这个算法是由中国科学家在 2002 年提出的。

// 鱼群算法主要包括以下几个步骤：

// 1. 初始化：随机生成一定数量的"鱼"（即候选解），并给它们赋予初始位置和状态。

// 2. 觅食行为：每条鱼根据视野范围内的情况做出前进、追逐或逃避的决策。

//    - 前进：随机改变游动方向和步长，以探索新的区域。
//    - 追逐：朝向视野内食物浓度最高的方向游动。
//    - 逃避：远离视野内捕食者的方向游动。

// 3. 聚集行为：根据邻近鱼的位置信息，调整自身位置以维持群体整洁。

// 4. 种群更新：根据每条鱼的适应度，对整个种群进行更新和优化。

// 5. 终止条件检查：如果达到最大迭代次数或满足其他终止条件，则算法结束；否则返回步骤 2 继续迭代。

// 鱼群算法的优点包括：

// 1. 易于实现和并行化
// 2. 不需要过多的参数设置
// 3. 具有良好的全局搜索能力
// 4. 适用于各种优化问题

// 鱼群算法被广泛应用于优化、决策支持、模式识别等领域。它是一种有效的群智能算法,与遗传算法、粒子群优化算法 等相比都有自己的特点和优势。

// 总的来说,鱼群算法是一种启发式的群智能优化算法,模拟了自然界中鱼群的集体智慧,为我们解决复杂问题提供了新的思路和方法。

const fishCount = 50; // 鱼的数量
const D = 2; // 搜索的维度
const tryCount = 300; // 迭代次数
const c1 = 1; // 导航者权重
const c2 = 1; // 追随者权重
 
let fishes = new Array(fishCount).fill(0).map(() => new Array(D).fill(0).map(() => Math.random() * 100));
let velocity = new Array(fishCount).fill(0).map(() => new Array(D).fill(0).map(() => 0));
let bestFish = fishes.map(f => f.slice());
let globalBest = bestFish.slice();
 
for (let tryTime = 0; tryTime < tryCount; tryTime++) {
    for (let fishItemIndex = 0; fishItemIndex < fishCount; fishItemIndex++) {
        // 更新速度
        for (let k = 0; k < D; k++) {
            velocity[fishItemIndex][k] = c1 * Math.random() * (bestFish[fishItemIndex][k] - fishes[fishItemIndex][k]) + c2 * Math.random() * (globalBest[k] - fishes[fishItemIndex][k]);
        }
        
        // 更新位置
        for (let k = 0; k < D; k++) {
            fishes[fishItemIndex][k] += velocity[fishItemIndex][k];
        }
        
        // 更新个体最优
        if (getCostFunc(fishes[fishItemIndex]) < getCostFunc(bestFish[fishItemIndex])) {
            bestFish[fishItemIndex] = fishes[fishItemIndex].slice();
        }
        
        // 更新全局最优
        if (getCostFunc(bestFish[fishItemIndex]) < getCostFunc(globalBest)) {
            globalBest = bestFish[fishItemIndex].slice();
        }
    }
    console.log(getCostFunc(globalBest));
}
 
function getCostFunc(x) {
    // 示例代价函数，可以根据需要进行更改
    return x.reduce((a, b) => a + b * b, 0);
}