import { assertEquals } from "./utils.ts";

const numberOfOnes = (n: number): number => {
  const valid: number[] = [];

  for (let i = 1; i <= n; i++) {
    if (i.toFixed(0).includes("1")) valid.push(i);
  }

  console.log(valid);

  return (valid.join("").match(/1/g) || []).length;
};

Deno.test("numberOfOnes", () => {
  assertEquals(numberOfOnes(14), 7);
});
