import type { ReactNode } from "react";
import { BRANDS, type BrandKey } from "./Brands";

/*
 * Blueprint-style service diagrams: thin technical line drawings on a navy grid,
 * with mono callouts and real platform logos. One per service.
 */

const LINE = "rgba(143,168,216,0.5)";
const FAINT = "rgba(143,168,216,0.22)";
const LIGHT = "#8FA8D8";

const up = (s: string) => s.toLocaleUpperCase();

function Label({
  x,
  y,
  children,
  anchor = "start",
  bright = false,
  size = 10,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  bright?: boolean;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="bp-label"
      fontSize={size}
      fill={bright ? "#FFFFFF" : LIGHT}
    >
      {up(children)}
    </text>
  );
}

/** Dot on the drawing, leader line, and a label. */
function Callout({
  px,
  py,
  lx,
  ly,
  text,
  anchor = "start",
}: {
  px: number;
  py: number;
  lx: number;
  ly: number;
  text: string;
  anchor?: "start" | "end";
}) {
  const tx = anchor === "start" ? lx + 6 : lx - 6;
  return (
    <g>
      <circle cx={px} cy={py} r={6} fill="none" stroke={LINE} />
      <circle cx={px} cy={py} r={2.2} fill="#FFFFFF" />
      <polyline points={`${px},${py} ${lx},${ly}`} fill="none" stroke={LINE} strokeWidth={1} />
      <Label x={tx} y={ly + 3.5} anchor={anchor} bright>
        {text}
      </Label>
    </g>
  );
}

/** A platform logo placed inside the SVG. */
function Logo({
  brand,
  x,
  y,
  s,
  color,
}: {
  brand: BrandKey;
  x: number;
  y: number;
  s: number;
  color?: string;
}) {
  const b = BRANDS[brand];
  return (
    <svg x={x} y={y} width={s} height={s} viewBox="0 0 24 24" aria-label={b.name}>
      <path d={b.path} fill={color ?? b.color} />
    </svg>
  );
}

/** Horizontal dimension line with end ticks and a centred label. */
function DimH({ x1, x2, y, text }: { x1: number; x2: number; y: number; text: string }) {
  return (
    <g stroke={LINE} strokeWidth={1}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} />
      <g stroke="none">
        <rect
          x={(x1 + x2) / 2 - text.length * 3.6 - 6}
          y={y - 7}
          width={text.length * 7.2 + 12}
          height={14}
          fill="#0A1A3A"
        />
        <Label x={(x1 + x2) / 2} y={y + 3.5} anchor="middle">
          {text}
        </Label>
      </g>
    </g>
  );
}

/** The navy grid panel with corner marks, figure number and title. */
export function Blueprint({
  children,
  fig,
  title,
  className = "",
}: {
  children: ReactNode;
  fig: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`bp-grid relative overflow-hidden text-[#8FA8D8] ${className}`}>
      <svg
        viewBox="0 0 480 360"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {children}
      </svg>
      {(
        [
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ] as const
      ).map((c) => (
        <span key={c} className={`absolute size-3 border-[#8FA8D8]/60 ${c}`} aria-hidden />
      ))}
      <span className="absolute left-6 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FA8D8]">
        {fig}
      </span>
      <span className="hidden sm:block absolute right-6 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
        {title}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ 01 Meta Ads */

export function MetaAdsDiagram({ labels }: { labels: [string, string, string] }) {
  const cx = 240;
  const cy = 182;
  const sats: { b: BrandKey; x: number; y: number }[] = [
    { b: "facebook", x: cx, y: cy - 96 },
    { b: "instagram", x: cx + 83, y: cy + 48 },
    { b: "messenger", x: cx - 83, y: cy + 48 },
  ];
  return (
    <>
      <line x1={40} y1={cy} x2={440} y2={cy} stroke={FAINT} />
      <line x1={cx} y1={40} x2={cx} y2={330} stroke={FAINT} />
      <circle cx={cx} cy={cy} r={138} fill="none" stroke={FAINT} strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r={96} fill="none" stroke={LINE} strokeDasharray="3 5" />
      {sats.map((s) => (
        <line
          key={s.b}
          x1={cx}
          y1={cy}
          x2={s.x}
          y2={s.y}
          stroke={LIGHT}
          strokeWidth={1.2}
          className="bp-flow"
        />
      ))}
      <circle r={3.5} fill="#FFFFFF">
        <animateMotion
          dur="9s"
          repeatCount="indefinite"
          path={`M${cx},${cy - 96} a96,96 0 1,1 -0.1,0`}
        />
      </circle>
      <circle cx={cx} cy={cy} r={46} fill="#FFFFFF" />
      <circle cx={cx} cy={cy} r={54} fill="none" stroke={LINE} />
      <Logo brand="meta" x={cx - 26} y={cy - 26} s={52} />
      {sats.map((s) => (
        <g key={s.b}>
          <circle cx={s.x} cy={s.y} r={23} fill="#0A1A3A" stroke={LINE} />
          <Logo brand={s.b} x={s.x - 12} y={s.y - 12} s={24} />
        </g>
      ))}
      <Callout px={cx} py={cy - 120} lx={96} ly={70} text={labels[0]} anchor="end" />
      <Callout px={cx + 104} py={cy + 60} lx={400} ly={300} text={labels[1]} anchor="end" />
      <Callout px={cx - 104} py={cy + 60} lx={80} ly={310} text={labels[2]} />
    </>
  );
}

/* ------------------------------------------------------------------ 02 Ad design */

export function AdDesignDiagram({ labels }: { labels: [string, string, string] }) {
  const feed = { x: 56, y: 76, w: 168, h: 210 };
  const story = { x: 284, y: 64, w: 130, h: 231 };
  const frame = (f: typeof feed, tag: string, cta: number) => (
    <g>
      <rect
        x={f.x}
        y={f.y}
        width={f.w}
        height={f.h}
        rx={6}
        fill="rgba(21,86,168,0.22)"
        stroke="#FFFFFF"
        strokeOpacity={0.85}
        strokeWidth={1.2}
      />
      {[1, 2].map((i) => (
        <g key={i} stroke={FAINT} strokeDasharray="2 4">
          <line x1={f.x + (f.w / 3) * i} y1={f.y} x2={f.x + (f.w / 3) * i} y2={f.y + f.h} />
          <line x1={f.x} y1={f.y + (f.h / 3) * i} x2={f.x + f.w} y2={f.y + (f.h / 3) * i} />
        </g>
      ))}
      <rect
        x={f.x + 10}
        y={f.y + 10}
        width={f.w - 20}
        height={f.h - 20}
        rx={3}
        fill="none"
        stroke={LINE}
        strokeDasharray="4 3"
      />
      <circle cx={f.x + 24} cy={f.y + 26} r={8} fill="#FFFFFF" />
      <Logo brand="instagram" x={f.x + 18} y={f.y + 20} s={12} />
      <Label x={f.x + 38} y={f.y + 30} bright size={9}>
        {tag}
      </Label>
      <rect
        x={f.x + 18}
        y={f.y + f.h - 86}
        width={f.w - 36}
        height={30}
        rx={3}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity={0.6}
        strokeDasharray="3 3"
      />
      <Label x={f.x + f.w / 2} y={f.y + f.h - 67} anchor="middle" size={9}>
        {labels[0]}
      </Label>
      <rect x={f.x + 18} y={f.y + f.h - 46} width={cta} height={24} rx={12} fill="#1556A8" />
      <Label x={f.x + 18 + cta / 2} y={f.y + f.h - 30.5} anchor="middle" bright size={9}>
        CTA
      </Label>
    </g>
  );
  return (
    <>
      <Label x={feed.x} y={feed.y - 12}>
        4:5 · Feed
      </Label>
      <Label x={story.x} y={story.y - 12}>
        {`9:16 · ${labels[1]}`}
      </Label>
      {frame(feed, "your.brand", 74)}
      {frame(story, "your.brand", 80)}
      <DimH x1={feed.x} x2={feed.x + feed.w} y={feed.y + feed.h + 22} text="1080 × 1350" />
      <g stroke={LINE}>
        <line x1={428} y1={story.y} x2={428} y2={story.y + story.h} />
        <line x1={423} y1={story.y} x2={433} y2={story.y} />
        <line x1={423} y1={story.y + story.h} x2={433} y2={story.y + story.h} />
      </g>
      <text
        x={0}
        y={0}
        className="bp-label"
        fontSize={10}
        fill={LIGHT}
        transform={`translate(444 ${story.y + story.h / 2}) rotate(90)`}
        textAnchor="middle"
      >
        1080 × 1920
      </text>
      <Callout
        px={story.x + story.w / 2}
        py={story.y + story.h}
        lx={story.x + story.w / 2 + 20}
        ly={326}
        text={labels[2]}
        anchor="end"
      />
    </>
  );
}

/* ------------------------------------------------------------------ 03 Websites */

export function WebsiteDiagram({ labels }: { labels: [string, string, string] }) {
  const box = (x: number, y: number, w: number, h: number, t?: string) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="none"
        stroke={LINE}
        strokeDasharray="4 3"
      />
      {t && (
        <Label x={x + 8} y={y + 14} size={9}>
          {t}
        </Label>
      )}
    </g>
  );
  return (
    <>
      <rect
        x={36}
        y={54}
        width={300}
        height={208}
        rx={8}
        fill="rgba(21,86,168,0.18)"
        stroke="#FFFFFF"
        strokeOpacity={0.85}
        strokeWidth={1.2}
      />
      <line x1={36} y1={74} x2={336} y2={74} stroke="#FFFFFF" strokeOpacity={0.5} />
      {[48, 58, 68].map((x) => (
        <circle key={x} cx={x} cy={64} r={2.6} fill={LIGHT} />
      ))}
      <rect x={86} y={59} width={170} height={10} rx={5} fill="rgba(255,255,255,0.08)" />
      <text x={96} y={67} fontSize={7.5} className="bp-label" fill={LIGHT}>
        yourbusiness.com
      </text>
      {box(50, 86, 272, 68, "Hero")}
      {box(50, 162, 84, 44)}
      {box(144, 162, 84, 44)}
      {box(238, 162, 84, 44)}
      {box(50, 214, 272, 36, labels[0])}

      <rect
        x={318}
        y={96}
        width={124}
        height={230}
        rx={18}
        fill="#0A1A3A"
        stroke="#FFFFFF"
        strokeOpacity={0.85}
        strokeWidth={1.2}
      />
      <rect x={358} y={104} width={44} height={6} rx={3} fill="rgba(255,255,255,0.25)" />
      {box(328, 120, 104, 66, "Hero")}
      {box(328, 194, 104, 34)}
      {box(328, 236, 104, 28)}
      <rect x={328} y={284} width={104} height={28} rx={14} fill="#25D366" />
      <Logo brand="whatsapp" x={340} y={291} s={14} color="#FFFFFF" />
      <text x={360} y={302} fontSize={10} fontWeight={600} fill="#FFFFFF">
        WhatsApp
      </text>

      <DimH x1={36} x2={336} y={286} text="1440 px" />
      <DimH x1={318} x2={442} y={342} text="375 px" />
      <Label x={380} y={86} anchor="middle">
        {labels[1]}
      </Label>
      <Callout px={328} py={298} lx={200} ly={326} text={labels[2]} anchor="end" />
    </>
  );
}

/* ------------------------------------------------------------------ 04 Branding */

export function BrandingDiagram({ labels }: { labels: [string, string, string] }) {
  const c = [
    { x: 168, y: 150, f: "#7186B4" },
    { x: 121, y: 228, f: "#3E6AB2" },
    { x: 215, y: 228, f: "#1556A8" },
  ];
  const r = 70;
  const swatches = [
    { hex: "#0A1A3A", n: "Navy" },
    { hex: "#1556A8", n: "Blue" },
    { hex: "#8FA8D8", n: "Light" },
  ];
  return (
    <>
      <rect
        x={51}
        y={80}
        width={234}
        height={218}
        fill="none"
        stroke={FAINT}
        strokeDasharray="3 5"
      />
      {c.map((p) => (
        <circle key={p.f} cx={p.x} cy={p.y} r={r} fill={p.f} fillOpacity={0.78} />
      ))}
      {c.map((p) => (
        <circle
          key={`o${p.f}`}
          cx={p.x}
          cy={p.y}
          r={r}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.55}
        />
      ))}
      <polygon
        points={c.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity={0.7}
        strokeDasharray="3 3"
      />
      {c.map((p) => (
        <g key={`x${p.f}`} stroke="#FFFFFF">
          <line x1={p.x - 5} y1={p.y} x2={p.x + 5} y2={p.y} />
          <line x1={p.x} y1={p.y - 5} x2={p.x} y2={p.y + 5} />
        </g>
      ))}
      <line x1={215} y1={228} x2={285} y2={228} stroke="#FFFFFF" />
      <Label x={250} y={222} anchor="middle" bright>
        R
      </Label>
      <Callout px={168} py={80} lx={60} ly={52} text={labels[0]} />

      <Label x={318} y={70}>
        {labels[1]}
      </Label>
      {swatches.map((s, i) => (
        <g key={s.hex}>
          <rect
            x={318}
            y={82 + i * 46}
            width={36}
            height={36}
            rx={6}
            fill={s.hex}
            stroke="#FFFFFF"
            strokeOpacity={0.35}
          />
          <Label x={364} y={97 + i * 46} bright>
            {s.hex}
          </Label>
          <Label x={364} y={111 + i * 46} size={9}>
            {s.n}
          </Label>
        </g>
      ))}
      <text
        x={318}
        y={276}
        fontSize={46}
        fontWeight={600}
        fill="#FFFFFF"
        letterSpacing={-1.5}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Aa
      </text>
      <Label x={318} y={298}>
        {`Bricolage Grotesque · ${labels[2]}`}
      </Label>
    </>
  );
}

/* ------------------------------------------------------------------ 05 AI receptionist */

export function ReceptionistDiagram({ labels }: { labels: [string, string, string, string] }) {
  const ins: { b: BrandKey; y: number }[] = [
    { b: "whatsapp", y: 100 },
    { b: "instagram", y: 182 },
    { b: "messenger", y: 264 },
  ];
  const outs = [labels[0], labels[1], labels[2]];
  return (
    <>
      {ins.map((n) => (
        <path
          key={n.b}
          d={`M94,${n.y} C160,${n.y} 160,182 196,182`}
          fill="none"
          stroke={LIGHT}
          strokeWidth={1.2}
          className="bp-flow"
        />
      ))}
      {outs.map((_, i) => (
        <path
          key={i}
          d={`M284,182 C310,182 300,${102 + i * 80} 330,${102 + i * 80}`}
          fill="none"
          stroke={LIGHT}
          strokeWidth={1.2}
          className="bp-flow"
        />
      ))}
      {ins.map((n) => (
        <g key={`n${n.b}`}>
          <circle cx={70} cy={n.y} r={24} fill="#0A1A3A" stroke={LINE} />
          <Logo brand={n.b} x={57} y={n.y - 13} s={26} />
        </g>
      ))}
      <circle cx={240} cy={182} r={56} fill="none" stroke={LINE} strokeDasharray="3 5" />
      <circle cx={240} cy={182} r={44} fill="#1556A8" />
      <text
        x={240}
        y={190}
        textAnchor="middle"
        fontSize={24}
        fontWeight={600}
        fill="#FFFFFF"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        AI
      </text>
      <Label x={240} y={258} anchor="middle" bright>
        24/7
      </Label>
      <Label x={240} y={110} anchor="middle">
        {labels[3]}
      </Label>
      {outs.map((o, i) => (
        <g key={o}>
          <rect
            x={330}
            y={86 + i * 80}
            width={120}
            height={32}
            rx={16}
            fill="rgba(255,255,255,0.06)"
            stroke={LINE}
          />
          <circle cx={346} cy={102 + i * 80} r={3} fill={i === 2 ? "#FFFFFF" : "#25D366"} />
          <Label x={356} y={105.5 + i * 80} bright size={9}>
            {o}
          </Label>
        </g>
      ))}
    </>
  );
}
