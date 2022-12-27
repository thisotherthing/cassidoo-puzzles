// const coins = [2,3,5,7];
// const amount = 17;

const runCoinCombo = (coins: number[], target: number, curAmount: number, curCoins: number[], solutions: number[][]) => {
  if (curAmount === target) {
    // console.log("found", curCoins.map((i) => coins[i]).join(",") );
    solutions.push([...curCoins.map((i) => coins[i])])
    return;
  } else if (curAmount > target) {
    return;
  }

  for (let i = 0, l = coins.length; i < l; i++) {
    curCoins.push(i);
    const amount = curAmount + coins[i];
    runCoinCombo(coins, target, amount, curCoins, solutions);
    curCoins.pop();
  }
}

const coinCombo = (coins: number[], amount: number) => {
  console.log(coins, amount);

  // sort for biggest, so shorted combos should come first
  // coins.sort((a, b) => b - a);

  const solutions: number[][] = [];

  runCoinCombo(coins, amount, 0, [], solutions);

  solutions.sort((a, b) => a.length - b.length);

  if (solutions.length > 0) {
    return solutions[0];
  } else {
    return [];
  }
}

console.log(coinCombo([2,3,5,7], 17));
//[3,7,7] 

console.log(coinCombo([2,3,5], 11));
//[3,3,5]