import { assertEquals } from "./utils.ts";

type Formats = "rgb" | "hex" | "hsl";

const colorToHslValues = (
  color: [number, number, number]
): [number, number, number] => {
  const r = color[0] / 255;
  const g = color[1] / 255;
  const b = color[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  const l = h;

  if (max === min) {
    // achromatic
    h = 0.0;
    s = 0.0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const hslToRgb = (hsl: [number, number, number]): [number, number, number] => {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;

  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const convertColor = (
  inFormat: Formats,
  outFormat: Formats,
  valuesString: `(${number},${number},${number})` | `#${string}`
): string => {
  const color = {
    r: 0,
    b: 0,
    g: 0,
    h: 0,
    s: 0,
    l: 0,
  };

  let values: [number, number, number] = [0, 0, 0];

  if (valuesString.startsWith("#")) {
    values[0] = parseInt(valuesString.substring(1, 3), 16);
    values[1] = parseInt(valuesString.substring(3, 5), 16);
    values[2] = parseInt(valuesString.substring(5, 7), 16);
  } else if (valuesString.startsWith("(")) {
    values = valuesString
      .replace(/\(/, "")
      .replace(/\)/, "")
      .split(",")
      .map((v) => parseInt(v, 10)) as [number, number, number];
  } else {
    return "-";
  }

  if (inFormat === "rgb" || inFormat === "hex") {
    color.r = values[0];
    color.g = values[1];
    color.b = values[2];

    const hsl = colorToHslValues(values);
    color.h = hsl[0];
    color.s = hsl[1];
    color.l = hsl[2];
  } else if (inFormat === "hsl") {
    color.h = values[0];
    color.s = values[1];
    color.l = values[2];

    const rgb = hslToRgb(values);
    color.r = rgb[0];
    color.g = rgb[1];
    color.b = rgb[2];
  }

  const toVal = (val: number) => {
    return Math.round(val).toFixed(0).toUpperCase();
  };
  const toHex = (val: number) => {
    return Math.round(val).toString(16).toUpperCase().padStart(2, "0");
  };

  switch (outFormat) {
    case "rgb":
      return `(${toVal(color.r)},${toVal(color.g)},${toVal(color.b)})`;
    case "hsl":
      return `(${toVal(color.h)},${toVal(color.s)},${toVal(color.l)})`;
    case "hex":
      return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  return "-";
};

Deno.test("test", () => {
  assertEquals(convertColor("rgb", "hex", "(255,0,0)"), "#FF0000");
  assertEquals(convertColor("hsl", "rgb", "(65,80,80)"), "(238,245,163)");
  assertEquals(convertColor("rgb", "hsl", "(238,245,163)"), "(65,80,80)");
  assertEquals(convertColor("hsl", "hex", "(65,80,80)"), "#EEF5A3");
  assertEquals(convertColor("hex", "hsl", "#EEF5A3"), "(65,80,80)");
});
