import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const combineStrings = (input: string[], maxLength: number): string[] => {
  const result: string[] = [];

  let builder = "";

  for (const word of input) {
    if (builder.trim().length + word.length >= maxLength) {
      result.push(builder.trim());
      builder = "";
    }

    builder += word + " ";
  }

  result.push(builder.trim());

  return result;
};

Deno.test("combineStrings", () => {
  assertEquals(combineStrings(["a", "b", "c", "d", "e", "f", "g"], 5), [
    "a b c",
    "d e f",
    "g",
  ]);
  assertEquals(combineStrings(["a", "b", "c", "d", "e", "f", "g"], 12), [
    "a b c d e f",
    "g",
  ]);
  assertEquals(
    combineStrings(["alpha", "beta", "gamma", "delta", "epsilon"], 20),
    ["alpha beta gamma", "delta epsilon"]
  );
});
