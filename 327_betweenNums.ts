import { assertEquals } from "./utils.ts";

// based on https://stackoverflow.com/a/40200710
const isPrime = (num: number): boolean => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

const betweenNums = (
  v0: number,
  v1: number,
  type: "even" | "odd" | "prime"
): number[] => {
  const result: number[] = [];

  const start = Math.min(v0, v1) + 1;
  const end = Math.max(v0, v1);

  for (let i = start; i < end; i++) {
    if (type === "even" && i % 2 === 0) {
      result.push(i);
    } else if (type === "odd" && i % 2 === 1) {
      result.push(i);
    } else if (type === "prime" && isPrime(i)) {
      result.push(i);
    }
  }

  return result;
};

Deno.test("test", () => {
  assertEquals(betweenNums(3, 11, "even"), [4, 6, 8, 10]);
  assertEquals(betweenNums(3, 11, "odd"), [5, 7, 9]);
  assertEquals(betweenNums(15, 1, "prime"), [2, 3, 5, 7, 11, 13]);
});
