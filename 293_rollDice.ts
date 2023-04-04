import { assertEquals } from "./utils.ts";

const rollDice = (input: string): number => {
  const dices = input.split("+");

  let val = 0;

  for (const dice of dices) {
    const [count, sides] = dice.split("d").map(parseFloat);

    for (let i = 0; i < count; i++) {
      val += Math.ceil(Math.random() * sides);
    }
  }

  return val;
};

const testRolls = (input: string, count: number) => {
  const result = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE,
    // avg: 0,
  };

  let throwResult = 0;
  for (let i = 0; i < count; i++) {
    throwResult = rollDice(input);

    result.min = Math.min(result.min, throwResult);
    result.max = Math.max(result.max, throwResult);
    // result.avg += throwResult;
  }

  // result.avg /= count;

  return result;
};

Deno.test("test", () => {
  {
    const result = testRolls("4d4", 1000);
    assertEquals(result.min >= 4 && result.max <= 16, true); // Four 4-sided dice
  }
  {
    const result = testRolls("3d20", 1000);
    assertEquals(result.min >= 3 && result.max <= 60, true); // Four 4-sided dice
  }
  {
    const result = testRolls("1d8+2d10", 1000);
    assertEquals(result.min >= 3 && result.max <= 28, true); // Four 4-sided dice
  }
});
