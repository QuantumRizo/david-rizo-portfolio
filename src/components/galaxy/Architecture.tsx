import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { architecture, stats, type Stage } from "./data";

const VW = 1040;
const VH = 330;
const MID = 150;
const ISO = { x: 10, y: -7 };

const tensorHeight = (len: number) => 44 + 176 * Math.pow(len / 2000, 0.6);
const tensorWidth = (ch: number) => 6 + 40 * Math.sqrt(ch / 512);
const dotCount = (n: number) => Math.round(4 + Math.log2(n) * 0.9);

type Placed = Stage & { x: number; w: number; h: number };

const place = (): Placed[] => {
  const baseGaps: Record<Stage["kind"], number> = { input: 0, conv: 54, flatten: 60, dense: 52, output: 66 };
  const left = 30;
  const right = VW - 40;
  const sizes = architecture.map((s) =>
    s.kind === "input" || s.kind === "conv" ? tensorWidth(s.channels) + ISO.x : s.kind === "flatten" ? 5 : s.kind === "dense" ? 12 : 22,
  );
  const gapTotal = architecture.reduce((sum, s) => sum + baseGaps[s.kind], 0);
  const stretch = (right - left - sizes.reduce((a, b) => a + b, 0)) / gapTotal;
  const gaps = Object.fromEntries(Object.entries(baseGaps).map(([k, v]) => [k, v * stretch])) as Record<Stage["kind"], number>;
  let x = left;
  return architecture.map((s, i) => {
    let w: number;
    let h: number;
    if (s.kind === "input" || s.kind === "conv") {
      w = tensorWidth(s.channels);
      h = tensorHeight(s.length);
    } else if (s.kind === "flatten") {
      w = 5;
      h = 230;
    } else if (s.kind === "dense") {
      w = 12;
      h = dotCount(s.length) * 15;
    } else {
      w = 22;
      h = 22;
    }
    if (i > 0) x += gaps[s.kind];
    const placed = { ...s, x, w, h };
    x += sizes[i];
    return placed;
  });
};

const placed = place();

const Tensor = ({ s, active }: { s: Placed; active: boolean }) => {
  const y = MID - s.h / 2;
  const stroke = active ? "hsl(var(--primary))" : "rgba(255,255,255,0.28)";
  const face = active ? "hsl(var(--primary) / 0.22)" : "rgba(255,255,255,0.06)";
  const top = active ? "hsl(var(--primary) / 0.35)" : "rgba(255,255,255,0.1)";

  if (s.kind === "dense") {
    const n = dotCount(s.length);
    return (
      <g>
        {Array.from({ length: n }).map((_, i) => (
          <circle
            key={i}
            cx={s.x + s.w / 2}
            cy={y + 7.5 + i * 15}
            r={4.5}
            fill={active ? "hsl(var(--primary))" : "rgba(255,255,255,0.12)"}
            stroke={stroke}
            strokeWidth={1}
          />
        ))}
      </g>
    );
  }
  if (s.kind === "output") {
    return (
      <g>
        <circle cx={s.x + 11} cy={MID} r={14} fill={active ? "hsl(var(--primary) / 0.25)" : "rgba(255,255,255,0.06)"}
          stroke={stroke} strokeWidth={1.25} />
        <text x={s.x + 11} y={MID + 4.5} textAnchor="middle" className="fill-foreground font-mono text-[12px]">σ</text>
      </g>
    );
  }
  if (s.kind === "flatten") {
    return <rect x={s.x} y={y} width={s.w} height={s.h} rx={2.5} fill={face} stroke={stroke} strokeWidth={1} />;
  }
  return (
    <g>
      {/* side and top faces give each feature map a little depth */}
      <path
        d={`M${s.x + s.w} ${y} l${ISO.x} ${ISO.y} v${s.h} l${-ISO.x} ${-ISO.y} Z`}
        fill={top}
        stroke={stroke}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <path
        d={`M${s.x} ${y} l${ISO.x} ${ISO.y} h${s.w} l${-ISO.x} ${-ISO.y} Z`}
        fill={top}
        stroke={stroke}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <rect x={s.x} y={y} width={s.w} height={s.h} fill={face} stroke={stroke} strokeWidth={1} />
    </g>
  );
};

const Architecture = () => {
  const [activeId, setActiveId] = useState("conv1");
  const active = placed.find((s) => s.id === activeId)!;
  const activeIndex = placed.indexOf(active);

  return (
    <div>
      <div className="panel relative overflow-hidden">
        <div className="overflow-x-auto [scrollbar-width:none]">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="h-auto w-full min-w-[760px]" role="group"
            aria-label="Network architecture. Select a layer to learn what it does.">
            {/* flow */}
            {placed.slice(1).map((s, i) => {
              const prev = placed[i];
              const x1 = prev.x + prev.w + (prev.kind === "conv" || prev.kind === "input" ? ISO.x : 0) + 8;
              const x2 = s.x - 8;
              const lit = i < activeIndex;
              return (
                <g key={s.id}>
                  <line x1={x1} x2={x2} y1={MID} y2={MID} stroke={lit ? "hsl(var(--primary) / 0.6)" : "rgba(255,255,255,0.14)"} strokeWidth={1} />
                  <path d={`M${x2 - 5} ${MID - 3.5} L${x2} ${MID} L${x2 - 5} ${MID + 3.5}`} fill="none"
                    stroke={lit ? "hsl(var(--primary) / 0.6)" : "rgba(255,255,255,0.2)"} strokeWidth={1} />
                </g>
              );
            })}

            {/* group brackets */}
            {[
              { from: "conv1", to: "conv4", label: "Feature detectors" },
              { from: "dense512", to: "output", label: "Decision" },
            ].map((g) => {
              const a = placed.find((s) => s.id === g.from)!;
              const b = placed.find((s) => s.id === g.to)!;
              const x1 = a.x;
              const x2 = b.x + b.w + (b.kind === "conv" ? ISO.x : 0);
              return (
                <g key={g.label}>
                  <path d={`M${x1} 34 v-6 H${x2} v6`} fill="none" stroke="rgba(255,255,255,0.18)" />
                  <text x={(x1 + x2) / 2} y={18} textAnchor="middle" className="fill-muted-foreground font-mono text-[11px] uppercase tracking-[0.18em]">
                    {g.label}
                  </text>
                </g>
              );
            })}

            {placed.map((s) => {
              const isActive = s.id === activeId;
              const hitW = Math.max(s.w + 24, 44);
              return (
                <g
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${s.name}, output ${s.shape}`}
                  onClick={() => setActiveId(s.id)}
                  onMouseEnter={() => setActiveId(s.id)}
                  onFocus={() => setActiveId(s.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(s.id)}
                  className="cursor-pointer outline-none"
                >
                  <rect x={s.x + s.w / 2 - hitW / 2} y={30} width={hitW} height={VH - 40} fill="transparent" />
                  <Tensor s={s} active={isActive} />
                  <text x={s.x + s.w / 2} y={286} textAnchor="middle"
                    className={`text-[12px] font-medium ${isActive ? "fill-foreground" : "fill-foreground/55"}`}>
                    {s.name.split(" → ")[0]}
                  </text>
                  <text x={s.x + s.w / 2} y={304} textAnchor="middle" className="fill-muted-foreground font-mono text-[10.5px]">
                    {s.shape.split(" → ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-card to-transparent md:hidden" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="panel min-h-[168px] p-6 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-xl font-semibold tracking-tight">{active.name}</h4>
                <span className="font-mono text-xs text-muted-foreground">
                  {active.params > 0 ? `${active.params.toLocaleString()} parameters` : "no parameters"}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{active.plain}</p>
              <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">{active.technical}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="panel flex flex-col justify-center p-6 md:p-7">
          <p className="text-sm text-muted-foreground">Total trainable parameters</p>
          <p className="headline mt-1 text-4xl tabular-nums">{stats.parameters.toLocaleString()}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
            Every one started as a random number and was learned from the data. Trained on a single RTX 3070.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
