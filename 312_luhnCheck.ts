import { assertEquals } from "./utils.ts";

const sumDigits = (v: number): number =>
  v
    .toFixed(0)
    .split("")
    .reverse()
    .map((v) => parseInt(v, 10))
    .reduce((prev, curr) => prev + curr, 0);

const luhnCheck = (val: string): boolean => {
  let digits = val
    .slice(0, val.length - 1)
    .split("")
    .map((v) => parseInt(v, 10))
    .reverse();

  // multiply
  digits = digits.map((v, i) => v * (i % 2 === 0 ? 2 : 1));

  // sumDigits
  digits = digits.map((v) => sumDigits(v));

  // sum
  let check = digits.reduce((prev, curr) => prev + curr, 0);

  // mod
  check = 10 - (check % 10);

  return check.toFixed(0) === val.at(-1);
};

Deno.test("test", () => {
  assertEquals(luhnCheck("17893729974"), true);
  assertEquals(luhnCheck("123456789"), false);
  assertEquals(luhnCheck("5555555555554444"), true); // Mastercard
});
