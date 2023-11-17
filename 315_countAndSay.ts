import { assertEquals } from "./utils.ts";

const printNumbers: Record<number, string> = {
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
};

type Count = {
  digit: string;
  count: number;
};

const countAndSay = (val: string): string => {
  const counts: Count[] = [{ digit: val[0], count: 0 }];

  for (const digit of val.split("")) {
    if (counts.at(-1)!.digit !== digit) {
      counts.push({ digit, count: 0 });
    }

    counts.at(-1)!.count++;
  }

  return counts
    .map((v) => `${printNumbers[v.count]} ${v.digit}s`)
    .join(", then ");
};

Deno.test("test", () => {
  assertEquals(countAndSay("112222555"), "two 1s, then four 2s, then three 5s");
  assertEquals(countAndSay("3333333333"), "ten 3s");
});
