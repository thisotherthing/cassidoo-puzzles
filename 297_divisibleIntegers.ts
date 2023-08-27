import { assertEquals } from "./utils.ts";

const buildDigitsAndTest = (
  n: number,
  digits: string[],
  remaining: number[],
  current: number[]
): boolean => {
  if (remaining.length === 0) {
    const string = current.map((i) => digits[i]).join("");
    const number = parseInt(string, 10);
    // console.log(string, number, number % n === 0);
    if (number % n === 0) {
      console.log(string, number);
      return true;
    }
    return false;
  }

  for (let i = 0, l = remaining.length; i < l; i++) {
    // console.log("before", JSON.stringify(remaining), JSON.stringify(current));
    current.push(remaining.splice(i, 1)[0]);

    // console.log("current", JSON.stringify(remaining), JSON.stringify(current));
    if (buildDigitsAndTest(n, digits, remaining, current)) {
      return true;
    }

    remaining.splice(i, 0, current.pop() as number);
    // console.log("after", JSON.stringify(remaining), JSON.stringify(current));
  }

  return false;
};

const divisibleIntegers = (n: number, arr: number[]): boolean => {
  const digits: string[] = [...arr.map((v) => v.toFixed(0)).join("")];
  // console.log(digits);

  return buildDigitsAndTest(
    n,
    digits,
    new Array(digits.length).fill(-1).map((_, i) => i),
    []
  );
};

Deno.test("test", () => {
  assertEquals(divisibleIntegers(3, [40, 50, 90]), true);
});
