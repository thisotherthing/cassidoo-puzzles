import { assertEquals } from "./utils.ts";

const stackQueue = (): {
  enqueue: (val: string) => void;
  dequeue: () => string;
} => {
  const storeStack: string[] = [];
  const dequeueStack: string[] = [];

  const enqueue = (v: string) => {
    // move dequeue stack back to store stack

    while (dequeueStack.length > 0) {
      storeStack.push(dequeueStack.pop() as string);
    }

    storeStack.push(v);
  };

  const dequeue = (): string => {
    // move everything from storeStack to dequeueStack
    while (storeStack.length > 0) {
      dequeueStack.push(storeStack.pop() as string);
    }

    return dequeueStack.pop() as string;
  };

  return {
    enqueue,
    dequeue,
  };
};

Deno.test("test", () => {
  const queue = stackQueue();

  queue.enqueue("a");
  queue.enqueue("b");
  queue.enqueue("c");

  assertEquals(queue.dequeue(), "a");
  assertEquals(queue.dequeue(), "b");

  queue.enqueue("d");
  queue.enqueue("e");

  assertEquals(queue.dequeue(), "c");
  assertEquals(queue.dequeue(), "d");
  assertEquals(queue.dequeue(), "e");
});
