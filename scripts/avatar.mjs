/**
 * Draws the round profile picture for Pinterest and Bluesky: the asterisk in
 * the middle, "stay prepared" set round it like a badge, in heavy lowercase
 * Archivo. Two versions, ink on paper and paper on ink, 1000 by 1000 (both
 * sites crop to a circle, so everything sits inside it). Run from the repo root:
 *
 *   PLAYWRIGHT=<path to playwright/index.mjs> CHROMIUM=<path> node scripts/avatar.mjs
 */
import { readFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
const font = readFileSync("src/assets/archivo-latin.woff2").toString("base64");

const INK = "#141414";
const PAPER = "#ffffff";
// The asterisk, as in components/Wordmark.tsx.
const arms = [0, 45, 90, 135].map((r) => `<rect x="-7.3255" y="-35.6315" width="14.651" height="71.263" transform="rotate(${r})"/>`).join("");

function badge(fg, bg) {
  // Top words run clockwise over the top; bottom words run left to right
  // along the bottom, on a slightly larger circle so both sit on the same ring.
  const r = 352;
  const rb = r + 62;
  const text = (href, offset) => `<text font-family="Archivo" font-weight="900" font-size="104" fill="${fg}" letter-spacing="6"
        style="font-variation-settings:'wdth' 112" text-anchor="middle"><textPath href="#${href}" startOffset="${offset}">stay prepared</textPath></text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <path id="top" d="M${500 - r},500 A${r},${r} 0 0,1 ${500 + r},500"/>
    <path id="bottom" d="M${500 - rb},500 A${rb},${rb} 0 0,0 ${500 + rb},500"/>
  </defs>
  <rect width="1000" height="1000" fill="${bg}"/>
  <circle cx="500" cy="500" r="470" fill="none" stroke="${fg}" stroke-width="12"/>
  <circle cx="500" cy="500" r="258" fill="none" stroke="${fg}" stroke-width="8"/>
  ${text("top", "50%")}
  ${text("bottom", "50%")}
  <g fill="${fg}">
    <g transform="translate(${500 - 356},500) scale(0.6)">${arms}</g>
    <g transform="translate(${500 + 356},500) scale(0.6)">${arms}</g>
    <g transform="translate(500,500) scale(4.6)">${arms}</g>
  </g>
</svg>`;
}

const css = `@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}html,body{margin:0;width:1000px;height:1000px}`;
const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
for (const [name, fg, bg] of [["avatar", INK, PAPER], ["avatar-ink", PAPER, INK]]) {
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${badge(fg, bg)}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `public/brand/${name}.png`, clip: { x: 0, y: 0, width: 1000, height: 1000 } });
  console.log(name, "ok");
}
await b.close();
