import { assertEquals } from "./utils.ts";

const func = (in0: string, in1: string): boolean => {
  if (in0.length !== in1.length) return false;

  if (in0.split("").sort().join() !== in1.split("").sort().join()) {
    return false;
  }

  return true;
};

Deno.test("test", () => {
  assertEquals(func("fried", "fired"), true);
  assertEquals(func("gainly", "laying"), true);
  assertEquals(func("sadder", "dreads"), true);
  assertEquals(func("listen", "silent"), true);
  assertEquals(func("bread", "toast"), false);
  assertEquals(func("a", "b"), false);
  assertEquals(func("abc", "bbb"), false);
});
