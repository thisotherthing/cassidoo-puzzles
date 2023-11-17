import { assertEquals } from "./utils.ts";

const maximumProfit = (prices: number[]): number => {
  const result = {
    buy: 0,
    sell: 0,
    profit: 0,
  };

  for (let i = 0, l = prices.length; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      const profit = prices[j] - prices[i];
      if (profit > result.profit) {
        result.buy = i;
        result.sell = j;
        result.profit = profit;
      }
    }
  }

  console.log(
    prices,
    `Buy on day ${result.buy + 1}, and sell on day ${
      result.sell + 1
    }, your profit = ${prices[result.sell]}-${prices[result.buy]} = ${
      result.profit
    }`
  );

  return result.profit;
};

Deno.test("test", () => {
  assertEquals(maximumProfit([7, 1, 5, 3, 6, 4]), 5);
});
