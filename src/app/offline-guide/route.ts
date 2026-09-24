import { readFileSync } from "node:fs";
import { join } from "node:path";
import { catFor } from "@/components/checklist/cats";
import type { Cat } from "@/components/PageIntro";
import { checklist, startingPoint } from "@/data/checklist";
import { faq } from "@/data/faq";
import { guides } from "@/data/guides";
import { scenarios } from "@/data/scenarios";
import { SITE_URL } from "@/lib/site";

/**
 * The offline guide: one self-contained HTML file, built from the same data
 * as the site, so it never drifts from it. Rendered once at build time and
 * served as a download named "Offline guide.html". The Archivo font is
 * embedded (SIL Open Font License), so the file needs no connection to look
 * like the site. No scripts, no external requests.
 */
export const dynamic = "force-static";

const FILE_NAME = "Offline guide.html";

/** The category colours from globals.css. The file cannot read the site's CSS. */
const CAT_HEX: Record<Cat, string> = {
  water: "#4a9aeb",
  food: "#f4683a",
  power: "#ffc425",
  health: "#5db84a",
  news: "#b49af2",
  money: "#f7a1c4",
  people: "#2ec4b6",
};

/** Numbers worth having on paper. Each also appears, with its source, in a guide. */
const NUMBERS: [string, string][] = [
  ["999", "Emergency services, when life is at risk"],
  ["105", "Power cut, anywhere in Great Britain, free"],
  ["0800 111 999", "Gas emergency, if you smell gas"],
  ["0345 988 1188", "Floodline, for flood warnings"],
  ["111", "NHS, when it is urgent but not an emergency"],
];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const swatch = (cat: Cat | undefined) =>
  cat ? `<span class="sw" style="background:${CAT_HEX[cat]}"></span>` : `<span class="sw"></span>`;

function steps(items: { title: string; body: string }[]) {
  return `<ol class="steps">${items
    .map((s, i) => `<li><span class="n">${i + 1}</span><div><h4>${esc(s.title)}</h4><p>${esc(s.body)}</p></div></li>`)
    .join("")}</ol>`;
}

function build() {
  const font = readFileSync(join(process.cwd(), "src/assets/archivo-latin.woff2")).toString("base64");
  const made = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  const first = startingPoint
    .map((i) => {
      const cat = catFor(checklist.find((c) => c.title === i.category)?.slug ?? "");
      return `<li>${swatch(cat)}<div><strong>${esc(i.item)}</strong><span>${esc(i.amount)}</span></div></li>`;
    })
    .join("");

  const kit = checklist
    .map((c) => {
      const cat = catFor(c.slug);
      return `<section class="cat"><h3>${swatch(cat)}${esc(c.title.toLowerCase())}</h3><ul class="items">${c.items
        .map((i) => `<li><strong>${esc(i.item)}</strong><span class="amt">${esc(i.amount)}</span><span class="note">${esc(i.notes)}</span></li>`)
        .join("")}</ul></section>`;
    })
    .join("");

  const stops = scenarios
    .map(
      (s) =>
        `<section class="scn"><h3>${esc(s.title.toLowerCase())}</h3><p class="dur">${esc(s.typicalDuration)}</p><p>${esc(s.summary)}</p><p>${esc(
          s.whatHelps.slice(0, 2).join(" "),
        )}</p></section>`,
    )
    .join("");

  const answers = guides
    .map(
      (g) =>
        `<section class="guide"><h3>${esc(g.title)}</h3>${g.answer.map((a) => `<p class="lede">${esc(a)}</p>`).join("")}${steps(g.steps)}${
          g.warning ? `<aside class="box"><p class="bt">${esc(g.warning.title)}</p><p>${esc(g.warning.body)}</p></aside>` : ""
        }</section>`,
    )
    .join("");

  const questions = faq
    .flatMap((g) => g.entries)
    .map((e) => `<div class="q"><h4>${esc(e.question)}</h4>${e.answer.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`)
    .join("");

  const numbers = NUMBERS.map(([n, what]) => `<li><strong>${esc(n)}</strong><span>${esc(what)}</span></li>`).join("");

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Offline guide | Stay Prepared</title>
<style>
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(data:font/woff2;base64,${font}) format("woff2")}
:root{--ink:#141414;--ink-2:#3f3f3f;--hush:#f2f2f0;--paper:#fff}
*{box-sizing:border-box;margin:0}
body{background:var(--paper);color:var(--ink);font-family:Archivo,Arial,sans-serif;font-size:17px;line-height:1.55}
.wrap{max-width:780px;margin:0 auto;padding:32px 16px 64px}
.brand{font-weight:900;font-variation-settings:"wdth" 118;font-size:26px;letter-spacing:-.01em;border-bottom:3px solid var(--ink);padding-bottom:14px}
h1{font-weight:900;font-variation-settings:"wdth" 112;font-size:clamp(44px,11vw,76px);line-height:.92;letter-spacing:-.02em;margin-top:28px}
.intro{font-size:20px;margin-top:18px;max-width:46ch}
.made{margin-top:10px;color:var(--ink-2);font-size:14px}
h2{font-weight:900;font-variation-settings:"wdth" 110;font-size:32px;line-height:1.05;border-top:3px solid var(--ink);padding-top:18px;margin-top:48px}
h3{font-weight:800;font-size:22px;line-height:1.15;margin-top:28px;display:flex;align-items:center;gap:10px}
h4{font-weight:800;font-size:18px;line-height:1.25}
p+p{margin-top:8px}
.box{border:3px solid var(--ink);margin-top:20px}
.box .bt{font-weight:800;border-bottom:6px solid var(--ink);padding:10px 16px;margin:0}
.box p{padding:12px 16px;margin:0}
.sw{display:inline-block;width:14px;height:14px;border:2px solid var(--ink);flex:none;background:var(--paper)}
ul{list-style:none;padding:0}
.first,.numbers{border-top:3px solid var(--ink);margin-top:16px}
.first li,.numbers li{display:flex;gap:12px;align-items:baseline;border-bottom:1px solid var(--ink);padding:10px 0}
.first li div{display:flex;flex-direction:column}
.first li span,.numbers li span{color:var(--ink-2)}
.numbers strong{min-width:9.5em;font-variant-numeric:tabular-nums;font-size:19px}
.items{border-top:3px solid var(--ink);margin-top:10px}
.items li{border-bottom:1px solid var(--ink);padding:10px 0;display:flex;flex-direction:column}
.items .amt{margin-top:2px}
.items .note{color:var(--ink-2);font-size:15px;margin-top:2px}
.scn .dur{font-weight:700;margin-top:4px}
.guide .lede{font-size:19px;margin-top:8px}
.steps{list-style:none;padding:0;margin-top:14px;border-bottom:3px solid var(--ink)}
.steps li{display:grid;grid-template-columns:40px 1fr;gap:14px;border-top:3px solid var(--ink);padding:12px 0}
.steps .n{background:var(--ink);color:var(--paper);width:40px;height:40px;display:grid;place-items:center;font-weight:900;font-size:22px;font-variation-settings:"wdth" 115}
.steps p{margin-top:2px}
.q{margin-top:22px}
.q p{margin-top:6px}
footer{margin-top:56px;border-top:3px solid var(--ink);padding-top:14px;color:var(--ink-2);font-size:14px}
@media print{body{font-size:11pt}.wrap{padding:0}h2{break-after:avoid}.guide,.cat,.scn{break-inside:avoid-page}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<div class="wrap">
<p class="brand">stay prepared</p>
<h1>offline guide</h1>
<p class="intro">What to keep, how much, and what to do when something stops. This file works with no internet: keep it on your phone, print it, or share it.</p>
<p class="made">Made from ${esc(SITE_URL.replace("https://", ""))} on ${esc(made)}. Check official guidance for your area too.</p>

<h2>numbers to keep</h2>
<ul class="numbers">${numbers}</ul>

<h2>get these first</h2>
<p style="margin-top:12px">If you are starting from nothing, these cover most short disruptions.</p>
<ul class="first">${first}</ul>

<h2>short answers</h2>
${answers}

<h2>what might stop, and for how long</h2>
${stops}

<h2>the full checklist</h2>
${kit}

<h2>questions people ask</h2>
${questions}

<footer>
<p>Stay Prepared. Figures come from gov.uk, the NHS, the Met Office and the World Health Organisation, as named on the site. This file has no tracking and makes no requests. Save, print or share it freely.</p>
</footer>
</div>
</body>
</html>`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${FILE_NAME}"; filename*=UTF-8''${encodeURIComponent(FILE_NAME)}`,
    },
  });
}
