import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const getAscii = (start: number, end: number): string => {
  const result: string[] = [];

  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }

  return result.join("");
}


Deno.test("ascii", () => {
  assertEquals(getAscii(0x20, 0x7E), ` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`);
});
