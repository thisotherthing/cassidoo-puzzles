import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const capitalAfterVowel = (val: string): string => {
  const isVowel = (c: string) => {
    return ["a", "e", "i", "o", "u"].includes(c.toLowerCase());
  };

  const builder: string[] = [];

  let previousVowl = false;
  for (let i = 0, l = val.length; i < l; i++) {
    let c = val[i];
    const vowel = isVowel(c);
    const whitespace = c.trim().length === 0;

    if (!vowel && previousVowl) {
      c = c.toUpperCase();

      if (!whitespace) previousVowl = false;
    }

    builder.push(c);

    if (!whitespace) {
      previousVowl = vowel;
    }
  }

  return builder.join("");
};

const capitalAfterVowelRegEx = (val: string): string => {
  // return val.replace(/([aeiouAEIOU ]+)(.)/g, "$1\U$2");
  return val.replaceAll(
    /([aeiouAEIOU ]+)([^aeiouAEIOU])/g,
    (_, p1, p2) => p1 + p2.toUpperCase()
  );
};

Deno.test("truncate", () => {
  assertEquals(capitalAfterVowel("hello world"), "heLlo WoRld");
  assertEquals(capitalAfterVowel("xaabeuekadii"), "xaaBeueKaDii");

  assertEquals(capitalAfterVowelRegEx("xaabeuekadii"), "xaaBeueKaDii");
  assertEquals(capitalAfterVowelRegEx("hello world"), "heLlo WoRld");
});
