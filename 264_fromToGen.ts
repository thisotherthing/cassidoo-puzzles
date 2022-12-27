import { assertEquals } from "./utils.ts";

const fromTo = (start: number, end: number): (() => number | undefined) => {
  let cur = start;

  return () => {
    if (cur > end) return undefined;

    return cur++;
  };
};

Deno.test("test", () => {
  const gen = fromTo(5, 7);

  assertEquals(gen(), 5);
  assertEquals(gen(), 6);
  assertEquals(gen(), 7);
  assertEquals(gen(), undefined);
});
