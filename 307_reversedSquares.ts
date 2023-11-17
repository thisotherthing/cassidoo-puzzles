import { assertEquals } from "./utils.ts";

const isPerfectSquare = (v: number): boolean => {
  let tmp = 0;
  let tmpSquared = 0;

  while (tmpSquared <= v) {
    tmpSquared = tmp * tmp;

    if (tmpSquared === v) return true;

    tmp++;
  }

  return false;
};

const reversedSquares = (val: number): boolean => {
  const digits = val.toFixed(0).split("");

  if (digits.length === 0) {
    throw new Error(`zero digits found for "${val}"`);
  }

  if (digits.length === 1) {
    return isPerfectSquare(val);
  }

  return (
    isPerfectSquare(val) &&
    isPerfectSquare(Number.parseInt(digits.reverse().join(""), 10))
  );
};

Deno.test("test", () => {
  assertEquals(isPerfectSquare(0), true);
  assertEquals(isPerfectSquare(9), true);
  assertEquals(isPerfectSquare(8), false);
  assertEquals(isPerfectSquare(441), true);
  assertEquals(isPerfectSquare(144), true);
  assertEquals(isPerfectSquare(1225), true);

  assertEquals(reversedSquares(9), true);
  assertEquals(reversedSquares(441), true);
  assertEquals(reversedSquares(25), false);
});
