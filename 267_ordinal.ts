import { assertEquals } from "./utils.ts";

const ordinal = (val: number): string => {
  const builder: string[] = [];

  builder.push(val.toFixed(0));

  if (val > 3) {
    builder.push("th");
  } else if (val === 3) {
    builder.push("rd");
  } else if (val === 2) {
    builder.push("nd");
  } else if (val === 1) {
    builder.push("st");
  }

  return builder.join("");
};

Deno.test("test", () => {
  assertEquals(ordinal(1), "1st");
  assertEquals(ordinal(2), "2nd");
  assertEquals(ordinal(3), "3rd");
  assertEquals(ordinal(5), "5th");
  assertEquals(ordinal(57), "57th");
});
