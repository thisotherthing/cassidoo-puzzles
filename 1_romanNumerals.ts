import { assertEquals } from "./utils.ts";

const values: [string, string][] = [
  ["I", "V"], // 1, 5
  ["X", "L"], // 10, 50
  ["C", "D"], // 100, 500
  ["M", ""], // 1000, _
];
const func = (val: number): string => {
  const builder: string[] = [];

  const digits = val.toFixed(0).split("").reverse().map(parseFloat);

  for (let i = 0, l = digits.length; i < l; i++) {
    const digit = digits[i];

    if (digit < 4) {
      builder.unshift("".padStart(digit, values[i][0]));
    } else if (digit === 4) {
      builder.unshift(values[i][1]);
      builder.unshift(values[i][0]);
    } else if (digit === 5) {
      builder.unshift(values[i][1]);
    } else if (digit < 9) {
      builder.unshift("".padStart(digit - 5, values[i][0]));
      builder.unshift(values[i][1]);
    } else if (digit === 9) {
      builder.unshift(values[i + 1][0]);
      builder.unshift(values[i][0]);
    }
  }

  return builder.join("");
};

Deno.test("test", () => {
  assertEquals(func(1), "I");
  assertEquals(func(2), "II");
  assertEquals(func(3), "III");
  assertEquals(func(4), "IV");
  assertEquals(func(5), "V");
  assertEquals(func(6), "VI");
  assertEquals(func(7), "VII");
  assertEquals(func(8), "VIII");
  assertEquals(func(9), "IX");
  assertEquals(func(10), "X");
  assertEquals(func(11), "XI");
  assertEquals(func(12), "XII");

  assertEquals(func(246), "CCXLVI");
  assertEquals(func(39), "XXXIX");
  assertEquals(func(789), "DCCLXXXIX");
  assertEquals(func(2421), "MMCDXXI");
  assertEquals(func(160), "CLX");
  assertEquals(func(207), "CCVII");
  assertEquals(func(1009), "MIX");
  assertEquals(func(1066), "MLXVI");
  assertEquals(func(3999), "MMMCMXCIX");
  assertEquals(func(1776), "MDCCLXXVI");
  assertEquals(func(1918), "MCMXVIII");
  assertEquals(func(1944), "MCMXLIV");
  assertEquals(func(2023), "MMXXIII");
});
