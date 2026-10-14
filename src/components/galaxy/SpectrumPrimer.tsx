import { motion } from "framer-motion";
import { flux, keyLines, lambdaToX, spectrumPath, type SpectrumKind } from "./spectra";

const W = 560;
const H = 200;
const SCALE = 2.7;
const TOP = 8;

const yFor = (kind: SpectrumKind, lambda: number) => H - (flux(kind, lambda) / SCALE) * (H - TOP);

type Callout = { lambda: number; title: string; body: string };

const classes: {
  kind: SpectrumKind;
  name: string;
  tagline: string;
  description: string;
  color: string;
  callouts: Callout[];
}[] = [
  {
    kind: "agn",
    name: "Active Galactic Nucleus",
    tagline: "Powered by a black hole.",
    description:
      "A supermassive black hole at the centre is swallowing gas. The infalling material heats up and outshines every star in the galaxy.",
    color: "hsl(var(--agn))",
    callouts: [
      { lambda: 5007, title: "Strong [O III]", body: "Hard radiation from the disk ionises oxygen." },
      { lambda: 6563, title: "Broad Hα", body: "Gas orbiting at thousands of km/s smears the line." },
    ],
  },
  {
    kind: "starburst",
    name: "Starburst Galaxy",
    tagline: "Powered by newborn stars.",
    description:
      "The galaxy is forming stars hundreds of times faster than the Milky Way. Its light comes from huge clouds of hot, young stars.",
    color: "hsl(var(--starburst))",
    callouts: [
      { lambda: 3727, title: "Blue, bright [O II]", body: "Hot young stars tilt the light toward blue." },
      { lambda: 6563, title: "Tall, narrow Hα", body: "Calm hydrogen lit up by stellar nurseries." },
    ],
  },
];

const SpectrumCard = ({ c, index }: { c: (typeof classes)[number]; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    className="panel flex flex-col p-6 md:p-8"
  >
    <div className="flex items-center gap-2.5">
      <span className="size-2 rounded-full" style={{ background: c.color }} />
      <span className="text-sm font-medium text-foreground/80">{c.name}</span>
    </div>
    <h4 className="headline mt-4 text-2xl md:text-3xl">{c.tagline}</h4>
    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.description}</p>

    <div className="mt-8">
      <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full overflow-visible" role="img"
        aria-label={`Illustrative spectrum of a ${c.name.toLowerCase()}`}>
        {keyLines.map((l) => (
          <g key={l.lambda}>
            <line
              x1={lambdaToX(l.lambda, W)}
              x2={lambdaToX(l.lambda, W)}
              y1={0}
              y2={H}
              stroke="white"
              strokeOpacity={0.08}
              strokeDasharray="2 4"
            />
            <text
              x={lambdaToX(l.lambda, W) + (l.lambda === 4861 ? -4 : l.lambda === 5007 ? 4 : 0)}
              y={H + 20}
              textAnchor={l.lambda === 4861 ? "end" : l.lambda === 5007 ? "start" : "middle"}
              className="fill-muted-foreground font-mono text-[13px]"
            >
              {l.label}
            </text>
          </g>
        ))}
        <line x1={0} x2={W} y1={H} y2={H} stroke="white" strokeOpacity={0.12} />
        <motion.path
          d={spectrumPath(c.kind, W, H, { scale: SCALE, top: TOP })}
          fill="none"
          stroke={c.color}
          strokeWidth={1.75}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.3 + index * 0.15, ease: "easeInOut" }}
        />
        {c.callouts.map((co) => (
          <circle
            key={co.lambda}
            cx={lambdaToX(co.lambda, W)}
            cy={yFor(c.kind, co.lambda)}
            r={4}
            fill="hsl(var(--card))"
            stroke={c.color}
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>

    <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-white/[0.07] pt-5">
      {c.callouts.map((co) => (
        <div key={co.lambda}>
          <dt className="text-sm font-medium text-foreground">{co.title}</dt>
          <dd className="mt-1 text-[13px] leading-snug text-muted-foreground">{co.body}</dd>
        </div>
      ))}
    </dl>
  </motion.article>
);

const SpectrumPrimer = () => (
  <div>
    <div className="grid gap-5 md:grid-cols-2">
      {classes.map((c, i) => (
        <SpectrumCard key={c.kind} c={c} index={i} />
      ))}
    </div>
    <p className="mt-4 text-center text-xs text-muted-foreground/70">
      Illustrative rest-frame spectra, 3,600–7,000 Å. Brightness on the vertical axis, wavelength on the horizontal.
    </p>
  </div>
);

export default SpectrumPrimer;
