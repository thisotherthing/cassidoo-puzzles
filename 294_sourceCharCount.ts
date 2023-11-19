import { assertEquals } from "./utils.ts";

const numbers: Record<number, string> = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
  100: "hundred",
  1000: "thousand",
  1000000: "million",
} as const;

const toTextNumber = (v: number): string => {
  // ignore zero
  if (v === 0) {
    return "";
  }

  // if value is available, return it directly
  if (numbers[v]) {
    return numbers[v];
  }

  // handle value under 100, since they can be weird
  if (v < 100) {
    if (numbers[v]) {
      return numbers[v];
    }

    const firstDigit = v % 10;

    return `${numbers[v - firstDigit]} ${numbers[firstDigit]}`;
  }

  const builder: string[] = [];

  // go through largest steps
  // million, thousand, hundred
  for (let i = 1, l = 3; i <= l; i++) {
    const step = parseInt(Object.keys(numbers).at(-i)!, 10);

    if (v > step) {
      const remainder = v % step;
      v -= remainder;
      builder.push(toTextNumber(v / step));
      builder.push(toTextNumber(step));
      builder.push(toTextNumber(remainder));
      return builder.join(" ");
    }
  }

  return "";
};

Deno.test("test", () => {
  assertEquals(toTextNumber(1), "one");
  assertEquals(toTextNumber(5), "five");
  assertEquals(toTextNumber(19), "nineteen");
  assertEquals(toTextNumber(24), "twenty four");
  assertEquals(toTextNumber(44), "forty four");
  assertEquals(toTextNumber(108), "one hundred eight");
  assertEquals(toTextNumber(308), "three hundred eight");
  assertEquals(toTextNumber(314), "three hundred fourteen");
  assertEquals(toTextNumber(322), "three hundred twenty two");
  assertEquals(toTextNumber(2488), "two thousand four hundred eighty eight");
});

const sourceLength = Deno.readFileSync("294_sourceCharCount.ts").length;
console.log(sourceLength);
console.log(toTextNumber(sourceLength));
