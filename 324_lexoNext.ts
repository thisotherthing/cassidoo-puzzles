import { assertEquals } from "./utils.ts";

const walkDigits = (
  digits: string[],
  remaining: string[],
  result: { target: number; currentNext: number }
) => {
  if (remaining.length === 0) {
    const newValue = parseInt(digits.join(""), 10);
    if (newValue > result.target && newValue < result.currentNext) {
      result.currentNext = newValue;
    }

    return;
  }

  for (let i = 0, l = remaining.length; i < l; i++) {
    // get digit
    digits.push(remaining.splice(i, 1)[0]);

    walkDigits(digits, remaining, result);

    // put digit back
    remaining.splice(i, 0, digits.pop()!);
  }
};

const lexoNext = (input: number): number => {
  const result = {
    target: input,
    currentNext: Number.POSITIVE_INFINITY,
  };

  walkDigits([], input.toFixed(0).split(""), result);

  return result.currentNext;
};

Deno.test("test", () => {
  assertEquals(lexoNext(123), 132);
  assertEquals(lexoNext(314159), 314195);
});
