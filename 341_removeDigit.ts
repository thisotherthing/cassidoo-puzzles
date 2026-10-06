import { assertEquals } from "./utils.ts";

// Given a number and a digit to remove from that number, maximize the resulting number after the digit has been removed and print it. You can choose how you want to handle a digit not existing in the number.

const removeDigit = (input: number, digit: number): number => {
  let max = Number.MIN_VALUE;

  const inputString = input.toFixed(0);
  const digitString = digit.toFixed(0);

  // return input, if digit is not in number
  if (!inputString.includes(digitString)) {
    return input;
  }

  const split = inputString.split("");

  for (let i = 0, l = split.length; i < l; i++) {
    if (split[i] === digitString) {
      // remove digit
      split.splice(i, 1);

      max = Math.max(max, parseInt(split.join(""), 10));

      // put digit back in
      split.splice(i, 0, digitString);
    }
  }

  return max;
};

Deno.test("test", () => {
  assertEquals(removeDigit(31415926, 1), 3415926); // we picked the second 1 in the number.
  assertEquals(removeDigit(1231, 1), 231); // // 231 > 123
});
