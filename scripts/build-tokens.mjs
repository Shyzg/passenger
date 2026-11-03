// Compiles design-system/tokens.json into design-system/tokens.css, in the shape the Design System
// artifact page compiles it: theme blocks, one :root block of sizes and font stacks, a class per type
// style, then @font-face per font file. Run: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../design-system/', import.meta.url);
const t = JSON.parse(readFileSync(new URL('tokens.json', dir), 'utf8'));

const themes = t.color.themes.map((theme) => theme.id);
// Token names may contain "."; custom property and class names need it escaped (--space-1\.5).
const esc = (name) => String(name).replace(/\./g, '\\.');
// Bare numbers in length fields mean px.
const len = (value) => (typeof value === 'number' ? `${value}px` : value);
// Colours and shadows are one string or a per-theme object; a missing theme uses the first theme's value,
// and "{name}" points at another token.
const themed = (value, theme) => {
  const v = typeof value === 'string' ? value : (value[theme] ?? value[themes[0]]);
  return v.replace(/^\{(.+)\}$/, (_, ref) => `var(--${esc(ref)})`);
};

const themedTokens = [...t.color.tokens, ...(t.shadow?.tokens ?? [])];
const themeBlock = (selector, theme) => [
  `${selector} {`,
  ...themedTokens.map((token) => `  --${esc(token.name)}: ${themed(token.value, theme)};`),
  '}',
];

// Any other top-level { tokens: [...] } family (size here; opacity, zIndex...) is a plain CSS value.
const named = new Set(['color', 'type', 'shadow', 'spacing', 'radius']);
const otherFamilies = Object.keys(t).filter((key) => !named.has(key) && Array.isArray(t[key]?.tokens));
const rootVars = [
  ...['spacing', 'radius'].flatMap((key) => (t[key]?.tokens ?? []).map((token) => `  --${esc(token.name)}: ${len(token.value)};`)),
  ...otherFamilies.flatMap((key) => t[key].tokens.map((token) => `  --${esc(token.name)}: ${token.value};`)),
  ...Object.entries(t.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`),
];

const typeClass = (group, style) => {
  const decls = [
    `font-family: var(--font-${style.family ?? group.family});`,
    `font-size: ${len(style.fontSize)};`,
    `line-height: ${style.lineHeight};`,
    `font-weight: ${style.fontWeight};`,
  ];
  if (style.letterSpacing !== undefined) decls.push(`letter-spacing: ${len(style.letterSpacing)};`);
  if (style.fontStyle) decls.push(`font-style: ${style.fontStyle};`);
  if (style.opticalSize !== undefined) decls.push(`font-variation-settings: 'opsz' ${style.opticalSize};`);
  return `.${esc(style.name)} { ${decls.join(' ')} }`;
};

// A bare file name lives in fonts/, next to tokens.css.
const fontFace = (font) => {
  const file = font.file.includes('/') ? font.file : `fonts/${font.file}`;
  const decls = [`font-family: "${font.family}";`, `src: url("${file}");`];
  if (font.weight) decls.push(`font-weight: ${font.weight};`);
  if (font.style) decls.push(`font-style: ${font.style};`);
  return `@font-face { ${decls.join(' ')} }`;
};

const css = [
  '/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */',
  ...themeBlock(`:root, [data-theme="${themes[0]}"]`, themes[0]),
  ...themes.slice(1).flatMap((theme) => themeBlock(`[data-theme="${theme}"]`, theme)),
  ':root {',
  ...rootVars,
  '}',
  ...t.type.groups.flatMap((group) => group.styles.map((style) => typeClass(group, style))),
  ...(t.type.fonts ?? []).map(fontFace),
];

writeFileSync(new URL('tokens.css', dir), css.join('\n') + '\n');
console.log(`tokens.css: ${themes.length} themes, ${themedTokens.length + rootVars.length} variables, ${t.type.groups.reduce((n, g) => n + g.styles.length, 0)} type classes`);
