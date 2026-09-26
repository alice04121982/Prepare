/**
 * Draws the share image, src/app/opengraph-image.png (1200 by 630), in the
 * site's style: the lockup, the one-line summary and the shelf of tins.
 * Run from the repo root:
 *
 *   PLAYWRIGHT=<path to playwright/index.mjs> CHROMIUM=<path> node scripts/og.mjs
 */
import { readFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
const font = readFileSync("src/assets/archivo-latin.woff2").toString("base64");
const C = { water: "#4a9aeb", food: "#f4683a", power: "#ffc425", health: "#5db84a", news: "#b49af2", money: "#f7a1c4", people: "#2ec4b6" };
const tins = [["water", C.water], ["warmth", C.power], ["food", C.food], ["cash", C.money], ["radio", C.news], ["neighbours", C.people], ["medicine", C.health]];

// The site mark, as in public/brand/mark.svg and components/Wordmark.tsx.
const MARK = `<svg viewBox="-36 -36 72 72" class="mark"><g fill="#141414">${[0, 60, 120].map((r) => `<rect x="-7.3255" y="-35.6315" width="14.651" height="71.263" transform="rotate(${r})"/>`).join("")}</g></svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;background:#fff;color:#141414;font-family:Archivo,Arial,sans-serif}
.og{width:1200px;height:630px;padding:84px 72px 64px;display:flex;flex-direction:column}
.lock{display:flex;align-items:center;gap:.3em;font-weight:900;font-variation-settings:"wdth" 118;font-size:112px;line-height:1;letter-spacing:-.02em}
.mark{width:.85em;height:.85em;flex:none}
.line{font-size:40px;line-height:1.2;font-weight:600;margin-top:40px;max-width:26ch}
.tins{margin-top:auto;display:grid;grid-template-columns:repeat(7,1fr);gap:12px;border-bottom:8px solid #141414}
.tin{height:92px;border:3px solid #141414;border-bottom:0;display:grid;place-items:center;font-weight:800;font-size:22px}
</style></head><body><div class="og">
<p class="lock">${MARK}stayprepared</p>
<p class="line">Getting your household ready for disruption, whether it lasts a day or months.</p>
<div class="tins">${tins.map(([t, c]) => `<div class="tin" style="background:${c}">${t}</div>`).join("")}</div>
</div></body></html>`;

const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: "src/app/opengraph-image.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await b.close();
