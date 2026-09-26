/**
 * Draws the Pinterest pins in public/pins/ (1000 by 1500 pixels) in the
 * site's style: ink on paper, heavy lowercase Archivo, category colour only
 * where a pin names the category. Every fact must match the page the pin
 * links to. Run from the repo root:
 *
 *   PLAYWRIGHT=<path to playwright/index.mjs> CHROMIUM=<path> node scripts/pins.mjs
 *
 * Playwright is not a dependency of the site, so both paths come from the
 * environment (Claude's sandbox: /opt/node22/lib/node_modules/playwright/index.mjs
 * and /opt/pw-browsers/chromium).
 */
import { readFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
const OUT = "public/pins";
const font = readFileSync("src/assets/archivo-latin.woff2").toString("base64");
const C = { water: "#4a9aeb", food: "#f4683a", power: "#ffc425", health: "#5db84a", news: "#b49af2", money: "#f7a1c4", people: "#2ec4b6" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const tins = (items) => `<div class="tins">${items.map(([t, c]) => `<div class="tin" style="background:${c || "#fff"}">${esc(t)}</div>`).join("")}</div>`;
const list = (items, colour) => `<ul class="list">${items.map((t) => `<li><span class="sw" style="background:${colour || "#fff"}"></span>${esc(t)}</li>`).join("")}</ul>`;
const ticks = (items) => `<ul class="list">${items.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join("")}</ul>`;
const big = (n, sub, colour) => `<div class="big"${colour ? ` style="--c:${colour}"` : ""}><span class="num">${esc(n)}</span><span class="sub">${esc(sub)}</span></div>`;

const pins = [
  { file: "01-checklist", title: "what to keep at home", lede: "A UK checklist for power cuts, water outages and storms. Take off what you already have.",
    body: tins([["water", C.water], ["food", C.food], ["light", C.power], ["first aid", C.health], ["cash", C.money], ["radio", C.news]]), source: "Amounts from gov.uk and the WHO" },
  { file: "02-water", title: "how much water to store", lede: "",
    body: big("3 litres", "per person, per day. For 3 days, that is 9 litres each.", C.water), source: "gov.uk, from the World Health Organisation" },
  { file: "03-power-cut", title: "in a power cut, call", lede: "",
    body: big("105", "Free from any phone in Great Britain.") + ticks(["Check whether it is just your home", "Keep the fridge and freezer shut", "Switch appliances off at the wall"]), source: "Northern Ireland: NIE Networks, 03457 643 643" },
  { file: "04-no-cook-food", title: "food that needs no cooking", lede: "From your own cupboard, for a power cut.",
    body: list(["Tinned fish", "Crackers and nut butter", "Tinned fruit", "Oatcakes", "Long-life milk"], C.food), source: "Choose tins in water, not brine or syrup" },
  { file: "05-weather-warnings", title: "weather warnings explained", lede: "The Met Office uses 3 colours.",
    body: `<div class="rows"><div class="row"><b>yellow</b><span>be aware</span></div><div class="row"><b>amber</b><span>be prepared</span></div><div class="row"><b>red</b><span>take action</span></div></div>`, source: "When one covers your area, charge phones the day before" },
  { file: "06-clocks-change", title: "check your kit twice a year", lede: "When the clocks change. It takes 10 minutes.",
    body: ticks(["Test the torch", "Check the batteries", "Swap water past its date", "Check food dates"]), source: "In spring and autumn, the day the clocks change" },
  { file: "07-keep-warm", title: "if the heating fails", lede: "",
    body: big("18°C", "The NHS suggests keeping a living room at 18°C or more.") + ticks(["Pick one room and close the door", "Draw the curtains", "Dress in layers", "Fill hot-water bottles before a cut"]), source: "Cold is hardest on older people and babies" },
  { file: "08-priority-services", title: "the priority services register", lede: "Free extra help from your energy and water companies in a cut.",
    body: ticks(["Warning of planned cuts", "Priority help and updates", "Water brought to your door", "A password for callers"]), source: "For older, disabled or unwell people, and homes with young children" },
];

// The site mark, as in components/Wordmark.tsx.
const MARK = `<svg viewBox="-36 -36 72 72" width="36" height="36" fill="#141414" aria-hidden="true">${[0, 45, 90, 135].map((r) => `<rect x="-7.3255" y="-35.6315" width="14.651" height="71.263" transform="rotate(${r})"/>`).join("")}</svg>`;

const css = `
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1000px;height:1500px;background:#fff;color:#141414;font-family:Archivo,Arial,sans-serif}
.pin{width:1000px;height:1500px;padding:72px 72px 0;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font-weight:900;font-variation-settings:"wdth" 118;font-size:40px;border-bottom:5px solid #141414;padding-bottom:18px;letter-spacing:-.01em}
h1{font-weight:900;font-variation-settings:"wdth" 112;font-size:112px;line-height:.9;letter-spacing:-.025em;margin-top:56px}
.lede{font-size:40px;line-height:1.25;margin-top:30px;font-weight:500;max-width:22ch}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:44px}
.big{display:flex;flex-direction:column;border:6px solid #141414;background:var(--c,#fff);padding:28px 36px}
.big .num{font-weight:900;font-variation-settings:"wdth" 115;font-size:220px;line-height:.9;letter-spacing:-.03em}
.big .sub{font-size:38px;line-height:1.25;font-weight:600;margin-top:14px}
.tins{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.tin{border:6px solid #141414;height:150px;display:grid;place-items:center;font-weight:800;font-size:46px}
.list{list-style:none;border-top:6px solid #141414}
.list li{display:flex;align-items:center;gap:26px;font-size:44px;font-weight:700;padding:22px 0;border-bottom:2px solid #141414;line-height:1.15}
.sw{width:40px;height:40px;border:5px solid #141414;flex:none}
.box{width:46px;height:46px;border:5px solid #141414;border-radius:4px;flex:none}
.rows{border-top:6px solid #141414}
.row{display:flex;justify-content:space-between;align-items:baseline;padding:30px 0;border-bottom:2px solid #141414}
.row b{font-weight:900;font-variation-settings:"wdth" 115;font-size:84px}
.row span{font-size:48px;font-weight:700}
.foot{margin:0 -72px;border-top:22px solid #141414;padding:26px 72px 40px;display:flex;flex-direction:column;gap:8px}
.url{font-weight:900;font-variation-settings:"wdth" 112;font-size:48px}
.src{font-size:28px;color:#3f3f3f;font-weight:500}
`;

const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
for (const pin of pins) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="pin"><p class="brand">${MARK}stayprepared</p><h1>${esc(pin.title)}</h1>${pin.lede ? `<p class="lede">${esc(pin.lede)}</p>` : ""}<div class="main">${pin.body}</div><div class="foot"><span class="url">stayprepared.co.uk</span><span class="src">${esc(pin.source)}</span></div></div></body></html>`;
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const over = await p.evaluate(() => ({ h: document.querySelector(".pin").scrollHeight, w: document.documentElement.scrollWidth }));
  await p.screenshot({ path: `${OUT}/${pin.file}.png`, clip: { x: 0, y: 0, width: 1000, height: 1500 } });
  console.log(pin.file, over.h > 1500 ? "OVERFLOW " + over.h : "ok", over.w > 1000 ? "WIDE" : "");
}
await b.close();
