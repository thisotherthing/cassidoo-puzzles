import { assertEquals } from "./utils.ts";

type FractionString = `${number}/${number}`;
type Op = "add" | "subtract" | "multiply" | "divide";
type Fraction = [number, number];

const parseFrac = (frac: `${number}/${number}`): Fraction => {
  const split = frac.split("/").map((v) => parseInt(v, 10));

  return [split[0], split[1]];
};

// based on https://stackoverflow.com/a/20824923
const greatestCommonFactor = (a: number, b: number): number => {
  while (b != 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};
const leastCommonMultiple = (a: number, b: number): number => {
  return (a / greatestCommonFactor(a, b)) * b;
};

const fractionMath = (
  fraction0: FractionString,
  op: Op,
  fraction1: FractionString
): FractionString => {
  const parsedF0 = parseFrac(fraction0);
  const parsedF1 = parseFrac(fraction1);

  // bring to same denominator
  {
    const commonMultiple = leastCommonMultiple(parsedF0[1], parsedF1[1]);

    parsedF0[0] = parsedF0[0] * (commonMultiple / parsedF0[1]);
    parsedF0[1] = commonMultiple;
    parsedF1[0] = parsedF1[0] * (commonMultiple / parsedF1[1]);
    parsedF1[1] = commonMultiple;
  }

  const result: Fraction = [0, 0];

  // run op
  switch (op) {
    case "add":
      result[0] = parsedF0[0] + parsedF1[0];
      result[1] = parsedF0[1];
      break;
    case "subtract":
      result[0] = parsedF0[0] - parsedF1[0];
      result[1] = parsedF0[1];
      break;
    case "multiply":
      result[0] = parsedF0[0] * parsedF1[0];
      result[1] = parsedF0[1] * parsedF1[1];
      break;
    case "divide":
      result[0] = parsedF0[0] * parsedF1[1];
      result[1] = parsedF0[1] * parsedF1[0];
      break;
  }

  // simplify result
  const commonFactor = greatestCommonFactor(result[0], result[1]);
  result[0] = result[0] / commonFactor;
  result[1] = result[1] / commonFactor;

  return `${result[0]}/${result[1]}`;
};

Deno.test("test", () => {
  assertEquals(fractionMath("3/4", "add", "3/4"), "3/2");
  assertEquals(fractionMath("1/8", "multiply", "2/2"), "1/8");
  assertEquals(fractionMath("3/4", "subtract", "1/4"), "1/2");
  assertEquals(fractionMath("1/2", "divide", "1/6"), "3/1");
});
