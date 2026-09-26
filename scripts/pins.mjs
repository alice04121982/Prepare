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
const big = (n, sub, colour, size) => `<div class="big"${colour ? ` style="--c:${colour}"` : ""}><span class="num"${size ? ` style="font-size:${size}px"` : ""}>${esc(n)}</span><span class="sub">${esc(sub)}</span></div>`;
const note = (t) => `<p class="note">${esc(t)}</p>`;
// Met Office warning colours. The one exception to the Label Rule: these are
// official colours, shown only on the warning pin, each named beside its swatch.
const W = { yellow: "#ffd400", amber: "#ff9d00", red: "#e4002b" };

/**
 * Each pin: a title (the search phrase), an optional lede, the body, `go`
 * (what the linked page adds, so there is a reason to tap) and a source.
 * `bg` fills the pin with a category colour, only where the pin names that
 * category (water, food, power); everything else is ink on paper.
 */
const pins = [
  { file: "01-checklist", title: "what to keep at home", lede: "A UK emergency kit list for power cuts, water outages and storms.",
    body: tins([["water", C.water], ["food", C.food], ["light", C.power], ["first aid", C.health], ["cash", C.money], ["radio", C.news]]),
    go: "The full list, with amounts for your household", source: "Amounts from gov.uk and the WHO" },
  { file: "02-water", title: "how much water to store", bg: C.water,
    body: big("3 litres", "per person, per day, for at least 3 days. That is 9 litres each.", null, 186),
    go: "How much your household needs, in bottles", source: "gov.uk, from the World Health Organisation" },
  { file: "03-power-cut", title: "in a power cut, call", bg: C.power,
    body: big("105", "Free from any phone in Great Britain.") + ticks(["Check whether it is just your home", "Keep the fridge and freezer shut", "Switch appliances off at the wall"]),
    go: "What to do first, and how long your freezer lasts", source: "Northern Ireland: NIE Networks, 03457 643 643" },
  { file: "04-no-cook-food", title: "emergency food that needs no cooking", small: true, bg: C.food, lede: "From your own cupboard, for a power cut.",
    body: list(["Tinned fish", "Crackers and nut butter", "Tinned fruit", "Oatcakes", "Long-life milk"]),
    go: "The full list, and what to buy", source: "Choose tins in water, not brine or syrup" },
  { file: "05-weather-warnings", title: "weather warnings explained", lede: "The Met Office uses 3 colours.",
    body: `<div class="rows">${[["yellow", "be aware"], ["amber", "be prepared"], ["red", "take action"]].map(([k, v]) => `<div class="row"><b><span class="sw sw-lg" style="background:${W[k]}"></span>${k}</b><span>${v}</span></div>`).join("")}</div>`,
    go: "What to do before an amber or red arrives", source: "Colours and meanings from the Met Office" },
  { file: "06-clocks-change", title: "check your kit twice a year", lede: "When the clocks change, in spring and autumn.",
    body: ticks(["Test torches and batteries", "Check first aid supplies", "Check medication dates", "Swap stored water"]),
    go: "Everything to keep, with amounts", source: "An easy habit, twice a year" },
  { file: "07-keep-warm", title: "if the heating fails",
    body: big("18°C", "The NHS suggests a living room at 18°C or more.") + ticks(["Heat one room and close the door", "Draw the curtains and dress in layers"]),
    go: "How to keep warm without heating", source: "Cold is hardest on older people and babies" },
  { file: "08-priority-services", title: "free help in a power cut", lede: "The Priority Services Register, from your energy and water companies.",
    body: list(["Warning of planned cuts", "Updates and help first", "Water brought to your door"]) + note("Free to join if anyone at home is older, disabled, unwell, pregnant, has young children, or relies on powered medical equipment."),
    go: "Who can join, and how", source: "From your energy network and water company" },
  { file: "09-grab-bag", title: "grab bag checklist", lede: "What to pack if you have to leave home in a hurry.",
    body: ticks(["Water and food that needs no cooking", "A week of each person's medication", "Torch, radio and spare batteries", "Power bank and cables", "Copies of ID and insurance", "Cash in small notes"]),
    go: "The full list, sized to your household", source: "Add nappies, formula or pet food if you need them" },
  { file: "10-flood-warning", title: "if you get a flood warning", lede: "Flooding is expected. Act now.",
    body: big("0345 988 1188", "Floodline, for warnings where you live.", null, 86) + ticks(["Move people, pets and medicines upstairs", "Put a bag by the door", "Turn off gas, power and water, if safe"]),
    go: "What each warning level means", source: "Check warnings on gov.uk: check for flooding" },
];

// The site mark, as in components/Wordmark.tsx.
const MARK = `<svg viewBox="-36 -36 72 72" width="44" height="44" fill="#141414" aria-hidden="true">${[0, 60, 120].map((r) => `<rect x="-7.3255" y="-35.6315" width="14.651" height="71.263" transform="rotate(${r})"/>`).join("")}</svg>`;

const css = `
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1000px;height:1500px;background:#fff;color:#141414;font-family:Archivo,Arial,sans-serif}
.pin{width:1000px;height:1500px;padding:80px 72px 0;display:flex;flex-direction:column;background:var(--bg,#fff)}
h1{font-weight:900;font-variation-settings:"wdth" 112;font-size:136px;line-height:.88;letter-spacing:-.03em}
h1.small{font-size:112px}
.lede{font-size:46px;line-height:1.2;margin-top:32px;font-weight:600;max-width:26ch}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:34px;padding:40px 0 32px}
.note{font-size:36px;line-height:1.3;font-weight:600}
.go{display:flex;align-items:center;gap:18px;font-weight:900;font-variation-settings:"wdth" 110;font-size:44px;line-height:1.1;padding-bottom:44px}
.go::before{content:"";width:0;height:0;border-top:20px solid transparent;border-bottom:20px solid transparent;border-left:30px solid #141414;flex:none}
.big{display:flex;flex-direction:column;border:6px solid #141414;background:var(--c,#fff);padding:28px 36px}
.big .num{white-space:nowrap}
.big .num{font-weight:900;font-variation-settings:"wdth" 115;font-size:220px;line-height:.9;letter-spacing:-.03em}
.big .sub{font-size:38px;line-height:1.25;font-weight:600;margin-top:14px}
.tins{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.tin{border:6px solid #141414;height:128px;display:grid;place-items:center;font-weight:800;font-size:46px}
.list{list-style:none;border-top:6px solid #141414}
.list li{display:flex;align-items:center;gap:26px;font-size:44px;font-weight:700;padding:22px 0;border-bottom:2px solid #141414;line-height:1.15}
.sw{width:40px;height:40px;border:5px solid #141414;flex:none}
.sw-lg{display:inline-block;width:64px;height:64px;margin-right:26px;vertical-align:-4px}
.box{width:46px;height:46px;border:5px solid #141414;border-radius:4px;flex:none}
.rows{border-top:6px solid #141414}
.row{display:flex;justify-content:space-between;align-items:baseline;padding:30px 0;border-bottom:2px solid #141414}
.row b{font-weight:900;font-variation-settings:"wdth" 115;font-size:84px}
.row span{font-size:48px;font-weight:700}
.foot{margin:0 -72px;border-top:22px solid #141414;background:#fff;padding:26px 72px 40px;display:flex;flex-direction:column;gap:8px}
.site{display:flex;align-items:center;gap:16px}
.url{font-weight:900;font-variation-settings:"wdth" 112;font-size:48px}
.src{font-size:28px;color:#3f3f3f;font-weight:500}
`;

const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
for (const pin of pins) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="pin"${pin.bg ? ` style="--bg:${pin.bg}"` : ""}><h1${pin.small ? ' class="small"' : ""}>${esc(pin.title)}</h1>${pin.lede ? `<p class="lede">${esc(pin.lede)}</p>` : ""}<div class="main">${pin.body}</div><p class="go">${esc(pin.go)}</p><div class="foot"><span class="site">${MARK}<span class="url">stayprepared.co.uk</span></span><span class="src">${esc(pin.source)}</span></div></div></body></html>`;
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const over = await p.evaluate(() => ({ h: document.querySelector(".pin").scrollHeight, w: document.documentElement.scrollWidth }));
  await p.screenshot({ path: `${OUT}/${pin.file}.png`, clip: { x: 0, y: 0, width: 1000, height: 1500 } });
  console.log(pin.file, over.h > 1500 ? "OVERFLOW " + over.h : "ok", over.w > 1000 ? "WIDE" : "");
}
await b.close();
