/**
 * Draws the round profile picture for Pinterest and Bluesky: the asterisk in
 * the middle, "stay prepared" set round it like a badge, in heavy lowercase
 * Archivo. 1000 by 1000 (both sites crop to a circle, so everything sits
 * inside it). Run from the repo root:
 *
 *   PLAYWRIGHT=<path to playwright/index.mjs> CHROMIUM=<path> node scripts/avatar.mjs [--explore]
 *
 * The top words sit outside their baseline and fan out; the bottom words sit
 * inside theirs and bunch up. So the bottom line is stretched to cover the
 * same angle as the top one, which makes the letter spacing look the same.
 * `--explore` also draws colour options for the mark into /tmp/avatar-explore.
 */
import { mkdirSync, readFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
const font = readFileSync("src/assets/archivo-latin.woff2").toString("base64");

const INK = "#141414";
const PAPER = "#ffffff";
const C = { water: "#4a9aeb", food: "#f4683a", power: "#ffc425", health: "#5db84a", money: "#f7a1c4", news: "#b49af2", people: "#2ec4b6" };
// The asterisk, as in components/Wordmark.tsx.
const arms = [0, 45, 90, 135].map((r) => `<rect x="-7.3255" y="-35.6315" width="14.651" height="71.263" transform="rotate(${r})"/>`).join("");

const R_TOP = 352;
const R_BOTTOM = R_TOP + 62;

/** fg: text and ring; bg: background; mark: centre asterisk fill; outline: ink edge on a coloured mark. */
function badge({ fg, bg, mark = fg, outline = false }) {
  const text = (id) => `<text id="t-${id}" font-family="Archivo" font-weight="900" font-size="104" fill="${fg}" letter-spacing="6"
        style="font-variation-settings:'wdth' 112" text-anchor="middle"><textPath href="#${id}" startOffset="50%">stay prepared</textPath></text>`;
  // A coloured mark on paper gets an ink edge: an ink asterisk drawn a little
  // fatter underneath, so the edge runs round the whole shape, not across it.
  const edge = outline ? `<g fill="${INK}" stroke="${INK}" stroke-width="4.4" stroke-linejoin="miter" transform="translate(500,500) scale(5.4)">${arms}</g>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <path id="top" d="M${500 - R_TOP},500 A${R_TOP},${R_TOP} 0 0,1 ${500 + R_TOP},500"/>
    <path id="bottom" d="M${500 - R_BOTTOM},500 A${R_BOTTOM},${R_BOTTOM} 0 0,0 ${500 + R_BOTTOM},500"/>
  </defs>
  <rect width="1000" height="1000" fill="${bg}"/>
  <circle cx="500" cy="500" r="470" fill="none" stroke="${fg}" stroke-width="12"/>
  ${text("top")}
  ${text("bottom")}
  <g fill="${fg}">
    <g transform="translate(${500 - 356},500) scale(0.6)">${arms}</g>
    <g transform="translate(${500 + 356},500) scale(0.6)">${arms}</g>
  </g>
  ${edge}
  <g fill="${mark}" transform="translate(500,500) scale(5.4)">${arms}</g>
</svg>`;
}

const css = `@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}html,body{margin:0;width:1000px;height:1000px}`;
const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });

async function draw(opts, path) {
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${badge(opts)}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  // Stretch the bottom line to the top line's angle: same angle, larger radius.
  await p.evaluate(([rt, rb]) => {
    const top = document.getElementById("t-top");
    const bottom = document.getElementById("t-bottom");
    const angle = top.getComputedTextLength() / rt;
    bottom.querySelector("textPath").setAttribute("textLength", String(angle * rb));
    bottom.querySelector("textPath").setAttribute("lengthAdjust", "spacing");
  }, [R_TOP, R_BOTTOM]);
  await p.screenshot({ path, clip: { x: 0, y: 0, width: 1000, height: 1000 } });
  console.log(path);
}

await draw({ fg: INK, bg: PAPER }, "public/brand/avatar.png");
await draw({ fg: PAPER, bg: INK }, "public/brand/avatar-ink.png");

if (process.argv.includes("--explore")) {
  mkdirSync("/tmp/avatar-explore", { recursive: true });
  for (const [name, colour] of Object.entries(C)) {
    await draw({ fg: INK, bg: PAPER, mark: colour, outline: true }, `/tmp/avatar-explore/paper-${name}.png`);
    await draw({ fg: PAPER, bg: INK, mark: colour }, `/tmp/avatar-explore/ink-${name}.png`);
  }
}
await b.close();
