import { assertEquals } from "./utils.ts";

const func = (val: number): number => {
  return val + 1;
};

Deno.test("test", () => {
  assertEquals(func(1), 2);
});
