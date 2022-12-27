const Colors = ["red", "blue", "black", "yellow"] as const;
type Color = typeof Colors[number];

type NumberTile = {
  number: number;
  color: Color;
}
type WildcardTile = {
  wildcard: true;
}

type Tile = NumberTile | WildcardTile;

type Tray = Tile[];
type TileSet = Tile[];

type Player = {
  tray: Tray;
}

// based on https://stackoverflow.com/a/48083382
const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
};

const sortTray = (tray: Tray) => {
  tray.sort((a, b) => {
    if ((a as WildcardTile).wildcard) {
      return -1;
    } else if ((b as WildcardTile).wildcard) {
      return 1;
    } else {
      const _a = a as NumberTile;
      const _b = b as NumberTile;

      if (_a.number === _b.number) return _a.color.localeCompare(_b.color);

      return _a.number - _b.number;
    }
  })
}

const addSet = (sets: TileSet[], set: TileSet) => {
  // bring tiles in same order
  sortTray(set);

  const setHash = JSON.stringify(set);





  

  if (sets.findIndex((tileset) => JSON.stringify(tileset) === setHash) === -1) {
    sets.push(set);
  }
}

const generateGameTray = (): Tray => {
  const tray: Tray = [];

  for (let i = 1; i <= 13; i++) {
    Colors.map((color) => {
      tray.push({ number: i, color })
    })
  }

  // two wildcards
  for (let i = 0; i < 2; i++) {
    tray.push({ wildcard: true })
  }

  shuffle(tray);

  return tray;
}

const getPlayerFromTray = (gameTray: Tray): Player => {
  shuffle(gameTray);

  return {
    tray: gameTray.splice(0, 14),
  }
}

const _printCard = (t: Tile) => {
  console.log(t);
  if ((t as WildcardTile).wildcard === true) {
    console.log(`<*>`);
    return;
  }

  const _t = t as NumberTile;
  console.log(`<${_t.number} ${_t.color}>`)
}

const walkSameNumberSets = (tray: Tray, number: number, picked: number[], sets: Tray[]) => {
  if (picked.length >= 3) {
    const set = [...tray].filter((_, i) => picked.includes(i));
    addSet(sets, set);

    if (picked.length >= 4) return;
  }

  for (let i = 0, l = tray.length; i < l; i++) {
      let isValid = !picked.includes(i);

      if ((tray[i] as WildcardTile).wildcard !== true) {
        const _t = tray[i] as NumberTile;
        isValid = isValid && _t.number === number;
      }

      if (isValid) {
        picked.push(i);
        walkSameNumberSets(tray, number, picked, sets);
        picked.pop();
      }
  }
}
const setSameNumberSets = (tray: Tray, sets: Tray[]) => {
  for (let i = 0, l = tray.length; i < l; i++) {
    if ((tray[i] as WildcardTile).wildcard !== true) {
      const _t = tray[i] as NumberTile;
      walkSameNumberSets(tray, _t.number, [i], sets);
    }
  }
}

const walkRunNumbers = (tray: Tray, number: number, color: Color, picked: number[], sets: Tray[]) => {
  if (picked.length >= 3) {
    const set = [...tray].filter((_, i) => picked.includes(i));
    addSet(sets, set);

    if (picked.length >= 4) return;
  }

  for (let i = 0, l = tray.length; i < l; i++) {
    let isValid = !picked.includes(i);

    if ((tray[i] as WildcardTile).wildcard !== true) {
      const _t = tray[i] as NumberTile;
      isValid = isValid && _t.number === number && _t.color === color;
    }

    if (isValid) {
      picked.push(i);
      walkRunNumbers(tray, number + 1, color, picked, sets);
      picked.pop();
    }
  }
}
const setRunNumberSets = (tray: Tray, sets: Tray[]) => {
  for (let i = 0, l = tray.length; i < l; i++) {
    if ((tray[i] as WildcardTile).wildcard !== true) {
      const _t = tray[i] as NumberTile;
      walkRunNumbers(tray, _t.number + 1, _t.color, [i], sets);
    }
  }
}

const gameTray = generateGameTray();
const player = getPlayerFromTray(gameTray);

// const testTray: Tray = [
//   { wildcard: true },
//   { number: 1, color: "blue" },
//   { number: 5, color: "red" },
//   { number: 5, color: "blue" },
//   { number: 5, color: "black" },
//   { number: 5, color: "yellow" },
//   { number: 7, color: "black" },
//   { number: 9, color: "blue" },
//   { number: 10, color: "black" },
//   { number: 11, color: "yellow" },
//   { number: 11, color: "blue" },
//   { number: 12, color: "yellow" },
//   { number: 12, color: "blue" },
//   { number: 13, color: "red" },
//   { number: 13, color: "blue" }
// ];

// console.log(testTray);
console.log(player.tray);

const sets: Tray[] = [];
// setSameNumberSets(testTray, sets);
setSameNumberSets(player.tray, sets);
// setRunNumberSets(testTray, sets);
setRunNumberSets(player.tray, sets);

console.log(sets);