import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";

export function addg(a?: any) {
  if (a === undefined) return a;
  return function g(b?: any) {
    if (b !== undefined) {
      return addg(a + b);
    }
    return a;
  };
}

Deno.test("expected results", () => {
  assertEquals(addg(), undefined);
  assertEquals(addg(2)(), 2);
  assertEquals(addg(2)(7)(), 9);
  assertEquals(addg(3)(4)(0)(), 7);

  assertEquals(addg(3)(addg(3)())(), 6);
});

Deno.test("return types", () => {
  assertEquals(typeof addg(3), "function");
  assertEquals(typeof addg(null), "function");
  assertEquals(typeof addg(3)(), "number");
  assertEquals(addg(), undefined);
});

Deno.test("non number inputs", () => {
  assertEquals(addg(3)("a")(0)(), "3a0");
  assertEquals(addg(3)({})(0)(), "3[object Object]0");
  assertEquals(addg(3)([])(0)(), "30");
  assertEquals(typeof addg(3)(() => {})(0)(), "string");

  assertEquals(addg(3)(null)(5)(), 8);
});

Deno.test("errors", () => {
  assertThrows(() => {
    addg()()()();
  }, Error);
  assertThrows(() => {
    addg(3)(undefined)(5)();
  }, Error);
  assertThrows(() => {
    addg(3)()(5)();
  }, Error);
});
