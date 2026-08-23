import { clampGamut, converter, formatHex, parse } from 'culori';

export type Rgb = readonly [number, number, number];

const toRgb = converter('rgb');
const toSrgbGamut = clampGamut('rgb');

export function parseCssRgb(value: string): Rgb | undefined {
  const parsed = parse(value);

  if (parsed === undefined) {
    return undefined;
  }

  const rgb = toRgb(toSrgbGamut(parsed) ?? parsed);

  if (![rgb.r, rgb.g, rgb.b].every(Number.isFinite)) {
    return undefined;
  }

  return [rgb.r, rgb.g, rgb.b];
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

export function hexFromRgb(color: Rgb): string {
  return formatHex({ b: color[2], g: color[1], mode: 'rgb', r: color[0] });
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
