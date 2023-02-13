import { assertEquals } from "./utils.ts";

const sumEveryOther = (val: number): number => {
  const str = val.toString().replace(/\./, "");

  let sum = 0;

  for (let i = 1, l = str.length; i < l; i += 2) {
    sum += parseInt(str[i], 10);
  }

  return sum;
};

Deno.test("truncate", () => {
  assertEquals(sumEveryOther(548915381), 26); // 4+9+5+8
  assertEquals(sumEveryOther(10), 0);
  assertEquals(sumEveryOther(1010.11), 1); // 0+0+1
});
