import { assertEquals } from "./utils.ts";

// from https://stackoverflow.com/a/6274381
function shuffle<T>(a: Array<T>) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }

  return a;
}

const scramble = (val: string): string => {
  const scrambled = val.replace(/[a-zA-Z]+/g, (part) => {
    if (part.length === 4) {
      // for 4 letter words, swap the middle
      return `${part[0]}${part[2]}${part[1]}${part[3]}`;
    } else if (part.length > 4) {
      const sub = part.substring(1, part.length - 1).split("");
      const shuffled = shuffle(sub).join("");

      return `${part[0]}${shuffled}${part[part.length - 1]}`;
    }

    return part;
  });

  console.log({ scrambled });

  return scrambled;
};

const isScrambled = (one: string, two: string) => {
  // inputs longer that 3 chars have to be different
  if (
    one.length > 3 &&
    one.length === two.length &&
    one.trim() === two.trim()
  ) {
    // console.log("inputs are the same");
    return false;
  }

  const oneWordBoundries = [...one.matchAll(/. ./g)];
  const twoWordBoundries = [...two.matchAll(/. ./g)];

  const oneSplit = one.split(" ").map((s) => s.split("").sort().join(""));
  const twoSplit = two.split(" ").map((s) => s.split("").sort().join(""));

  // words should have the same length and letters
  for (let i = 0, l = oneSplit.length; i < l; i++) {
    if (oneSplit[i] !== twoSplit[i]) {
      // console.log("sub words don't match", oneSplit[i], twoSplit[i]);
      return false;
    }
  }

  // word boundires should match (either both null, or both have matches), and should have the same length
  if (
    typeof oneWordBoundries !== typeof twoWordBoundries ||
    oneWordBoundries.length !== twoWordBoundries.length
  ) {
    // console.log("word boundries counts don't match");
    return false;
  }

  // word boundries should be the sanme
  for (let i = 0, l = oneWordBoundries.length; i < l; i++) {
    if (oneWordBoundries[i][0] !== twoWordBoundries[i][0]) {
      // console.log("word boundries don't match", oneWordBoundries[i][0], twoWordBoundries[i][0]);
      return false;
    }
  }

  return true;
};

Deno.test("test", () => {
  const testString = "A quick brown fox jumped over the lazy dog.";

  assertEquals(isScrambled(testString, testString), false);
  assertEquals(
    isScrambled(testString, "A qciuk bwron fox jmepud oaevr the lzay doasdg."),
    false
  );
  assertEquals(
    isScrambled(testString, "A qciuk bwron fox jmepud oevr the lzay dog."),
    true
  );

  assertEquals(isScrambled(scramble(testString), testString), true);
});
