import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { confusion, stats, trainingHistory } from "./data";

const TRAIN_COLOR = "#8e8e93";
const VAL_COLOR = "hsl(var(--agn))";

const useWidth = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
};

const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;

/* ---------- training curve ---------- */

const TrainingChart = () => {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const height = 280;
  const m = { l: 44, r: width < 520 ? 16 : 84, t: 16, b: 34 };
  const iw = Math.max(0, width - m.l - m.r);
  const ih = height - m.t - m.b;
  const yMin = 0.7;
  const x = (e: number) => m.l + ((e - 1) / (stats.stoppedEpoch - 1)) * iw;
  const y = (v: number) => m.t + (1 - (v - yMin) / (1 - yMin)) * ih;
  const line = (key: "acc" | "valAcc") =>
    trainingHistory.map((p, i) => `${i ? "L" : "M"}${x(p.epoch).toFixed(1)} ${y(p[key]).toFixed(1)}`).join("");

  const last = trainingHistory[trainingHistory.length - 1];
  const best = trainingHistory[stats.bestEpoch - 1];
  const point = hover != null ? trainingHistory[hover] : null;
  const showDirect = width >= 520;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    setHover(Math.max(0, Math.min(trainingHistory.length - 1, Math.round(rel * (trainingHistory.length - 1)))));
  };

  return (
    <div className="panel p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold tracking-tight">Accuracy while learning</h4>
          <p className="mt-1 text-sm text-muted-foreground">Share of spectra classified correctly after each epoch.</p>
        </div>
        <div className="flex items-center gap-5 text-[13px] text-foreground/80">
          <span className="flex items-center gap-2">
            <svg width="18" height="4" aria-hidden="true"><line x1="0" x2="18" y1="2" y2="2" stroke={TRAIN_COLOR} strokeWidth="2" strokeDasharray="4 3" /></svg>
            Training
          </span>
          <span className="flex items-center gap-2">
            <svg width="18" height="4" aria-hidden="true"><line x1="0" x2="18" y1="2" y2="2" stroke={VAL_COLOR} strokeWidth="2" /></svg>
            Validation (unseen)
          </span>
        </div>
      </div>

      <div ref={ref} className="relative mt-6">
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible" role="img"
            aria-label={`Training accuracy reached ${pct(last.acc)}; validation accuracy settled near ${pct(best.valAcc)}.`}>
            {[0.7, 0.8, 0.9, 1].map((t) => (
              <g key={t}>
                <line x1={m.l} x2={m.l + iw} y1={y(t)} y2={y(t)} stroke="white" strokeOpacity={t === 0.7 ? 0.16 : 0.06} />
                <text x={m.l - 10} y={y(t) + 4} textAnchor="end" className="fill-muted-foreground font-mono text-[11px]">
                  {Math.round(t * 100)}%
                </text>
              </g>
            ))}
            {[1, 10, 20, 30, 40, 50, 60, 69].map((e) => (
              <text key={e} x={x(e)} y={height - 10} textAnchor="middle" className="fill-muted-foreground font-mono text-[11px]">
                {e}
              </text>
            ))}

            {/* best-weights marker */}
            <line x1={x(stats.bestEpoch)} x2={x(stats.bestEpoch)} y1={m.t} y2={m.t + ih} stroke="white" strokeOpacity={0.22} strokeDasharray="2 4" />
            <text x={x(stats.bestEpoch) - 6} y={y(0.72)} textAnchor="end" className="fill-muted-foreground text-[11px]">
              Best weights kept · epoch {stats.bestEpoch}
            </text>

            <motion.path d={line("acc")} fill="none" stroke={TRAIN_COLOR} strokeWidth={2} strokeDasharray="5 4"
              strokeLinejoin="round" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <motion.path d={line("valAcc")} fill="none" stroke={VAL_COLOR} strokeWidth={2} strokeLinejoin="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />

            {showDirect && (
              <>
                <text x={x(last.epoch) + 10} y={y(last.acc) + 4} className="fill-foreground/80 text-[12px]">Training</text>
                <text x={x(last.epoch) + 10} y={y(last.valAcc) + 4} className="fill-foreground/80 text-[12px]">Validation</text>
              </>
            )}

            {point && (
              <g pointerEvents="none">
                <line x1={x(point.epoch)} x2={x(point.epoch)} y1={m.t} y2={m.t + ih} stroke="white" strokeOpacity={0.35} />
                <circle cx={x(point.epoch)} cy={y(point.acc)} r={4.5} fill={TRAIN_COLOR} stroke="hsl(var(--card))" strokeWidth={2} />
                <circle cx={x(point.epoch)} cy={y(point.valAcc)} r={4.5} fill={VAL_COLOR} stroke="hsl(var(--card))" strokeWidth={2} />
              </g>
            )}

            <rect x={m.l} y={m.t} width={iw} height={ih} fill="transparent" onPointerMove={onMove} onPointerDown={onMove}
              onPointerLeave={() => setHover(null)} style={{ touchAction: "pan-y" }} />
          </svg>
        )}

        {point && (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-[170px] rounded-xl border border-white/10 bg-popover/95 px-3.5 py-3 text-[13px] shadow-2xl backdrop-blur-md"
            style={{
              left: Math.min(Math.max(x(point.epoch) + 14, 0), width - 184),
            }}
          >
            <p className="font-medium text-foreground">Epoch {point.epoch}</p>
            <div className="mt-2 space-y-1">
              <p className="flex items-center justify-between gap-6 text-muted-foreground">
                <span className="flex items-center gap-2"><span className="h-0.5 w-3" style={{ background: TRAIN_COLOR }} />Training</span>
                <span className="font-mono text-foreground">{pct(point.acc)}</span>
              </p>
              <p className="flex items-center justify-between gap-6 text-muted-foreground">
                <span className="flex items-center gap-2"><span className="h-0.5 w-3" style={{ background: VAL_COLOR }} />Validation</span>
                <span className="font-mono text-foreground">{pct(point.valAcc)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        Validation passes 91% after a single epoch and holds around 97% while training accuracy keeps climbing. That
        gap is the onset of memorisation, which is why training stops on its own and rolls back to epoch {stats.bestEpoch}.
      </p>

      <details className="mt-4 text-[13px] text-muted-foreground">
        <summary className="cursor-pointer select-none hover:text-foreground">View data as a table</summary>
        <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-white/[0.07]">
          <table className="w-full text-left font-mono text-xs">
            <thead className="sticky top-0 bg-card text-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Epoch</th>
                <th className="px-3 py-2 font-medium">Training</th>
                <th className="px-3 py-2 font-medium">Validation</th>
                <th className="px-3 py-2 font-medium">Val. loss</th>
              </tr>
            </thead>
            <tbody>
              {trainingHistory.map((p) => (
                <tr key={p.epoch} className="border-t border-white/[0.05]">
                  <td className="px-3 py-1.5">{p.epoch}</td>
                  <td className="px-3 py-1.5">{pct(p.acc, 2)}</td>
                  <td className="px-3 py-1.5">{pct(p.valAcc, 2)}</td>
                  <td className="px-3 py-1.5">{p.valLoss.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};

/* ---------- confusion matrix ---------- */

const ConfusionMatrix = () => {
  const { labels, matrix } = confusion;
  const max = Math.max(...matrix.flat());
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const correct = matrix[0][0] + matrix[1][1];

  return (
    <div className="panel flex flex-col p-6 md:p-8">
      <h4 className="text-lg font-semibold tracking-tight">Where it gets confused</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Every spectrum, sorted by its true class (rows) and the network's answer (columns).
      </p>

      <div className="mt-6 grid grid-cols-[auto_1fr_1fr] gap-[2px] text-center">
        <div />
        {labels.map((l) => (
          <div key={l} className="pb-2 text-xs text-muted-foreground">
            Predicted {l}
          </div>
        ))}
        {matrix.map((row, r) => (
          <div key={labels[r]} className="contents">
            <div className="flex items-center pr-3 text-right text-xs text-muted-foreground [writing-mode:vertical-rl] rotate-180 md:rotate-0 md:[writing-mode:horizontal-tb]">
              Actual {labels[r]}
            </div>
            {row.map((v, c) => {
              const onDiagonal = r === c;
              const strength = v / max;
              return (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (r * 2 + c) * 0.08, duration: 0.5 }}
                  title={`Actual ${labels[r]}, predicted ${labels[c]}: ${v.toLocaleString()} spectra`}
                  className={`flex aspect-[4/3] flex-col items-center justify-center rounded-lg ${
                    r === 0 && c === 0 ? "rounded-tl-xl" : ""
                  }`}
                  style={{
                    background: onDiagonal
                      ? `hsl(var(--agn) / ${0.18 + strength * 0.5})`
                      : `rgba(255,255,255,${0.04 + strength * 2})`,
                  }}
                >
                  <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground md:text-3xl">
                    {v.toLocaleString()}
                  </span>
                  <span className="mt-1 font-mono text-[11px] text-foreground/60">
                    {pct(v / row.reduce((a, b) => a + b, 0))}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-auto pt-6 text-[13px] leading-relaxed text-muted-foreground">
        {correct.toLocaleString()} of {total.toLocaleString()} correct overall. Matrix covers all spectra (training and
        validation); the {pct(stats.validationAccuracy)} headline is measured on held-out data only.
      </p>
    </div>
  );
};

/* ---------- section ---------- */

const tiles = [
  { value: pct(stats.validationAccuracy), label: "accuracy on galaxies it never saw during training" },
  { value: stats.spectra.toLocaleString(), label: "real SDSS spectra, balanced between classes" },
  { value: "32.9M", label: "parameters learned from random initialisation" },
  { value: "2,000", label: "wavelength samples read per galaxy" },
];

const Results = () => (
  <div>
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
      {tiles.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.7 }}
          className="bg-card p-6 md:p-8"
        >
          <p className={`headline text-4xl tabular-nums md:text-5xl ${i === 0 ? "text-primary" : ""}`}>{t.value}</p>
          <p className="mt-3 text-[13px] leading-snug text-muted-foreground">{t.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <TrainingChart />
      <ConfusionMatrix />
    </div>
  </div>
);

export default Results;
