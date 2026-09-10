import { assertEquals } from "./utils.ts";

// You have some gifts you want to return.
// Gifts bought in December have a 90-day return window, and all other gifts have a 30-day return window.
// Given a gift's buy date, write a function that prints the last day you can return the gift.
// You can choose how dates should be formatted!

const returnGift = (input: string): string => {
  const inputDate = Temporal.Instant.from(new Date(input).toISOString())
    .toZonedDateTimeISO("UTC");

  let days = 30;

  if (inputDate.month === 12) {
    days = 90;
  }

  return inputDate.add({ days }).toLocaleString("en-US", {
    dateStyle: "medium",
  });
};

Deno.test("test", () => {
  assertEquals(returnGift("Dec 25, 2023"), "Mar 23, 2024");
  assertEquals(returnGift("Nov 25, 2023"), "Dec 24, 2023");
});
