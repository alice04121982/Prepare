import type { ReactNode } from "react";
import { scenarios } from "@/data/scenarios";

/**
 * Explanatory figures for the page intro panels, drawn like the panel on the
 * back of a tin: the one number the page asks you to picture comes first, in
 * quantity type, then countable ink pictograms standing on a shelf rule.
 *
 * Rules (DESIGN.md, Diagrams):
 * - Nothing is drawn that does not carry a quantity or a plan.
 * - Shapes are flat: solid ink, paper with an ink outline, or a category
 *   colour with an ink outline. No opacity, no grey wash.
 * - A category colour appears only where its category is named: in the
 *   figure's head, or in a key printed with it. Colour fills carry
 *   `data-cat` so print turns them white.
 * - The headline number and captions are HTML, so they reflow and zoom;
 *   the SVG keeps only labels that belong inside the drawing, as real text.
 */

type Props = { name: DiagramName; className?: string };

export type DiagramName = "water" | "box" | "checkin" | "duration";

type Cat = "water" | "food" | "power" | "news" | "health" | "money";

const CAT_FILL: Record<Cat, string> = {
  water: "fill-cat-water",
  food: "fill-cat-food",
  power: "fill-cat-power",
  news: "fill-cat-news",
  health: "fill-cat-health",
  money: "fill-cat-money",
};

const CAT_BG: Record<Cat, string> = {
  water: "bg-cat-water",
  food: "bg-cat-food",
  power: "bg-cat-power",
  news: "bg-cat-news",
  health: "bg-cat-health",
  money: "bg-cat-money",
};

/** Label type inside the drawings: heavy, slightly wide, lowercase. */
const LABEL = { fontWeight: 800, fontVariationSettings: '"wdth" 110' } as const;

/** The frame every figure shares: number block, drawing, then key and foot. */
function Figure({
  head,
  sub,
  children,
  keyItems,
  foot,
}: {
  head: string;
  sub: string;
  children: ReactNode;
  keyItems?: { cat: Cat; label: string }[];
  foot?: ReactNode;
}) {
  return (
    <figure className="border-[3px] border-ink bg-paper text-ink">
      <div className="border-b-[10px] border-ink px-4 pb-3 pt-3.5">
        <p
          className="display text-[clamp(2.75rem,13vw,4rem)] leading-none tabular-nums"
          style={{ fontVariationSettings: '"wdth" 115' }}
        >
          {head}
        </p>
        <p className="mt-1.5 text-[1.0625rem] font-extrabold leading-snug">{sub}</p>
      </div>
      <div className="px-4 pb-3 pt-5">{children}</div>
      {keyItems ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 border-t-2 border-ink px-4 py-3 text-[0.9375rem] font-extrabold">
          {keyItems.map((k) => (
            <li key={k.label} className="flex items-center gap-2">
              <span aria-hidden="true" data-cat className={`${CAT_BG[k.cat]} inline-block h-3.5 w-3.5 border-2 border-ink`} />
              {k.label}
            </li>
          ))}
        </ul>
      ) : null}
      {foot ? (
        <figcaption className="border-t-2 border-ink px-4 py-3 text-[0.9375rem] leading-snug text-ink-2">{foot}</figcaption>
      ) : null}
    </figure>
  );
}

/** A 1.5 litre bottle standing with its base on `floor`. */
function Bottle({ cx, floor, h = 112, w = 36 }: { cx: number; floor: number; h?: number; w?: number }) {
  const top = floor - h;
  return (
    <g>
      <rect x={cx - w * 0.2} y={top} width={w * 0.4} height={12} className="fill-ink" />
      <rect x={cx - w * 0.28} y={top + 12} width={w * 0.56} height={10} data-cat className={`${CAT_FILL.water} stroke-ink`} strokeWidth={2} />
      <rect x={cx - w / 2} y={top + 22} width={w} height={h - 22} rx={4} data-cat className={`${CAT_FILL.water} stroke-ink`} strokeWidth={2} />
      {/* the paper label round the middle, as on a real bottle */}
      <rect x={cx - w / 2} y={top + 22 + (h - 22) * 0.34} width={w} height={(h - 22) * 0.28} className="fill-paper stroke-ink" strokeWidth={2} />
    </g>
  );
}

function Water() {
  const FLOOR = 150;
  const cols = [0, 1, 2];
  return (
    <Figure
      head="9 litres"
      sub="of water to drink, per person, for 3 days"
      foot={<>Each bottle is 1.5 litres. 3 litres a day is the top of the WHO&rsquo;s 2.5 to 3 litre minimum, as quoted by gov.uk.</>}
    >
      <svg viewBox="0 0 360 214" role="img" aria-labelledby="dg-water-t dg-water-d" className="block w-full">
        <title id="dg-water-t">Nine litres of water per person for three days</title>
        <desc id="dg-water-d">
          Six 1.5 litre bottles on a shelf, two for each of three days. Each day is 3 litres, so three days is 9
          litres for one person.
        </desc>
        {cols.map((c) => (
          <g key={c}>
            {c > 0 ? <rect x={c * 120 - 0.5} y={4} width={1} height={FLOOR - 4} className="fill-ink" /> : null}
            <Bottle cx={c * 120 + 38} floor={FLOOR} />
            <Bottle cx={c * 120 + 82} floor={FLOOR} />
            <text x={c * 120 + 60} y={FLOOR + 36} textAnchor="middle" fontSize={21} className="fill-ink" style={LABEL}>
              day {c + 1}
            </text>
            <text x={c * 120 + 60} y={FLOOR + 58} textAnchor="middle" fontSize={17} className="fill-ink-2">
              3 litres
            </text>
          </g>
        ))}
        <rect x={0} y={FLOOR} width={360} height={8} className="fill-ink" />
      </svg>
    </Figure>
  );
}

/** A tin seen from the front, standing on `floor`. */
function Tin({ x, floor, w = 30, h = 28 }: { x: number; floor: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={floor - h} width={w} height={h} data-cat className={`${CAT_FILL.food} stroke-ink`} strokeWidth={2} />
      <rect x={x} y={floor - h + 5} width={w} height={2} className="fill-ink" />
      <rect x={x} y={floor - 7} width={w} height={2} className="fill-ink" />
    </g>
  );
}

function Box() {
  const FLOOR = 182;
  const L = 20;
  const inner = (x: number) => L + x;
  return (
    <Figure
      head="1 box"
      sub="what one person needs for 3 days"
      keyItems={[
        { cat: "water", label: "water" },
        { cat: "food", label: "food" },
        { cat: "power", label: "power and light" },
        { cat: "news", label: "radio" },
        { cat: "health", label: "first aid" },
        { cat: "money", label: "cash" },
      ]}
      foot="The first things to get, from the planner, for one person. It fits in a single crate or a large bag."
    >
      <svg viewBox="0 0 360 200" role="img" aria-labelledby="dg-box-t dg-box-d" className="block w-full">
        <title id="dg-box-t">A three day kit for one person, in one box</title>
        <desc id="dg-box-d">
          One open crate holding bottled water, six tins, a torch and batteries, a power bank, a wind-up radio,
          a first aid kit and some cash. Everything one person needs first for three days.
        </desc>

        {/* the crate: a lip, two sides and a floor */}
        <rect x={L - 8} y={34} width={336} height={12} className="fill-ink" />
        <rect x={L} y={46} width={3} height={FLOOR - 46} className="fill-ink" />
        <rect x={340 - 3} y={46} width={3} height={FLOOR - 46} className="fill-ink" />

        {/* water: three bottles of the six-pack */}
        <Bottle cx={inner(18)} floor={FLOOR} h={100} w={24} />
        <Bottle cx={inner(44)} floor={FLOOR} h={100} w={24} />
        <Bottle cx={inner(70)} floor={FLOOR} h={100} w={24} />

        {/* food: six tins in two stacks of three */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Tin x={inner(88)} floor={FLOOR - i * 30} />
            <Tin x={inner(120)} floor={FLOOR - i * 30} />
          </g>
        ))}

        {/* power and light: a torch standing on its lens, and a power bank */}
        <g>
          <rect x={inner(158)} y={FLOOR - 64} width={16} height={46} data-cat className={`${CAT_FILL.power} stroke-ink`} strokeWidth={2} />
          <rect x={inner(154)} y={FLOOR - 18} width={24} height={18} className="fill-ink" />
          <rect x={inner(184)} y={FLOOR - 48} width={22} height={48} rx={3} data-cat className={`${CAT_FILL.power} stroke-ink`} strokeWidth={2} />
          <rect x={inner(190)} y={FLOOR - 42} width={10} height={4} className="fill-ink" />
        </g>

        {/* radio: body, grille and aerial */}
        <g>
          <rect x={inner(242)} y={FLOOR - 76} width={3} height={36} className="fill-ink" />
          <rect x={inner(212)} y={FLOOR - 40} width={46} height={40} rx={3} data-cat className={`${CAT_FILL.news} stroke-ink`} strokeWidth={2} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={inner(218)} y={FLOOR - 32 + i * 8} width={18} height={3} className="fill-ink" />
          ))}
          <rect x={inner(242)} y={FLOOR - 32} width={10} height={10} className="fill-ink" />
        </g>

        {/* first aid kit, with a paper cross */}
        <g>
          <rect x={inner(264)} y={FLOOR - 34} width={40} height={34} rx={3} data-cat className={`${CAT_FILL.health} stroke-ink`} strokeWidth={2} />
          <rect x={inner(280)} y={FLOOR - 28} width={8} height={22} className="fill-paper stroke-ink" strokeWidth={1.5} />
          <rect x={inner(273)} y={FLOOR - 21} width={22} height={8} className="fill-paper stroke-ink" strokeWidth={1.5} />
        </g>

        {/* cash: notes leaning on the first aid kit's side */}
        <rect x={inner(264)} y={FLOOR - 62} width={40} height={22} data-cat className={`${CAT_FILL.money} stroke-ink`} strokeWidth={2} />
        <rect x={inner(278)} y={FLOOR - 55} width={12} height={8} className="fill-paper stroke-ink" strokeWidth={1.5} />

        {/* the crate floor, drawn last so it sits over the item bases */}
        <rect x={L} y={FLOOR} width={320} height={8} className="fill-ink" />
      </svg>
    </Figure>
  );
}

function CheckIn() {
  const STREET = 196;
  return (
    <Figure
      head="1 contact"
      sub="outside your area, that everyone in your street can call"
      foot="Agree who calls whom now, while phones still work. Next door checks on you, and you check on them."
    >
      <svg viewBox="0 0 360 250" role="img" aria-labelledby="dg-checkin-t dg-checkin-d" className="block w-full">
        <title id="dg-checkin-t">A street check-in plan</title>
        <desc id="dg-checkin-d">
          Three homes on one street: yours, next door and over the road. Each has a line up to one contact who
          lives outside the area, and arrows between the homes show neighbours checking on each other.
        </desc>

        {/* the contact outside the area */}
        <rect x={60} y={4} width={240} height={56} className="fill-ink" />
        <text x={180} y={28} textAnchor="middle" fontSize={18} className="fill-paper" style={LABEL}>
          one contact
        </text>
        <text x={180} y={49} textAnchor="middle" fontSize={18} className="fill-paper" style={LABEL}>
          outside the area
        </text>

        {/* lines up from each home to the contact */}
        <path d="M 60 104 L 120 60" className="stroke-ink" strokeWidth={3} fill="none" />
        <path d="M 180 110 L 180 60" className="stroke-ink" strokeWidth={3} fill="none" />
        <path d="M 300 96 L 240 60" className="stroke-ink" strokeWidth={3} fill="none" />

        {/* you: a semi with a pitched roof */}
        <g>
          <path d="M 24 138 L 60 104 L 96 138 Z" className="fill-ink" />
          <rect x={30} y={138} width={60} height={STREET - 138} className="fill-ink" />
          <rect x={40} y={148} width={14} height={14} className="fill-paper" />
          <rect x={66} y={166} width={14} height={STREET - 166} className="fill-paper" />
        </g>
        {/* next door: a terrace pair */}
        <g>
          <path d="M 142 140 L 180 110 L 218 140 Z" className="fill-ink" />
          <rect x={146} y={140} width={68} height={STREET - 140} className="fill-ink" />
          <rect x={179} y={140} width={2} height={STREET - 140} className="fill-paper" />
          <rect x={154} y={150} width={14} height={14} className="fill-paper" />
          <rect x={192} y={150} width={14} height={14} className="fill-paper" />
          <rect x={154} y={170} width={12} height={STREET - 170} className="fill-paper" />
          <rect x={194} y={170} width={12} height={STREET - 170} className="fill-paper" />
        </g>
        {/* over the road: a small block of flats */}
        <g>
          <rect x={272} y={96} width={56} height={STREET - 96} className="fill-ink" />
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => (
              <rect key={`${r}-${c}`} x={281 + c * 24} y={106 + r * 22} width={14} height={12} className="fill-paper" />
            )),
          )}
          <rect x={293} y={174} width={14} height={STREET - 174} className="fill-paper" />
        </g>

        {/* neighbours checking on each other */}
        <path d="M 100 170 L 138 170 M 100 170 l 8 -6 M 100 170 l 8 6 M 138 170 l -8 -6 M 138 170 l -8 6" className="stroke-ink" strokeWidth={3} fill="none" />
        <path d="M 222 170 L 264 170 M 222 170 l 8 -6 M 222 170 l 8 6 M 264 170 l -8 -6 M 264 170 l -8 6" className="stroke-ink" strokeWidth={3} fill="none" />

        <rect x={0} y={STREET} width={360} height={8} className="fill-ink" />
        {[
          { x: 60, label: "you", anchor: "middle" as const },
          { x: 180, label: "next door", anchor: "middle" as const },
          { x: 358, label: "over the road", anchor: "end" as const },
        ].map((h) => (
          <text key={h.label} x={h.x} y={STREET + 34} textAnchor={h.anchor} fontSize={17} className="fill-ink" style={LABEL}>
            {h.label}
          </text>
        ))}
      </svg>
    </Figure>
  );
}

function Duration() {
  const rows = scenarios.flatMap((s) => (s.chart ? [s.chart] : []));

  const X0 = 8;
  const X1 = 352;
  const DAYS = 14;
  const x = (d: number) => X0 + (Math.min(d, DAYS) / DAYS) * (X1 - X0);
  const TOP = 34;
  const ROW = 54;
  const axisY = TOP + rows.length * ROW + 4;
  const height = axisY + 34;

  return (
    <Figure
      head="3 days"
      sub="covers most of what usually stops"
    >
      <svg viewBox={`0 0 360 ${height}`} role="img" aria-labelledby="dg-dur-t dg-dur-d" className="block w-full">
        <title id="dg-dur-t">How long disruption usually lasts</title>
        <desc id="dg-dur-d">
          {`Bars on a scale of 0 to 14 days, with the first 3 days shaded. ${rows
            .map((r) => `${r.label}: ${r.range}`)
            .join(". ")}.`}
        </desc>

        {/* the day 3 marker; the shading and line are drawn per row, behind each bar */}
        <rect x={x(3) - 36} y={0} width={72} height={26} className="fill-ink" />
        <text x={x(3)} y={19} textAnchor="middle" fontSize={16} className="fill-paper" style={LABEL}>
          3 days
        </text>

        {rows.map((r, i) => {
          const y = TOP + i * ROW;
          const end = x(r.to);
          return (
            <g key={r.label}>
              <rect x={X0} y={y + 22} width={x(3) - X0} height={22} className="fill-hush" />
              <rect x={x(3) - 1.5} y={y + 20} width={3} height={26} className="fill-ink" />
              {r.cat ? (
                <rect x={X0} y={y + 5} width={13} height={13} data-cat className={`${CAT_FILL[r.cat]} stroke-ink`} strokeWidth={2} />
              ) : null}
              <text x={r.cat ? X0 + 20 : X0} y={y + 17} fontSize={18} className="fill-ink" style={LABEL}>
                {r.label}
              </text>
              <text x={X1} y={y + 17} textAnchor="end" fontSize={14} className="fill-ink-2">
                {r.range}
              </text>
              <rect x={x(r.from)} y={y + 25} width={Math.max(4, end - x(r.from))} height={16} className="fill-ink" />
              {r.openEnded
                ? [0, 1, 2].map((d) => <rect key={d} x={end + 5 + d * 11} y={y + 30} width={6} height={6} className="fill-ink" />)
                : null}
            </g>
          );
        })}

        {/* the day axis */}
        <rect x={X0} y={axisY} width={X1 - X0} height={2} className="fill-ink" />
        {[
          { d: 0, label: "0", anchor: "start" as const },
          { d: 7, label: "1 week", anchor: "middle" as const },
          { d: 14, label: "2 weeks", anchor: "end" as const },
        ].map((t) => (
          <g key={t.d}>
            <rect x={x(t.d) - 1} y={axisY} width={2} height={8} className="fill-ink" />
            <text x={x(t.d)} y={axisY + 26} textAnchor={t.anchor} fontSize={15} className="fill-ink-2">
              {t.label}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

const DIAGRAMS: Record<DiagramName, () => React.ReactElement> = {
  water: Water,
  box: Box,
  checkin: CheckIn,
  duration: Duration,
};

export default function Diagram({ name, className = "" }: Props) {
  const Drawing = DIAGRAMS[name];
  return (
    <div className={className}>
      <Drawing />
    </div>
  );
}
