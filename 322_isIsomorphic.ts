import { assertEquals } from "./utils.ts";

const isIsomorphic = (a: string, b: string): boolean => {
  // string length must match
  if (a.length !== b.length) {
    return false;
  }

  const mapping: Record<string, string> = {};

  for (let i = 0, l = a.length; i < l; i++) {
    // if mapping already exists and doesn't match, fail
    if (mapping[a[i]] && mapping[a[i]] !== b[i]) {
      console.log(
        { a },
        { b },
        `'${a[i]}' cannot have a mapping to both '${mapping[a[i]]}' and '${
          b[i]
        }'`
      );
      return false;
    }

    // store mapping otherwise
    if (!mapping[a[i]]) {
      mapping[a[i]] = b[i];
    }
  }

  return true;
};

Deno.test("test", () => {
  assertEquals(isIsomorphic("abb", "cdd"), true); // 'a' maps to 'c' and 'b' maps to 'd'
  assertEquals(isIsomorphic("cassidy", "1234567"), false); // 's' cannot have a mapping to both '3' and '4'
  assertEquals(isIsomorphic("cass", "1233"), true);
});
