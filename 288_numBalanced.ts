import { assertEquals } from "./utils.ts";

const numBalanced = (input: string): number => {
  let offset = 0;

  for (const char of input.split("")) {
    if (char === "(") {
      offset--;
    } else if (char === ")") {
      offset++;
    }
  }

  return Math.abs(offset);
};

Deno.test("test", () => {
  assertEquals(numBalanced(`()`), 0);
  assertEquals(numBalanced(`(()`), 1);
  assertEquals(numBalanced(`))()))))()`), 6);
  assertEquals(numBalanced(`)))))`), 5);
});
