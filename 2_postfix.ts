import { assertEquals } from "./utils.ts";

const ops = ["+", "-", "*", "/"];

const func = (input: string): number => {
  const parts = input.trim().split(" ");

  const stack: (number | string)[] = [];

  for (const part of parts) {
    if (ops.includes(part)) {
      const values = [stack.pop(), stack.pop()] as number[];
      const expression = `${values[1]} ${part} ${values[0]}`;
      const result = eval(expression) as number;
      stack.push(result);
    } else {
      stack.push(parseInt(part, 10));
    }
  }

  return stack.pop() as number;
};

Deno.test("test", () => {
  assertEquals(func("5 4 * 6 2 / +"), 23);
  assertEquals(func("100 200 + 2 / 5 * 7 +"), 757);
  assertEquals(func("2 3 1 * + 9 -"), -4);
});
