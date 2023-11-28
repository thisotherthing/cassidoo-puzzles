import { assertEquals } from "./utils.ts";

const walkItems = (
  picked: number[],
  result: {
    indices: number[];
    cost: number;
  },
  startIndex: number,
  calories: number[],
  prices: number[],
  dailyGoal: number
) => {
  const sumCalories = picked.reduce((prev, cur) => prev + calories[cur], 0);
  const sumPrices = picked.reduce((prev, cur) => prev + prices[cur], 0);

  // store new lowest price
  if (sumCalories >= dailyGoal && sumPrices < result.cost) {
    result.cost = sumPrices;
    result.indices.length = 0;
    result.indices.push(...picked);
    return;
  }

  // stop if price is already higher
  if (sumPrices > result.cost) {
    return;
  }

  for (let i = startIndex, l = calories.length; i < l; i++) {
    picked.push(startIndex);
    walkItems(picked, result, i + 1, calories, prices, dailyGoal);
    picked.pop();
  }
};

const minCostForCalories = (
  calories: number[],
  prices: number[],
  dailyGoal: number
): number => {
  const result = {
    indices: [],
    cost: Number.POSITIVE_INFINITY,
  };

  for (let i = 0, l = calories.length; i < l; i++) {
    walkItems([], result, i, calories, prices, dailyGoal);
  }

  console.log(result);

  // couldn't meet goal
  if (result.cost === Number.POSITIVE_INFINITY) {
    return -1;
  }

  return result.cost;
};

Deno.test("test", () => {
  assertEquals(
    minCostForCalories([200, 400, 600, 800], [50, 60, 80, 100], 1200),
    160
  ); // the 2nd and 4th items add up to 1200 calories for the minimum cost
  assertEquals(minCostForCalories([200, 400], [50, 60], 1200), -1);
});
