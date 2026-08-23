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

  return undefined;
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

  const color = parseCssRgb(getComputedStyle(probe).color);

  probe.remove();

  return color;
}

export function syncThemeColor(color: Rgb): void {
  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta === null) {
    return;
  }

  meta.setAttribute('content', hexFromRgb(color));
}
