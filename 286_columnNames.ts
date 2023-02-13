import { assertEquals } from "./utils.ts";

const func = (val: string): number => {
  let index = 0;
  let mult = 1;

  for (let i = val.length - 1; i >= 0; i--) {
    index += mult * (val.charCodeAt(i) - 64);

    mult *= 26;
  }

  return index;
};

Deno.test("test", () => {
  assertEquals(func("A"), 1);
  assertEquals(func("B"), 2);
  assertEquals(func("C"), 3);
  assertEquals(func("Z"), 26);
  assertEquals(func("AA"), 27);
  assertEquals(func("AB"), 28);
  assertEquals(func("ZZ"), 702);
  assertEquals(func("AAA"), 703);
});
