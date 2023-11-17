import { assertEquals } from "./utils.ts";

const codePoints: Record<string, number> = {
  A: "A".codePointAt(0)!,
  Z: "Z".codePointAt(0)!,
  a: "a".codePointAt(0)!,
  z: "z".codePointAt(0)!,
} as const;

const explodeString = (val: string): string[] => {
  const sortingHelper = (v: number): number => {
    // sort small letter last
    if (v >= codePoints.a && v <= codePoints.z) return v + 2000;

    // then uppercase letter
    if (v >= codePoints.A && v <= codePoints.Z) return v + 1000;

    // start with any other chars
    return v;
  };

  const exploded: string[] = val
    .replaceAll(/\s/g, "")
    .split("")
    .map((c) => c.charCodeAt(0))
    .sort((a, b) => sortingHelper(a) - sortingHelper(b))
    .map((c) => String.fromCharCode(c));

  const result: Record<string, string> = {};
  for (const c of exploded) {
    if (result[c] === undefined) result[c] = "";
    result[c] += c;
  }

  return Object.values(result);
};

Deno.test("test", () => {
  assertEquals(explodeString("Ahh, abracadabra!"), [
    "!",
    ",",
    "A",
    "aaaaa",
    "bb",
    "c",
    "d",
    "hh",
    "rr",
  ]);
  assertEquals(explodeString(String.raw`\o/\o/`), ["//", String.raw`\\`, "oo"]);
});
