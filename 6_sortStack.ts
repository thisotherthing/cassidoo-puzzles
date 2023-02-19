import { assertEquals } from "./utils.ts";

const Stack = (input?: number[]) => {
  const data: number[] = input || [];

  return {
    pop: (): number => data.pop() as number,
    peek: (): number => data.at(-1) as number,
    push: (v: number) => data.push(v),
    isEmpty: (): boolean => data.length === 0,
  };
};

type StackType = ReturnType<typeof Stack>;

const getStackData = (stack: StackType): number[] => {
  const data: number[] = [];

  while (!stack.isEmpty()) {
    data.push(stack.pop());
  }

  for (const v of data) {
    stack.push(v);
  }

  return data;
};

// done using https://www.geeksforgeeks.org/sort-stack-using-temporary-stack/
const sortStack = (stack: StackType, reverse?: boolean): StackType => {
  const tmpStack = Stack();

  while (!stack.isEmpty()) {
    const temp = stack.pop();

    while (!tmpStack.isEmpty() && temp > tmpStack.peek()) {
      stack.push(tmpStack.pop());
    }

    tmpStack.push(temp);
  }

  if (reverse) {
    while (!tmpStack.isEmpty()) {
      stack.push(tmpStack.pop());
    }

    return stack;
  }

  return tmpStack;
};

Deno.test("test", () => {
  assertEquals(
    getStackData(sortStack(Stack([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  );

  assertEquals(
    getStackData(sortStack(Stack([0, 1, 2, 4, 3, 5, 6, 7, 8, 9]))),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  );

  assertEquals(
    getStackData(sortStack(Stack([9, 1, 2, 6, 4, 5, 3, 0, 7, 8]))),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  assertEquals(
    getStackData(sortStack(Stack([9, 1, 2, 6, 4, 5, 3, 0, 7, 8]), true)),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse()
  );
});
