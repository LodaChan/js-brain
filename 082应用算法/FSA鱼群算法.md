# 鱼群算法（Fish Swarm Algorithm，FSA）

是一种基于自然界中鱼群行为的群智能算法。它模拟了鱼群在寻找食物、逃避捕食者以及保持群体整洁等行为时的决策过程。这个算法是由中国科学家在 2002 年提出的。

鱼群算法主要包括以下几个步骤：

1. 初始化：随机生成一定数量的"鱼"（即候选解），并给它们赋予初始位置和状态。

2. 觅食行为：每条鱼根据视野范围内的情况做出前进、追逐或逃避的决策。

   - 前进：随机改变游动方向和步长，以探索新的区域。
   - 追逐：朝向视野内食物浓度最高的方向游动。
   - 逃避：远离视野内捕食者的方向游动。

3. 聚集行为：根据邻近鱼的位置信息，调整自身位置以维持群体整洁。

4. 种群更新：根据每条鱼的适应度，对整个种群进行更新和优化。

5. 终止条件检查：如果达到最大迭代次数或满足其他终止条件，则算法结束；否则返回步骤 2 继续迭代。

鱼群算法的优点包括：

1. 易于实现和并行化
2. 不需要过多的参数设置
3. 具有良好的全局搜索能力
4. 适用于各种优化问题

鱼群算法被广泛应用于优化、决策支持、模式识别等领域。它是一种有效的群智能算法,与遗传算法、粒子群优化算法等相比都有自己的特点和优势。

总的来说,鱼群算法是一种启发式的群智能优化算法,模拟了自然界中鱼群的集体智慧,为我们解决复杂问题提供了新的思路和方法。

```js
const numFish = 50;
const maxIterations = 100;
const c1 = 2;
const c2 = 2;
const c3 = 2;
const r1 = 0.5;
const r2 = 0.5;
const r3 = 0.5;
const lowerBound = 0;
const upperBound = 100;

// Initialize the fish population
let fish = [];
for (let i = 0; i < numFish; i++) {
  fish.push({
    position: [
      lowerBound + Math.random() * (upperBound - lowerBound),
      lowerBound + Math.random() * (upperBound - lowerBound),
    ],
    bestPosition: null,
    bestFitness: -Infinity,
    fitness: 0,
  });
}

// Define the fitness function
function fitness(position) {
  // Your fitness function here
  return -(position[0] * position[0] + position[1] * position[1]);
}

// Run the algorithm
for (let iteration = 0; iteration < maxIterations; iteration++) {
  // Forage behavior
  for (let i = 0; i < numFish; i++) {
    // Determine the movement direction
    const direction = [
      c1 * (fish[i].bestPosition?.[0] - fish[i].position[0]) +
        c2 *
          Math.random() *
          (fish.reduce(
            (best, fish) =>
              fitness(fish.position) > fitness(best.position) ? fish : best,
            fish[i]
          ).position[0] -
            fish[i].position[0]) +
        c3 *
          Math.random() *
          (lowerBound +
            Math.random() * (upperBound - lowerBound) -
            fish[i].position[0]),
      c1 * (fish[i].bestPosition?.[1] - fish[i].position[1]) +
        c2 *
          Math.random() *
          (fish.reduce(
            (best, fish) =>
              fitness(fish.position) > fitness(best.position) ? fish : best,
            fish[i]
          ).position[1] -
            fish[i].position[1]) +
        c3 *
          Math.random() *
          (lowerBound +
            Math.random() * (upperBound - lowerBound) -
            fish[i].position[1]),
    ];

    // Update the position
    fish[i].position[0] = Math.max(
      lowerBound,
      Math.min(upperBound, fish[i].position[0] + r1 * direction[0])
    );
    fish[i].position[1] = Math.max(
      lowerBound,
      Math.min(upperBound, fish[i].position[1] + r2 * direction[1])
    );

    // Update the fitness
    fish[i].fitness = fitness(fish[i].position);

    // Update the best position
    if (fish[i].fitness > fish[i].bestFitness) {
      fish[i].bestPosition = [...fish[i].position];
      fish[i].bestFitness = fish[i].fitness;
    }
  }

  // Swarm behavior
  for (let i = 0; i < numFish; i++) {
    const center = fish
      .reduce(
        (sum, fish) => {
          sum[0] += fish.position[0];
          sum[1] += fish.position[1];
          return sum;
        },
        [0, 0]
      )
      .map((c) => c / numFish);

    fish[i].position[0] = Math.max(
      lowerBound,
      Math.min(
        upperBound,
        fish[i].position[0] + r3 * (center[0] - fish[i].position[0])
      )
    );
    fish[i].position[1] = Math.max(
      lowerBound,
      Math.min(
        upperBound,
        fish[i].position[1] + r3 * (center[1] - fish[i].position[1])
      )
    );
  }
}

// Find the best solution
const bestFish = fish.reduce(
  (best, fish) => (fish.fitness > best.fitness ? fish : best),
  fish[0]
);
console.log("Best solution:", bestFish.position, "Fitness:", bestFish.fitness);
```
