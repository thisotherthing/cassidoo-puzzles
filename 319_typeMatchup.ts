import { assertEquals } from "./utils.ts";

const fetchJson = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url, {
    headers: {
      method: "POST",
      accept: "application/json",
    },
  });

  const data = await resp.json();
  return data;
};

const typeMatchup = async (input: string): Promise<string> => {
  const cleanInput = input.toLowerCase().trim();

  // fetch type to url data
  const data = await fetchJson<{ results: { name: string; url: string }[] }>(
    "https://pokeapi.co/api/v2/type/"
  );
  const typeUrl = data.results.filter((v) => v.name === cleanInput)[0];

  if (!typeUrl) {
    return `${input} is not a valid Pokémon type.`;
  }

  // fetch type data
  const typeData = await fetchJson<{
    damage_relations: {
      double_damage_from: Record<number, { name: string }>;
      double_damage_to: Record<number, { name: string }>;
    };
  }>(typeUrl.url);

  const weakAgainst = Object.values(
    typeData.damage_relations.double_damage_from
  ).map((v) => v.name);
  const strongAgainst = Object.values(
    typeData.damage_relations.double_damage_to
  ).map((v) => v.name);

  // add and before last entry
  if (weakAgainst.length > 0) {
    weakAgainst[weakAgainst.length - 1] =
      "and " + weakAgainst[weakAgainst.length - 1];
  }
  if (strongAgainst.length > 0) {
    strongAgainst[strongAgainst.length - 1] =
      "and " + strongAgainst[strongAgainst.length - 1];
  }

  return `Weak against ${weakAgainst.join(
    ", "
  )}. Strong against ${strongAgainst.join(", ")}.`;
};

Deno.test("test", async () => {
  assertEquals(
    await typeMatchup("fighting"),
    "Weak against flying, psychic, and fairy. Strong against normal, rock, steel, ice, and dark."
  );
  assertEquals(
    await typeMatchup("cassidy"),
    "cassidy is not a valid Pokémon type."
  );
});
