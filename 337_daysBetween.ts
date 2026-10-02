import { assertEquals } from "./utils.ts";

// Write a function called daysBetween that takes in two dates, and returns the number of days between those dates. You can choose the date format you'd like to accept!

const daysBetween = (a: string, b: string): number => {
  const instantA = Temporal.Instant.from(new Date(a).toISOString());
  const instantB = Temporal.Instant.from(new Date(b).toISOString());

  const duration = instantA.until(instantB);

  // we only get seconds here in temporal duration, so we convert to days ourself
  const days = Math.floor(duration.seconds / 60 / 60 / 24);

  return days;
};

Deno.test("test", () => {
  assertEquals(daysBetween("Jan 1, 2024", "Jan 29, 2024"), 28);
  assertEquals(daysBetween("Feb 29, 2020", "Oct 31, 2023"), 1340);
});
