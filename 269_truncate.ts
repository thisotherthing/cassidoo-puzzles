import { assertEquals } from "./utils.ts";

const truncate = (sentence: string, count: number): string => {
  // https://regex101.com/r/nKUsNj/1
  // find {count} alphabet chars in a row, and remove any following alphabet chars
  const regex = new RegExp(`(.*?[a-zA-Z]{${count}})([a-zA-Z]+)`, "g");
  return sentence.replace(regex, "$1");
};

Deno.test("test", () => {
  assertEquals(truncate("never gonna give you up", 3), "nev gon giv you up");
  assertEquals(truncate("never gonna give you up", 3), "nev gon giv you up");
  assertEquals(
    truncate("*hello* darkness, my ~old_friend", 3),
    "*hel* dar, my ~old_fri"
  );
  assertEquals(
    truncate("*hello* darkness, my ~old_friend", 2),
    "*he* da, my ~ol_fr"
  );
  assertEquals(
    truncate("*hello* darkness, my ~old_friend", 1),
    "*h* d, m ~o_f"
  );
});
