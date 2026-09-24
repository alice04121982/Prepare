/**
 * Explanatory diagrams for the page intro panels.
 *
 * These replace the Textile 3D Shapes pack, which was decoration left over
 * from the mint palette. Each drawing here has one job: to show a quantity,
 * a scale or a plan that the page is asking the reader to picture. Nothing
 * is drawn that does not carry information.
 *
 * All four sit on the page intro, drawn monochrome in currentColor (ink on
 * paper) with opacity for depth on shapes only; labels stay solid for
 * contrast. Labels live inside the SVG so they scale with it; the title and desc carry the same content for anyone
 * using a screen reader.
 */

type Props = { name: DiagramName; className?: string };

export type DiagramName = "water" | "box" | "checkin" | "duration";

const FRAME = "0 0 400 340";

/** One 1.5 litre bottle, drawn from its centre line. */
function Bottle({ cx, top = 92 }: { cx: number; top?: number }) {
  return (
    <g>
      <rect x={cx - 7} y={top} width={14} height={9} rx={2} fill="currentColor" opacity={0.85} />
      <rect x={cx - 5} y={top + 9} width={10} height={11} fill="currentColor" opacity={0.5} />
      <rect
        x={cx - 17}
        y={top + 20}
        width={34}
        height={86}
        rx={7}
        fill="currentColor"
        opacity={0.12}
        stroke="currentColor"
        strokeOpacity={0.75}
        strokeWidth={2}
      />
      {/* the fill line, so the bottle reads as full rather than empty */}
      <rect x={cx - 13} y={top + 38} width={26} height={64} rx={5} fill="currentColor" opacity={0.3} />
    </g>
  );
}

function Water() {
  const groups = [
    { cx: 78, label: "Day 1" },
    { cx: 200, label: "Day 2" },
    { cx: 322, label: "Day 3" },
  ];
  return (
    <svg viewBox={FRAME} role="img" aria-labelledby="dg-water-t dg-water-d" className="w-full">
      <title id="dg-water-t">Nine litres of water per person for three days</title>
      <desc id="dg-water-d">
        Six one and a half litre bottles in three pairs, one pair for each day. Three litres a day to
        drink, nine litres over three days, which is about one six-pack.
      </desc>
      <text x={200} y={26} textAnchor="middle" fontSize={19} fill="currentColor">
        3 litres a day, to drink
      </text>
      {groups.map((g) => (
        <g key={g.label}>
          <Bottle cx={g.cx - 21} />
          <Bottle cx={g.cx + 21} />
          <text x={g.cx} y={230} textAnchor="middle" fontSize={18} fill="currentColor">
            {g.label}
          </text>
        </g>
      ))}
      {/* bracket across all three days */}
      <path
        d="M 40 252 L 40 260 L 360 260 L 360 252"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
      <text x={200} y={294} textAnchor="middle" fontSize={30} fill="currentColor">
        9 litres
      </text>
      <text x={200} y={320} textAnchor="middle" fontSize={17} fill="currentColor">
        one person, one six-pack
      </text>
    </svg>
  );
}

function Box() {
  return (
    <svg viewBox={FRAME} role="img" aria-labelledby="dg-box-t dg-box-d" className="w-full">
      <title id="dg-box-t">A three day kit for one person, in one box</title>
      <desc id="dg-box-d">
        An open box holding two water bottles, a stack of tins, a torch, a power bank and a folder of
        documents. Everything a person needs for three days fits inside it.
      </desc>
      <text x={200} y={28} textAnchor="middle" fontSize={19} fill="currentColor">
        One person, three days
      </text>

      {/* box */}
      <path
        d="M 62 108 L 338 108 L 320 268 L 80 268 Z"
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        strokeOpacity={0.7}
        strokeWidth={2.5}
      />
      <path d="M 62 108 L 338 108" stroke="currentColor" strokeOpacity={0.45} strokeWidth={6} />

      {/* two bottles */}
      <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={2} fill="currentColor" fillOpacity={0.18}>
        <rect x={94} y={156} width={30} height={96} rx={6} />
        <rect x={130} y={156} width={30} height={96} rx={6} />
      </g>
      <g fill="currentColor" opacity={0.75}>
        <rect x={104} y={148} width={10} height={9} rx={2} />
        <rect x={140} y={148} width={10} height={9} rx={2} />
      </g>

      {/* stack of three tins */}
      <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={2} fill="currentColor" fillOpacity={0.18}>
        <rect x={172} y={184} width={54} height={20} rx={4} />
        <rect x={172} y={208} width={54} height={20} rx={4} />
        <rect x={172} y={232} width={54} height={20} rx={4} />
      </g>

      {/* torch */}
      <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={2} fill="currentColor" fillOpacity={0.18}>
        <rect x={238} y={196} width={20} height={56} rx={4} />
        <path d="M 236 196 L 260 196 L 266 182 L 230 182 Z" />
      </g>

      {/* folder of documents, with the power bank below it */}
      <g stroke="currentColor" strokeOpacity={0.75} strokeWidth={2} fill="currentColor" fillOpacity={0.18}>
        <rect x={272} y={176} width={34} height={46} rx={3} />
        <rect x={270} y={228} width={44} height={24} rx={5} />
      </g>
      <path d="M 272 188 L 306 188" stroke="currentColor" strokeOpacity={0.6} strokeWidth={2} />

      <text x={200} y={300} textAnchor="middle" fontSize={26} fill="currentColor">
        It fits in one box
      </text>
      <text x={200} y={324} textAnchor="middle" fontSize={17} fill="currentColor">
        water, tins, torch, power bank, papers
      </text>
    </svg>
  );
}

/** A house glyph, drawn from the centre of its base. */
function House({ cx, y }: { cx: number; y: number }) {
  return (
    <g stroke="currentColor" strokeOpacity={0.8} strokeWidth={2.5} fill="currentColor" fillOpacity={0.12}>
      <rect x={cx - 26} y={y - 40} width={52} height={40} rx={3} />
      <path d={`M ${cx - 34} ${y - 40} L ${cx} ${y - 68} L ${cx + 34} ${y - 40} Z`} />
    </g>
  );
}

function CheckIn() {
  const houses = [
    { cx: 70, label: "You" },
    { cx: 200, label: "Next door" },
    { cx: 330, label: "Over the road" },
  ];
  return (
    <svg viewBox={FRAME} role="img" aria-labelledby="dg-checkin-t dg-checkin-d" className="w-full">
      <title id="dg-checkin-t">A household check-in plan</title>
      <desc id="dg-checkin-d">
        Three houses joined to each other, and all three joined by dotted lines to one contact outside
        the area. Who calls whom, plus one person everyone can reach.
      </desc>

      <text x={200} y={24} textAnchor="middle" fontSize={17} fill="currentColor">
        one contact outside the area
      </text>

      {/* the out of area contact, drawn as a phone */}
      <circle
        cx={200}
        cy={64}
        r={25}
        stroke="currentColor"
        strokeOpacity={0.8}
        strokeWidth={2.5}
        fill="currentColor"
        fillOpacity={0.12}
      />
      <rect
        x={193}
        y={52}
        width={14}
        height={24}
        rx={3}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.9}
        strokeWidth={2}
      />
      <path d="M 193 58 L 207 58" stroke="currentColor" strokeOpacity={0.9} strokeWidth={2} />

      {/* dotted lines from each house up to that one contact */}
      <g fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 6">
        <path d="M 70 136 L 184 80" />
        <path d="M 200 136 L 200 90" />
        <path d="M 330 136 L 216 80" />
      </g>

      {/* the road they are on */}
      <path d="M 26 200 L 374 200" stroke="currentColor" strokeOpacity={0.25} strokeWidth={2.5} />
      {houses.map((h) => (
        <g key={h.label}>
          <House cx={h.cx} y={200} />
          <text x={h.cx} y={230} textAnchor="middle" fontSize={17} fill="currentColor">
            {h.label}
          </text>
        </g>
      ))}

      <text x={200} y={288} textAnchor="middle" fontSize={26} fill="currentColor">
        Who calls whom
      </text>
      <text x={200} y={314} textAnchor="middle" fontSize={17} fill="currentColor">
        agreed while everything still works
      </text>
    </svg>
  );
}

/**
 * Typical durations against the three day line. The scale is linear in days,
 * 0 to 14, so the bars are honestly proportioned: the point of the drawing is
 * that most disruption ends well before the fortnight mark.
 */
function Duration() {
  // A label gutter on the left, then a scale that is linear in days, so the
  // bars are honestly proportioned against the three day line.
  const X0 = 118;
  const X1 = 372;
  const DAYS = 14;
  const x = (d: number) => X0 + (d / DAYS) * (X1 - X0);

  const rows = [
    { label: "Water supply", from: 0, to: 2, open: false },
    { label: "Power cut", from: 0, to: 3, open: false },
    { label: "Storm or flood", from: 0, to: 5, open: true },
    { label: "Thin shelves", from: 2, to: 14, open: false },
  ];

  return (
    <svg viewBox={FRAME} role="img" aria-labelledby="dg-dur-t dg-dur-d" className="w-full">
      <title id="dg-dur-t">How long disruption usually lasts</title>
      <desc id="dg-dur-d">
        Bars on a scale of nought to fourteen days. Water supply usually under two days, power cuts up
        to three, storms and floods up to about five and sometimes longer, thin shelves from two days
        to a fortnight. A marked line at three days sits past the end of most of them.
      </desc>

      <text x={200} y={24} textAnchor="middle" fontSize={19} fill="currentColor">
        How long it usually lasts
      </text>

      {/* the three day line */}
      <text x={x(3)} y={54} textAnchor="middle" fontSize={17} fill="currentColor">
        3 days
      </text>
      <path
        d={`M ${x(3)} 62 L ${x(3)} 230`}
        stroke="currentColor"
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeDasharray="5 5"
      />

      {rows.map((r, i) => {
        const barY = 74 + i * 42;
        return (
          <g key={r.label}>
            <text x={108} y={barY + 13} textAnchor="end" fontSize={15} fill="currentColor">
              {r.label}
            </text>
            <rect
              x={x(r.from)}
              y={barY}
              width={Math.max(4, x(r.to) - x(r.from))}
              height={16}
              rx={3}
              fill="currentColor"
              opacity={0.45}
            />
            {r.open ? (
              <path
                d={`M ${x(r.to) + 4} ${barY + 8} L ${x(r.to) + 26} ${barY + 8}`}
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeWidth={3}
                strokeDasharray="3 5"
              />
            ) : null}
          </g>
        );
      })}

      {/* scale */}
      <path d={`M ${X0} 246 L ${X1} 246`} stroke="currentColor" strokeOpacity={0.4} strokeWidth={2} />
      {[
        { d: 0, label: "0", anchor: "start" as const },
        { d: 7, label: "1 week", anchor: "middle" as const },
        { d: 14, label: "2 weeks", anchor: "end" as const },
      ].map((t) => (
        <g key={t.d}>
          <path
            d={`M ${x(t.d)} 246 L ${x(t.d)} 253`}
            stroke="currentColor"
            strokeOpacity={0.4}
            strokeWidth={2}
          />
          <text
            x={x(t.d)}
            y={272}
            textAnchor={t.anchor}
            fontSize={16}
            fill="currentColor"
           
          >
            {t.label}
          </text>
        </g>
      ))}

      <text x={200} y={312} textAnchor="middle" fontSize={22} fill="currentColor">
        Three days covers most of it
      </text>
    </svg>
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
