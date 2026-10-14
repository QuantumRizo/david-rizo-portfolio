import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const timeline = [
  { period: "2026 — Now", title: "Founder", org: "Camp Lead", note: "AI automation for summer camps." },
  { period: "2026 — Now", title: "Software Engineer", org: "Central de Negocios", note: "Full-stack platforms and internal tools." },
  { period: "2025 — 2026", title: "Data Analyst", org: "Central de Negocios", note: "Statistical modelling and data pipelines." },
  { period: "2025 — 2026", title: "Coding Program Leader", org: "French Woods Festival", note: "Designed and taught the programming curriculum." },
  { period: "2025", title: "Research, Social Service", org: "Instituto de Astronomía, UNAM", note: "Deep learning for galaxy spectra." },
  { period: "2020 — 2024", title: "B.Sc. Physics", org: "UNAM", note: "Theoretical and experimental physics." },
];

const stack = [
  { group: "Machine learning", items: "Python · TensorFlow · scikit-learn · NumPy · Astropy" },
  { group: "AI systems", items: "LLMs · Pydantic · Playwright · Docker" },
  { group: "Software", items: "TypeScript · React · Node.js · SQL · PostgreSQL" },
];

const About = () => (
  <section id="about" className="border-t border-white/[0.06] py-24 md:py-36">
    <div className="mx-auto max-w-[1080px] px-5">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
          className="overflow-hidden rounded-[2rem] border border-white/[0.06]"
        >
          <img
            src="/davidrizo.webp"
            alt="David Rizo"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[40%_30%]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="eyebrow">About</p>
          <h2 className="headline mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03]">
            Trained as a physicist.
            <br />
            <span className="text-muted-foreground">Working as an engineer.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              I studied physics at UNAM, where modelling the universe with mathematics led me to machine learning. My
              research applied deep learning to galaxy spectra at the Instituto de Astronomía.
            </p>
            <p>
              Today I build AI and software that people rely on every day. I bring the same habits from the lab: measure
              everything, question the result, and make it reproducible.
            </p>
            <p>Away from the keyboard, I play guitar, bass, piano and drums.</p>
          </div>

          <dl className="mt-10 space-y-3 border-t border-white/[0.07] pt-6">
            {stack.map((s) => (
              <div key={s.group} className="grid gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="text-sm text-foreground">{s.group}</dt>
                <dd className="text-sm text-muted-foreground">{s.items}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <div id="experience" className="mt-24 md:mt-32">
        <p className="eyebrow">Experience</p>
        <ol className="mt-6 border-t border-white/[0.07]">
          {timeline.map((t, i) => (
            <motion.li
              key={`${t.org}-${t.title}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease }}
              className="grid gap-1 border-b border-white/[0.07] py-5 md:grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-6"
            >
              <span className="font-mono text-xs text-muted-foreground">{t.period}</span>
              <span className="text-[17px] font-medium tracking-tight">
                {t.title} <span className="text-muted-foreground">· {t.org}</span>
              </span>
              <span className="text-sm text-muted-foreground">{t.note}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default About;
