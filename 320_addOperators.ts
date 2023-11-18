import { assertEquals } from "./utils.ts";

const operators = ["*", "+"];

const walkOperators = (
  input: string[],
  remaining: string[],
  target: number,
  solutions: string[]
) => {
  const currentSolutuion = input.join("");
  const currentValue = eval(currentSolutuion) as number;

  // save solution
  if (currentValue === target && remaining.length === 0) {
    solutions.push(currentSolutuion);
    return;
  }

  // stop, if we're already over the target
  if (currentValue > target) {
    return;
  }

  if (remaining.length > 0) {
    const nextValue = remaining.shift() as string;

    for (const op of operators) {
      walkOperators([...input, op, nextValue], remaining, target, solutions);
    }

    remaining.unshift(nextValue);
  }
};

const addOperators = (input: number, target: number): string[] => {
  const solutions: string[] = [];

  const remaining = input.toFixed(0).split("");

  walkOperators([remaining.shift() as string], remaining, target, solutions);
  return solutions;
};

Deno.test("test", () => {
  assertEquals(addOperators(123, 6), ["1*2*3", "1+2+3"]);
  assertEquals(addOperators(3456237490, 9191), []);
});
