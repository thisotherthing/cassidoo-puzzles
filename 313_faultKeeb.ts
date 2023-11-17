import { assertEquals } from "./utils.ts";

const faultyKeeb = (val: string): string => {
  const builder: string[] = [];

  for (const char of val.split("")) {
    if (["a", "e", "i", "o", "u", "y"].includes(char)) {
      builder.reverse();
    } else {
      builder.push(char);
    }
  }

  return builder.join("");
};

Deno.test("test", () => {
  assertEquals(faultyKeeb("string"), "rtsng");
  assertEquals(faultyKeeb("hello world!"), "w hllrld!");
});
