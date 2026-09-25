// Draws the site icons (favicon.ico, icon.png, apple-icon.png) from the
// mark in public/brand/mark.svg: an ink mark on a paper tile, so it reads on
// light and dark browser tabs alike.
// Run: PLAYWRIGHT=… CHROMIUM=… node scripts/icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
const mark = readFileSync(new URL("../public/brand/mark.svg", import.meta.url)).toString("base64");

// The mark fills more of the tile at small sizes, where every pixel counts.
const html = (size, radius) => `<!doctype html><style>
html, body { margin: 0; background: transparent; }
div { width: ${size}px; height: ${size}px; background: #fff; border-radius: ${radius}px;
  display: grid; place-items: center; box-sizing: border-box; }
img { width: ${size <= 48 ? 92 : 76}%; height: auto; display: block; }
</style><div><img src="data:image/svg+xml;base64,${mark}"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM });
async function draw(size, radius) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(html(size, radius));
  await page.waitForFunction(() => document.images[0].complete);
  const png = await page.screenshot({ omitBackground: true });
  await page.close();
  return png;
}

// Square corners to match the 4px control radius, scaled.
writeFileSync(new URL("../src/app/icon.png", import.meta.url), await draw(512, 24));
// iOS rounds its own corners, so the tile is full bleed.
writeFileSync(new URL("../src/app/apple-icon.png", import.meta.url), await draw(180, 0));

// favicon.ico: 16, 32 and 48 pixel PNGs in one ICO container.
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await draw(s, Math.max(1, Math.round(s / 16))));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([header, ...pngs]));
await browser.close();
