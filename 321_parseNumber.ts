import { assertEquals } from "./utils.ts";

const numbers: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
  million: 1000000,
} as const;

const parseNumber = (input: string): number => {
  const inputs = input.trim().toLowerCase().split(" ");

  let total = 0;
  {
    let partTotal = 0;

    let currValue = -1;
    let prevValue = Number.POSITIVE_INFINITY;

    for (const v of inputs) {
      currValue = numbers[v];

      // new value is bigger than before, so multiply it out and reset counter
      // for instace two thousand
      if (currValue > prevValue) {
        partTotal *= currValue;
        total += partTotal;
        partTotal = 0;
      } else {
        partTotal += currValue;
      }

      prevValue = currValue;
    }

    // add any remaining value
    total += partTotal;
  }

  return total;
};

Deno.test("test", () => {
  assertEquals(parseNumber("Two"), 2);
  assertEquals(parseNumber("Twenty Two"), 22);
  assertEquals(parseNumber("Twelve Thousand Three Hundred Forty Five"), 12345);
  assertEquals(parseNumber("One Hundred Twenty Three"), 123);
  assertEquals(
    parseNumber("Two Million Twelve Thousand One Hundred Twenty Three"),
    2012123
  );
});
