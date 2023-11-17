import { assertEquals } from "./utils.ts";

const sortChars = (v: string) => v.trim().split("").sort().join("");

const isAnagram = (w0: string, w1: string): boolean => {
  return sortChars(w0) === sortChars(w1);
};

Deno.test("test", () => {
  assertEquals(isAnagram("barbie", "oppenheimer"), false);
  assertEquals(isAnagram("race", "care"), true);
});
