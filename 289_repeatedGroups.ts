import { assertEquals } from "./utils.ts";

const repeatedGroups = (val: number[]): number[][] => {
  const groups: number[][] = [];

  let group: number[] = [val[0]];

  for (let i = 1, l = val.length; i < l; i++) {
    if (val[i] === group[0]) {
      group.push(val[i]);
    } else {
      if (group.length > 1) {
        groups.push(group);
      }

      group = [val[i]];
    }
  }

  if (group.length > 1) {
    groups.push(group);
  }

  return groups;
};

Deno.test("test", () => {
  assertEquals(repeatedGroups([1, 2, 2, 4, 5]), [[2, 2]]);
  assertEquals(repeatedGroups([1, 1, 0, 0, 8, 4, 4, 4, 3, 2, 1, 9, 9]), [
    [1, 1],
    [0, 0],
    [4, 4, 4],
    [9, 9],
  ]);
});
