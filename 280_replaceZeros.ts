import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const replaceZeros = (input: string): string => {
  const result: string[] = [];

  let zeroCounter = 0;

  for (const char of input.trim()) {
    if (char === "0") {
      zeroCounter++;
    } else {
      if (zeroCounter > 0) {
        result.push(zeroCounter.toFixed(0));
        zeroCounter = 0;
      }

      result.push(char);
    }
  }

  if (zeroCounter > 0) {
    result.push(zeroCounter.toFixed(0));
  }

  return result.join("");
};

Deno.test("truncate", () => {
  assertEquals(replaceZeros("123456789"), "123456789");
  assertEquals(replaceZeros("000000000000"), "12");
  assertEquals(replaceZeros("1234500362000440"), "1234523623441");
  assertEquals(replaceZeros("123450036200044"), "123452362344");
});
