import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/QuantumRizo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felix-rizo-dev/" },
  { label: "WhatsApp", href: "https://wa.me/525624290009" },
  { label: "Instagram", href: "https://instagram.com/david_rizo_136" },
];

const Footer = () => (
  <footer id="contact" className="relative overflow-hidden border-t border-white/[0.06]">
    <div className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,hsl(212_86%_59%/0.09),transparent)]" />
    <div className="relative mx-auto max-w-[1080px] px-5 py-24 text-center md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">Contact</p>
        <h2 className="headline mx-auto mt-5 max-w-3xl text-[clamp(2.5rem,6.5vw,5rem)] leading-[1]">
          Have a hard problem?
          <br />
          <span className="text-muted-foreground">Let's talk.</span>
        </h2>
        <a
          href="mailto:davidrizo.phys@gmail.com"
          className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          davidrizo.phys@gmail.com
        </a>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
    <div className="relative mx-auto flex max-w-[1080px] flex-col gap-2 border-t border-white/[0.06] px-5 py-6 text-xs text-muted-foreground/70 md:flex-row md:justify-between">
      <p>© {new Date().getFullYear()} Félix David Rizo Serrano</p>
      <p>Mexico City</p>
    </div>
  </footer>
);

export default Footer;
