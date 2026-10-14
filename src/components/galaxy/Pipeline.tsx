import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { stats, trainingHistory } from "./data";
import { flux, lambdaToX, LAMBDA_MAX, LAMBDA_MIN } from "./spectra";

const W = 560;
const H = 300;
const ease = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 7000;

const steps = [
  {
    title: "Query the sky",
    body: "SQL queries against the Sloan Digital Sky Survey pull 5,000 spectra of each class, keeping only those with a clean redshift measurement.",
  },
  {
    title: "Undo cosmic expansion",
    body: "Light from distant galaxies is stretched by the expanding universe. Every spectrum is shifted back to its rest frame so the same line lands in the same place.",
  },
  {
    title: "Resample",
    body: "Raw spectra have ~4,600 unevenly spaced pixels. Each is interpolated onto exactly 2,000 evenly spaced points so the network sees a consistent input.",
  },
  {
    title: "Clean and balance",
    body: "Spectra with gaps are dropped, then both classes are trimmed to 2,393 each, so the network can't win by always guessing the bigger class.",
  },
  {
    title: "Train",
    body: "70% of the spectra teach the network; 30% are hidden away to test it. Training stops on its own when the hidden set stops improving.",
  },
];

/* ---------- visuals ---------- */

const Caption = ({ children }: { children: React.ReactNode }) => (
  <text x={W / 2} y={H - 8} textAnchor="middle" className="fill-muted-foreground font-mono text-[11px]">
    {children}
  </text>
);

const QueryVisual = () => {
  const cols = 25;
  const rows = 8;
  return (
    <g>
      {[
        "-- agn.sql",
        "WHERE s.class IN ('QSO', 'AGN') AND s.zWarning = 0",
        "-- starburst.sql",
        "WHERE s.subClass LIKE '%starburst%' AND s.zWarning = 0",
      ].map((line, i) => (
        <motion.text
          key={line}
          x={24}
          y={34 + i * 20}
          className={`font-mono text-[12px] ${line.startsWith("--") ? "fill-muted-foreground" : "fill-foreground/85"}`}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 24 }}
          transition={{ delay: i * 0.12, duration: 0.6, ease }}
        >
          {line}
        </motion.text>
      ))}
      {Array.from({ length: cols * rows }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const isAgn = c < cols / 2 ? (c * 7 + r * 3) % 9 !== 0 : (c * 5 + r) % 11 === 0;
        return (
          <motion.circle
            key={i}
            cx={34 + c * 20.5}
            cy={140 + r * 16}
            r={3}
            fill={isAgn ? "hsl(var(--agn))" : "hsl(var(--starburst))"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 0.4 + (c + r) * 0.025, duration: 0.4 }}
          />
        );
      })}
      <Caption>SDSS DR18 · 10,000 spectra requested</Caption>
    </g>
  );
};

const SAMPLES = 320;
const Z = 0.085;
const specY = (lambda: number) => 230 - (flux("starburst", lambda) / 2.7) * 190;
const pathFor = (z: number) => {
  let d = "";
  for (let i = 0; i <= SAMPLES; i++) {
    const lambda = LAMBDA_MIN + ((LAMBDA_MAX - LAMBDA_MIN) * i) / SAMPLES;
    const x = lambdaToX(lambda * (1 + z), W);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${specY(lambda).toFixed(1)}`;
  }
  return d;
};

const RedshiftVisual = () => {
  const restX = lambdaToX(6563, W);
  const obsX = lambdaToX(6563 * (1 + Z), W);
  return (
    <g>
      <defs>
        <clipPath id="spec-clip">
          <rect x={0} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <text x={24} y={34} className="fill-foreground font-mono text-[13px]">
        λ<tspan baselineShift="sub" fontSize="9">rest</tspan> = λ<tspan baselineShift="sub" fontSize="9">obs</tspan> / (1 + z)
      </text>
      <g clipPath="url(#spec-clip)">
        <path d={pathFor(Z)} fill="none" stroke="white" strokeOpacity={0.18} strokeWidth={1.25} />
        <motion.path
          fill="none"
          stroke="hsl(var(--starburst))"
          strokeWidth={1.75}
          initial={{ d: pathFor(Z) }}
          animate={{ d: pathFor(0) }}
          transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
        />
      </g>
      <motion.line
        y1={50}
        y2={240}
        stroke="hsl(var(--starburst))"
        strokeDasharray="3 4"
        strokeOpacity={0.7}
        initial={{ x1: obsX, x2: obsX }}
        animate={{ x1: restX, x2: restX }}
        transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.text
        y={64}
        textAnchor="end"
        className="fill-foreground/80 font-mono text-[11px]"
        initial={{ x: obsX - 8 }}
        animate={{ x: restX - 8 }}
        transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
      >
        Hα
      </motion.text>
      <Caption>observed (grey) → rest frame · z = {Z}</Caption>
    </g>
  );
};

const ResampleVisual = () => {
  // Zoom on the Hα region: irregular raw pixels vs. uniform resampled points.
  const lo = 6470;
  const hi = 6660;
  const x = (l: number) => 24 + ((l - lo) / (hi - lo)) * (W - 48);
  const y = (l: number) => 250 - (flux("starburst", l) / 2.7) * 210;
  const raw = Array.from({ length: 64 }, (_, i) => lo + ((hi - lo) * (i + 0.5 + 0.35 * Math.sin(i * 2.3))) / 64);
  const uniform = Array.from({ length: 28 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 28);
  return (
    <g>
      {raw.map((l, i) => (
        <motion.circle
          key={`r${i}`}
          cx={x(l)}
          cy={y(l)}
          r={2}
          fill="white"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: 1, duration: 1 }}
        />
      ))}
      {uniform.map((l, i) => (
        <motion.g key={`u${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.04 }}>
          <line x1={x(l)} x2={x(l)} y1={250} y2={y(l)} stroke="hsl(var(--starburst))" strokeOpacity={0.35} />
          <circle cx={x(l)} cy={y(l)} r={3.5} fill="hsl(var(--starburst))" />
        </motion.g>
      ))}
      <line x1={24} x2={W - 24} y1={250} y2={250} stroke="white" strokeOpacity={0.12} />
      <Caption>≈ 4,600 uneven pixels → 2,000 even samples (Hα region shown)</Caption>
    </g>
  );
};

const BalanceVisual = () => {
  const max = 2500;
  const bw = W - 200;
  const rows = [
    { label: "AGN", color: "hsl(var(--agn))", from: 2500, to: 2393, note: "107 with gaps removed" },
    { label: "Starburst", color: "hsl(var(--starburst))", from: 2500, to: 2393, note: "trimmed to match" },
  ];
  return (
    <g>
      {rows.map((r, i) => {
        const y = 60 + i * 90;
        return (
          <g key={r.label}>
            <text x={24} y={y - 12} className="fill-foreground text-[13px] font-medium">
              {r.label}
            </text>
            <rect x={24} y={y} width={bw} height={22} rx={6} fill="white" fillOpacity={0.05} />
            <motion.rect
              x={24}
              y={y}
              height={22}
              rx={6}
              fill={r.color}
              initial={{ width: (r.from / max) * bw }}
              animate={{ width: (r.to / max) * bw }}
              transition={{ delay: 0.6, duration: 1.4, ease }}
            />
            <motion.text
              x={bw + 40}
              y={y + 16}
              className="fill-foreground font-mono text-[13px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              {r.to.toLocaleString()}
            </motion.text>
            <text x={24} y={y + 42} className="fill-muted-foreground text-[11px]">
              {r.note}
            </text>
          </g>
        );
      })}
      <Caption>{stats.spectra.toLocaleString()} spectra, perfectly balanced</Caption>
    </g>
  );
};

const TrainVisual = () => {
  const bx = 24;
  const bw = W - 48;
  const split = bw * 0.7;
  const maxLoss = 1.4;
  const cx = (e: number) => bx + ((e - 1) / 68) * bw;
  const cy = (v: number) => 250 - (v / maxLoss) * 120;
  const d = trainingHistory.map((p, i) => `${i ? "L" : "M"}${cx(p.epoch).toFixed(1)} ${cy(p.valLoss).toFixed(1)}`).join("");
  return (
    <g>
      <motion.rect x={bx} y={40} height={24} rx={6} fill="hsl(var(--agn))" initial={{ width: 0 }}
        animate={{ width: split - 2 }} transition={{ duration: 0.9, ease }} />
      <motion.rect x={bx + split + 2} y={40} height={24} rx={6} fill="white" fillOpacity={0.35}
        initial={{ width: 0 }} animate={{ width: bw - split - 2 }} transition={{ duration: 0.7, delay: 0.5, ease }} />
      <text x={bx} y={84} className="fill-foreground text-[12px]">
        {stats.train.toLocaleString()} to learn from
      </text>
      <text x={bx + bw} y={84} textAnchor="end" className="fill-foreground text-[12px]">
        {stats.validation.toLocaleString()} held out
      </text>
      <text x={bx} y={120} className="fill-muted-foreground font-mono text-[11px]">
        validation loss
      </text>
      <motion.path d={d} fill="none" stroke="hsl(var(--agn))" strokeWidth={1.75}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
        <circle cx={cx(stats.bestEpoch)} cy={cy(0.2278)} r={4.5} fill="hsl(var(--card))" stroke="white" strokeWidth={2} />
        <text x={cx(stats.bestEpoch)} y={cy(0.2278) - 12} textAnchor="middle" className="fill-foreground text-[11px]">
          best · epoch {stats.bestEpoch}
        </text>
      </motion.g>
      <Caption>early stopping restored the best weights at epoch {stats.bestEpoch}</Caption>
    </g>
  );
};

const visuals = [QueryVisual, RedshiftVisual, ResampleVisual, BalanceVisual, TrainVisual];

/* ---------- stepper ---------- */

const Pipeline = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, inView]);

  const Visual = visuals[active];

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
      <ol className="flex flex-col">
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.title} className="relative border-t border-white/[0.07] first:border-t-0">
              <button
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className="w-full py-4 text-left"
                aria-current={isActive ? "step" : undefined}
              >
                <div className="flex items-baseline gap-4">
                  <span className={`font-mono text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    0{i + 1}
                  </span>
                  <span
                    className={`text-lg font-semibold tracking-tight transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/45 hover:text-foreground/75"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden pl-9 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span className="block pt-2">{s.body}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
              {isActive && auto && inView && (
                <motion.span
                  key={`progress-${active}`}
                  className="absolute -top-px left-0 h-px bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="panel relative overflow-hidden p-2 md:p-4">
        <AnimatePresence mode="wait">
          <motion.svg
            key={active}
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="img"
            aria-label={steps[active].title}
          >
            <Visual />
          </motion.svg>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Pipeline;
