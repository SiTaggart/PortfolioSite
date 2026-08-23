export type Rgb = readonly [number, number, number];

function parseUnit(value: string): number | undefined {
  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  if (value.endsWith('%')) {
    return parsed / 100;
  }

  return parsed;
}

function parseByte(value: string): number | undefined {
  if (value.endsWith('%')) {
    return parseUnit(value);
  }

  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  return parsed / 255;
}

function rgb(
  red: number | undefined,
  green: number | undefined,
  blue: number | undefined,
): Rgb | undefined {
  if (red === undefined || green === undefined || blue === undefined) {
    return undefined;
  }

  return [red, green, blue];
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function linearToEncoded(channel: number): number {
  if (channel <= 0.003_130_8) {
    return 12.92 * channel;
  }

  return 1.055 * channel ** (1 / 2.4) - 0.055;
}

function hueToDegrees(value: number, unit: string | undefined): number {
  if (unit === 'rad') {
    return (value * 180) / Math.PI;
  }

  if (unit === 'turn') {
    return value * 360;
  }

  if (unit === 'grad') {
    return value * 0.9;
  }

  return value;
}

function oklabToSrgb(lightness: number, a: number, b: number): Rgb {
  const l_ = lightness + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
  const m_ = lightness - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
  const s_ = lightness - 0.089_484_177_5 * a - 1.291_485_548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    clamp01(
      linearToEncoded(clamp01(4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s)),
    ),
    clamp01(
      linearToEncoded(clamp01(-1.268_438_004_6 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s)),
    ),
    clamp01(
      linearToEncoded(clamp01(-0.004_196_086_3 * l - 0.703_418_614_7 * m + 1.707_614_701 * s)),
    ),
  ];
}

function oklchToSrgb(lightness: number, chroma: number, hue: number): Rgb {
  const radians = (hue * Math.PI) / 180;

  return oklabToSrgb(lightness, chroma * Math.cos(radians), chroma * Math.sin(radians));
}

function parseOklab(value: string): Rgb | undefined {
  const match = /^oklab\(\s*([\d.]+)(%?)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)$/.exec(
    value,
  );

  if (match === null) {
    return undefined;
  }

  const lightness = Number(match[1]);
  const a = Number(match[3]);
  const b = Number(match[4]);

  if (![lightness, a, b].every(Number.isFinite)) {
    return undefined;
  }

  return oklabToSrgb(match[2] === '%' ? lightness / 100 : lightness, a, b);
}

function parseOklch(value: string): Rgb | undefined {
  const match =
    /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+(-?[\d.]+)(deg|rad|turn|grad)?(?:\s*\/\s*[\d.]+%?)?\s*\)$/.exec(
      value,
    );

  if (match === null) {
    return undefined;
  }

  const lightness = Number(match[1]);
  const chroma = Number(match[3]);
  const hue = Number(match[4]);

  if (![lightness, chroma, hue].every(Number.isFinite)) {
    return undefined;
  }

  return oklchToSrgb(
    match[2] === '%' ? lightness / 100 : lightness,
    chroma,
    hueToDegrees(hue, match[5]),
  );
}

export function parseCssRgb(value: string): Rgb | undefined {
  const source = value.trim().toLowerCase();
  const rgbMatch = /^rgba?\(\s*([\d.]+%?)\s*[, ]\s*([\d.]+%?)\s*[, ]\s*([\d.]+%?)/.exec(source);

  if (rgbMatch !== null) {
    return rgb(parseByte(rgbMatch[1]), parseByte(rgbMatch[2]), parseByte(rgbMatch[3]));
  }

  const srgbMatch = /^color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(source);

  if (srgbMatch !== null) {
    return rgb(parseUnit(srgbMatch[1]), parseUnit(srgbMatch[2]), parseUnit(srgbMatch[3]));
  }

  return parseOklch(source) ?? parseOklab(source);
}

function rasterizeCssColor(value: string): Rgb | undefined {
  const canvas = document.createElement('canvas');

  canvas.width = 1;
  canvas.height = 1;

  const context = canvas.getContext('2d');

  if (context === null) {
    return undefined;
  }

  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);

  const pixel = context.getImageData(0, 0, 1, 1).data;

  return [pixel[0] / 255, pixel[1] / 255, pixel[2] / 255];
}

function hexByte(channel: number): string {
  return Math.round(Math.min(1, Math.max(0, channel)) * 255)
    .toString(16)
    .padStart(2, '0');
}

export function hexFromRgb(color: Rgb): string {
  return `#${hexByte(color[0])}${hexByte(color[1])}${hexByte(color[2])}`;
}

export function readCssRgb(variable: `--${string}`): Rgb | undefined {
  const probe = document.createElement('span');

  probe.style.color = `var(${variable})`;
  document.body.append(probe);

  const computed = getComputedStyle(probe).color;

  probe.remove();

  return parseCssRgb(computed) ?? rasterizeCssColor(computed);
}

export function syncThemeColor(color: Rgb): void {
  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta === null) {
    return;
  }

  meta.setAttribute('content', hexFromRgb(color));
}
