import { assertEquals } from "./utils.ts";

const getChildDepth = (obj: any, depth: number): number => {
  // stop
  if (typeof obj !== "object") return depth;

  depth++;

  if (Array.isArray(obj) && obj.length === 0) return depth;

  return Math.max(
    ...Object.values(obj).map((child) => getChildDepth(child, depth))
  );
};

const depthJSON = (json: object): number => {
  return getChildDepth(json, 0);
};

Deno.test("test", () => {
  assertEquals(depthJSON([]), 1);
  assertEquals(depthJSON([1, 2, 3, 4, 5]), 1);
  assertEquals(depthJSON([{ a: [] }, ["abc"]]), 3);
  assertEquals(depthJSON([{ a: [[]] }, ["abc"]]), 4);
});
