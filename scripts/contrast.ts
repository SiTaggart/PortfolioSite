const styleUrl = new URL('../src/styles.css', import.meta.url);
const minimumRatio = 4.5;
const pairs = [
  { background: 'background', foreground: 'foreground' },
  { background: 'background', foreground: 'muted-foreground' },
  { background: 'background', foreground: 'primary' },
] as const;

interface Oklch {
  c: number;
  h: number;
  l: number;
}

interface LinearRgb {
  b: number;
  g: number;
  r: number;
}

type TokenName = 'background' | 'foreground' | 'muted-foreground' | 'primary';

function firstRootBlock(css: string): string {
  const match = /:root\s*\{([^}]+)\}/.exec(css);

  if (match?.[1] === undefined) {
    throw new Error('src/styles.css has no :root block');
  }

  return match[1];
}

function parseOklch(value: string, token: string): Oklch {
  const match = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(value.trim());

  if (match === null) {
    throw new Error(`--${token} is not a space-separated oklch() color: ${value}`);
  }

  const l = Number(match[1]);
  const c = Number(match[2]);
  const h = Number(match[3]);

  if (![l, c, h].every(Number.isFinite)) {
    throw new Error(`--${token} has a non-numeric oklch() channel: ${value}`);
  }

  return { c, h, l };
}

function declaration(declarations: Map<string, string>, name: TokenName): string {
  const value = declarations.get(name);

  if (value === undefined) {
    throw new Error(`src/styles.css :root is missing --${name}`);
  }

  return value;
}

function readTokens(css: string): Record<TokenName, Oklch> {
  const declarations = new Map<string, string>();

  for (const match of firstRootBlock(css).matchAll(/--([a-z-]+)\s*:\s*([^;]+);/g)) {
    declarations.set(match[1], match[2].trim());
  }

  return {
    background: parseOklch(declaration(declarations, 'background'), 'background'),
    foreground: parseOklch(declaration(declarations, 'foreground'), 'foreground'),
    'muted-foreground': parseOklch(
      declaration(declarations, 'muted-foreground'),
      'muted-foreground',
    ),
    primary: parseOklch(declaration(declarations, 'primary'), 'primary'),
  };
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function oklchToLinearSrgb(color: Oklch): LinearRgb {
  const hue = (color.h * Math.PI) / 180;
  const a = color.c * Math.cos(hue);
  const b = color.c * Math.sin(hue);
  const l_ = color.l + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
  const m_ = color.l - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
  const s_ = color.l - 0.089_484_177_5 * a - 1.291_485_548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return {
    b: clamp01(-0.004_196_086_3 * l - 0.703_418_614_7 * m + 1.707_614_701 * s),
    g: clamp01(-1.268_438_004_6 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s),
    r: clamp01(4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s),
  };
}

function linearToEncoded(channel: number): number {
  if (channel <= 0.003_130_8) {
    return 12.92 * channel;
  }

  return 1.055 * channel ** (1 / 2.4) - 0.055;
}

function encodedToLinear(channel: number): number {
  if (channel <= 0.040_45) {
    return channel / 12.92;
  }

  return ((channel + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(color: Oklch): number {
  const linear = oklchToLinearSrgb(color);
  const r = encodedToLinear(Math.round(linearToEncoded(linear.r) * 255) / 255);
  const g = encodedToLinear(Math.round(linearToEncoded(linear.g) * 255) / 255);
  const b = encodedToLinear(Math.round(linearToEncoded(linear.b) * 255) / 255);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(first: Oklch, second: Oklch): number {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));

  return (lighter + 0.05) / (darker + 0.05);
}

const css = await Bun.file(styleUrl).text();
const tokens = readTokens(css);
const failures: Array<string> = [];

for (const pair of pairs) {
  const ratio = contrastRatio(tokens[pair.foreground], tokens[pair.background]);
  const line = `--${pair.foreground} on --${pair.background}: ${ratio.toFixed(2)}:1`;

  console.log(line);

  if (ratio < minimumRatio) {
    failures.push(`${line} (need ${minimumRatio}:1)`);
  }
}

if (failures.length > 0) {
  throw new Error(`Contrast below ${minimumRatio}:1\n${failures.join('\n')}`);
}

export {};
