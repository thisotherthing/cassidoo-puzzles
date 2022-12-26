import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const func = (val: number): number => {
  return val + 1;
};

Deno.test("truncate", () => {
  assertEquals(func(1), 2);
});
