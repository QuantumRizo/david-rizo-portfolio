import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ConstellationField from "./ConstellationField";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease },
});

const Hero = () => {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ConstellationField />
        {/* Soft horizon light and a fade into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
        <div className="pointer-events-none absolute left-1/2 top-[-30%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(212_86%_59%/0.10),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-5 pt-16 text-center">
        <motion.p {...rise(0.1)} className="eyebrow">
          Portfolio
        </motion.p>

        <motion.h1
          {...rise(0.25)}
          className="headline mx-auto mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98]"
        >
          Physics
          <br />
          <span className="bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent">
            and machine learning.
          </span>
        </motion.h1>

        <motion.p {...rise(0.45)} className="lede mx-auto mt-8 max-w-2xl">
          I'm David Rizo, a physicist and machine learning engineer. I build AI, from research models to
          software that runs in the real world.
        </motion.p>

        <motion.div {...rise(0.6)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#research"
            className="rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore the research
          </a>
          <a
            href="#contact"
            className="rounded-full px-6 py-3 text-[15px] font-medium text-primary transition-colors hover:text-foreground"
          >
            Get in touch <span aria-hidden="true">›</span>
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#research"
        aria-label="Scroll to research"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
