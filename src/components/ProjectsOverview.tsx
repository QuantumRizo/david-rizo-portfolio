import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import LeadFlowDiagram from "@/components/LeadFlowDiagram";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease },
});

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <dt className="text-2xl font-semibold tracking-tight tabular-nums text-foreground md:text-3xl">{value}</dt>
    <dd className="mt-1 text-xs leading-snug text-muted-foreground">{label}</dd>
  </div>
);

const MoreLink = ({ to }: { to: string }) => (
  <Link
    to={to}
    className="group inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
  >
    See the full project
    <span aria-hidden="true" className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
      ›
    </span>
  </Link>
);

const galaxySteps = [
  { title: "Real telescope data", body: "4,786 galaxy spectra from the Sloan Digital Sky Survey." },
  { title: "Physics first", body: "Each spectrum corrected for the expansion of the universe and resampled." },
  { title: "A network of my own", body: "A 1D convolutional network designed and trained from random weights." },
];

const productionChecklist = [
  "Deployed with Docker on its own server, behind HTTPS",
  "Never submits the same email twice, even after a crash or restart",
  "Heartbeat monitoring with email alerts",
  "Daily backups, verified automatically",
  "67 automated tests and CI on every change",
  "Hands unclear cases to a person instead of guessing",
];

/* ---------- 01 · Galaxy Classifier ---------- */

const GalaxySection = () => (
  <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 [&>*]:min-w-0">
    <motion.div {...reveal()}>
      <p className="eyebrow">01 · From the lab</p>
      <h3 className="headline mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02]">Galaxy Classifier.</h3>
      <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
        Some galaxies shine because a black hole at their centre is feeding; others because they are forming stars at a
        furious pace. I built an artificial intelligence <span className="text-foreground">from scratch</span> that tells
        them apart just by reading their light. No pre-trained model and no AI service, just physics, data and a neural
        network I designed and trained myself.
      </p>

      <ol className="mt-7 space-y-4">
        {galaxySteps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="mt-0.5 font-mono text-xs text-primary">0{i + 1}</span>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              <span className="text-foreground">{s.title}.</span> {s.body}
            </p>
          </li>
        ))}
      </ol>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
        <Stat value="97.1%" label="accuracy on galaxies it never saw" />
        <Stat value="32.9M" label="parameters learned from scratch" />
        <Stat value="UNAM" label="Instituto de Astronomía research" />
      </dl>

      <div className="mt-8">
        <MoreLink to="/projects/galaxy-classifier" />
      </div>
    </motion.div>

    <motion.figure {...reveal(0.12)} className="md:order-first">
      <div className="overflow-hidden rounded-[2rem] border border-white/[0.06]">
        <img
          src="/projects/galaxy-classifier/centaurus-a.webp"
          alt="Centaurus A, an active galaxy with jets launched by its central black hole"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-[50%_45%] md:aspect-[4/5]"
        />
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground/70">
        Centaurus A, an active galaxy. ESO/WFI · MPIfR/ESO/APEX · NASA/CXC/CfA
      </figcaption>
    </motion.figure>
  </div>
);

/* ---------- 02 · Camp Lead ---------- */

const CampLeadSection = () => (
  <div>
    <motion.div {...reveal()} className="max-w-3xl">
      <p className="eyebrow">02 · In production</p>
      <h3 className="headline mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02]">
        Camp Lead.
        <br />
        <span className="text-muted-foreground">Real client. Real data. Running every day.</span>
      </h3>
      <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
        An AI agent that reads the enquiry emails a summer camp receives, understands who the family is, and registers
        them in CampMinder, the camp's registration system, without anyone typing. It runs today at{" "}
        <span className="text-foreground">French Woods Festival</span>, and I built, deployed and maintain the whole thing.
      </p>
    </motion.div>

    <motion.div {...reveal(0.1)} className="mt-10 md:mt-12">
      <LeadFlowDiagram />
    </motion.div>

    <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
      <motion.div {...reveal()}>
        <h4 className="text-xl font-semibold tracking-tight">Built to be trusted, not just demoed.</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          A prototype that works once is easy. Software a business depends on has to keep working when emails are
          messy, servers restart and nobody is watching. Here's what that took.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
          <Stat value="Live" label="at French Woods Festival" />
          <Stat value="67" label="automated tests" />
          <Stat value="24/7" label="monitored, with alerts" />
        </dl>
        <div className="mt-8">
          <MoreLink to="/projects/camp-lead" />
        </div>
      </motion.div>

      <motion.ul {...reveal(0.12)} className="grid gap-px self-start overflow-hidden rounded-[var(--radius)] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
        {productionChecklist.map((item) => (
          <li key={item} className="flex gap-3 bg-card p-5 text-[15px] leading-snug text-foreground/85">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  </div>
);

const ProjectsOverview = () => (
  <section id="work" className="scroll-mt-12 py-24 md:py-32">
    <div className="mx-auto max-w-[1080px] px-5">
      <motion.div {...reveal()} className="mb-16 max-w-2xl md:mb-24">
        <p className="eyebrow">Selected work</p>
        <h2 className="headline mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03]">
          Two projects.
          <br />
          <span className="text-muted-foreground">One from the lab, one in the real world.</span>
        </h2>
      </motion.div>

      <GalaxySection />
      <div className="hairline my-24 md:my-32" />
      <CampLeadSection />
    </div>
  </section>
);

export default ProjectsOverview;
