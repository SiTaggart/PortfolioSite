import { expect, test } from 'bun:test';

import { parseCssRgb } from './css-rgb';

test('parses the oklch form Chrome returns for these tokens', () => {
  const paper = parseCssRgb('oklch(0.13 0.032 270)');
  const ink = parseCssRgb('oklch(0.78 0.22 335)');

  expect(paper).toBeDefined();
  expect(ink).toBeDefined();
  expect(paper?.[0]).toBeLessThan(0.05);
  expect(ink?.[0]).toBeGreaterThan(0.9);
});

test('parses oklch with deg and alpha, which some engines serialize', () => {
  const color = parseCssRgb('oklch(0.78 0.22 335deg / 1)');

  expect(color).toBeDefined();
  expect(color?.[0]).toBeGreaterThan(0.9);
});

test('parses rgb used values', () => {
  expect(parseCssRgb('rgb(4, 6, 20)')).toEqual([4 / 255, 6 / 255, 20 / 255]);
});
