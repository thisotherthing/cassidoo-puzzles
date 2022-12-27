import { assertEquals } from "./utils.ts";

const getAscii = (start: number, end: number): string => {
  const result: string[] = [];

  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }

  return result.join("");
};

Deno.test("test", () => {
  assertEquals(
    getAscii(0x20, 0x7e),
    ` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`
  );
});
