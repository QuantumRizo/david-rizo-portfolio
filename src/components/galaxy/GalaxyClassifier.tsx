import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpectrumPrimer from "./SpectrumPrimer";
import Pipeline from "./Pipeline";
import Architecture from "./Architecture";
import Results from "./Results";
import { REPO_URL } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const Chapter = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) => (
  <Reveal className="mb-10 max-w-3xl md:mb-14">
    <p className="eyebrow">{eyebrow}</p>
    <h3 className="headline mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">{title}</h3>
    {children && <p className="lede mt-5">{children}</p>}
  </Reveal>
);

const fromScratch = [
  {
    title: "No pre-trained model",
    body: "No borrowed weights, no fine-tuning. The network started knowing nothing about light or galaxies.",
  },
  {
    title: "No AI service",
    body: "No ChatGPT, no cloud vision API. It runs entirely on code I wrote, on one consumer GPU.",
  },
  {
    title: "Every step by hand",
    body: "Data queries, physics corrections, architecture, training and evaluation, end to end.",
  },
];

const GalaxyClassifier = () => (
  <section id="research" className="relative py-24 md:py-36">
    <div className="mx-auto max-w-[1080px] px-5">
      {/* Title */}
      <Reveal className="text-center">
        <p className="eyebrow">Featured research · Instituto de Astronomía, UNAM</p>
        <h2 className="headline mt-5 text-[clamp(2.75rem,7vw,5.5rem)] leading-[1]">Galaxy Classifier.</h2>
        <p className="lede mx-auto mt-6 max-w-2xl">
          An artificial intelligence built from scratch that tells two kinds of galaxies apart just by reading their light.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            View the code
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-primary hover:text-foreground">
            See how it works <span aria-hidden="true">›</span>
          </a>
        </div>
      </Reveal>

      {/* Image */}
      <Reveal className="mt-16 md:mt-20">
        <figure className="relative overflow-hidden rounded-[2rem] border border-white/[0.06]">
          <img
            src="/galaxyProject1.webp"
            alt="Centaurus A, an active galaxy with jets launched by its central black hole"
            className="aspect-[16/10] w-full object-cover object-[50%_45%] md:aspect-[21/9]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div>
              <p className="text-sm font-medium text-foreground">Centaurus A</p>
              <p className="text-[13px] text-foreground/60">An active galaxy: its black hole launches jets thousands of light-years long.</p>
            </div>
            <p className="font-mono text-[10px] text-foreground/40">ESO/WFI · MPIfR/ESO/APEX · NASA/CXC/CfA</p>
          </figcaption>
        </figure>
      </Reveal>

      {/* From scratch */}
      <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Reveal>
          <p className="eyebrow">What "from scratch" means</p>
          <h3 className="headline mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
            Not a wrapper.
            <br />
            <span className="text-muted-foreground">A brain built to see light.</span>
          </h3>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-white/[0.07] bg-white/[0.07]">
          {fromScratch.map((f, i) => (
            <Reveal key={f.title} className="bg-card p-6 md:p-7">
              <div className="flex gap-5">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <div>
                  <h4 className="font-semibold tracking-tight">{f.title}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="hairline my-24 md:my-32" />

      {/* The question */}
      <Chapter eyebrow="The question" title="Two galaxies. Two different engines.">
        Some galaxies shine because a black hole at their centre is feeding. Others shine because they're forming stars at
        a furious pace. From far away they can look alike, but split their light into a spectrum and each leaves a
        different fingerprint.
      </Chapter>
      <SpectrumPrimer />

      <div className="hairline my-24 md:my-32" />

      {/* Pipeline */}
      <div id="how-it-works" className="scroll-mt-20">
        <Chapter eyebrow="How it works" title="From raw telescope data to a clean signal.">
          Before any learning happens, the data has to be physically meaningful and perfectly consistent. This is where
          the physics comes in.
        </Chapter>
        <Pipeline />
      </div>

      <div className="hairline my-24 md:my-32" />

      {/* Architecture */}
      <Chapter eyebrow="Inside the network" title="Zoom out. Look deeper. Decide.">
        A one-dimensional convolutional neural network. Each stage shrinks the spectrum in length while growing the
        number of features it tracks. Hover or tap any layer to see what it does.
      </Chapter>
      <Reveal>
        <Architecture />
      </Reveal>

      <div className="hairline my-24 md:my-32" />

      {/* Results */}
      <Chapter eyebrow="Results" title="97 out of 100 galaxies, correctly identified.">
        Tested on 1,436 spectra the network never saw while learning.
      </Chapter>
      <Results />

      <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.07] pt-8 md:flex-row md:items-center">
        <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          Developed during my social service at the Instituto de Astronomía, UNAM, under the supervision of Dr. José
          Antonio de Diego Onsurbe. Data from the Sloan Digital Sky Survey. Built with Python, TensorFlow, Astropy and NumPy.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground"
        >
          Source on GitHub
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </div>
  </section>
);

export default GalaxyClassifier;
