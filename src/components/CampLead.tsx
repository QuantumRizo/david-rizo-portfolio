import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";
import { ArrowUpRight, Inbox, ScanText, ShieldCheck, MousePointerClick, LayoutDashboard } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const flow = [
  {
    icon: Inbox,
    title: "Inbox",
    body: "A parent emails the camp. The bot watches a dedicated inbox and claims each new message so it's handled exactly once.",
  },
  {
    icon: ScanText,
    title: "Understand",
    body: "A language model, running locally or through Gemini, reads the email and fills a strict schema: parents, campers, contact details, notes.",
  },
  {
    icon: ShieldCheck,
    title: "Check",
    body: "No-contact requests, emails mentioning several families and CampMinder duplicate warnings are routed to a person.",
  },
  {
    icon: MousePointerClick,
    title: "Register",
    body: "A browser agent signs in (2FA included), searches for an existing family first, then fills and saves the CampMinder form.",
  },
  {
    icon: LayoutDashboard,
    title: "Report",
    body: "Staff see every lead and anything awaiting review on a private dashboard. Problems trigger alerts by email.",
  },
];

const extracted = [
  { field: "parent", value: "Laura Méndez" },
  { field: "email", value: "laura.mendez@example.com" },
  { field: "phone", value: "+1 (555) 014-2290" },
  { field: "campers", value: "Sofía, 11 · Mateo, 9" },
  { field: "interests", value: "theatre, guitar" },
  { field: "notes", value: "Asking about July session" },
];

const humanReview = [
  "The email says not to contact the family",
  "More than one family appears in a single email",
  "CampMinder warns the household may already exist",
  "The result of a save can't be confirmed",
];

const principles = [
  { title: "Never submits twice", body: "Each email is tracked by its unique ID, so retries and restarts can't create duplicate families." },
  { title: "Private by design", body: "Family details never appear in alerts or logs, and backups exclude passwords and login sessions." },
  { title: "Verifies its own work", body: "A lead only counts as done once the saved record is confirmed in CampMinder." },
  { title: "Watched around the clock", body: "Heartbeat monitoring, alerts and daily verified backups keep it running unattended." },
];

const Chapter = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease }}
    className="mb-10 max-w-3xl md:mb-14"
  >
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="headline mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">{title}</h2>
    {children && <p className="lede mt-5">{children}</p>}
  </motion.div>
);

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease },
};

const CampLead = () => (
  <section className="relative overflow-hidden pb-24 pt-10 md:pb-36 md:pt-14">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,hsl(212_86%_59%/0.07),transparent)]" />
    <div className="relative mx-auto max-w-[1080px] px-5">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="text-center"
      >
        <p className="eyebrow">AI in production</p>
        <h1 className="headline mt-5 text-[clamp(2.75rem,7vw,5.5rem)] leading-[1]">Camp Lead.</h1>
        <p className="lede mx-auto mt-6 max-w-2xl">
          An AI agent that turns enquiry emails into registered families. No copy-paste, no typing.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Summer camps receive enquiries all season, and each one used to be retyped by hand into CampMinder, the
          camp's registration system. Camp Lead reads those emails, understands them and does the data entry itself,
          carefully enough that a camp can trust it with real families.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[13px] text-foreground/80">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Live at French Woods Festival
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href="https://getcamplead.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Visit getcamplead.com
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-primary hover:text-foreground">
            See how it works <span aria-hidden="true">›</span>
          </a>
        </div>
      </motion.div>

      {/* Product shot */}
      <motion.figure {...reveal} className="mt-16 md:mt-20">
        <BrowserFrame
          src="/projects/camp-lead/dashboard.webp"
          alt="Camp Lead operations dashboard showing leads processed, families registered and incoming emails"
          url="getcamplead.com/dashboard"
          eager
        />
        <figcaption className="mt-4 text-center text-xs text-muted-foreground/70">
          The operations dashboard the camp team uses. Shown here with demo data; real family details stay private.
        </figcaption>
      </motion.figure>

      {/* Client */}
      <div className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-2 md:gap-16 [&>*]:min-w-0">
        <motion.div {...reveal}>
          <p className="eyebrow">The client</p>
          <h2 className="headline mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">French Woods Festival.</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              French Woods is a performing-arts summer camp in New York State, where campers spend the summer on
              theatre, music, dance, circus and more. Every season brings a steady stream of families writing in to ask
              about it.
            </p>
            <p>
              I first worked there leading the coding program. Today Camp Lead handles their enquiry inbox, so the
              office spends its time talking to families instead of copying their details between systems.
            </p>
          </div>
          <a
            href="https://www.frenchwoods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground"
          >
            frenchwoods.com
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
        <motion.figure {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:p-10">
            <img
              src="/projects/camp-lead/french-woods-logo.webp"
              alt="French Woods Festival of the Performing Arts logo"
              loading="lazy"
              className="w-full"
            />
          </div>
        </motion.figure>
      </div>

      <div className="hairline my-24 md:my-32" />

      <div id="how-it-works" className="scroll-mt-20">
        <Chapter eyebrow="How it works" title="From an email to a registered family.">
          Five steps run automatically for every message that arrives. A person only steps in when the bot decides it
          shouldn't continue on its own.
        </Chapter>
      </div>

      {/* Flow */}
      <div className="relative">
        <div className="absolute bottom-8 left-[27px] top-8 w-px bg-white/10 md:bottom-auto md:left-[10%] md:right-[10%] md:top-[27px] md:h-px md:w-auto">
          <motion.div
            className="absolute left-0 size-1.5 -translate-x-[2.5px] rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.7)] md:hidden"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 hidden size-1.5 -translate-y-[2.5px] rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.7)] md:block"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {flow.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
              className="flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-card">
                <step.icon className="size-5 text-foreground/85" strokeWidth={1.6} />
              </span>
              <div className="md:mt-5">
                <p className="font-mono text-[11px] text-primary">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Example */}
      <div className="mt-20 grid gap-5 md:mt-28 md:grid-cols-2 [&>*]:min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="panel p-6 md:p-8"
        >
          <p className="eyebrow">What arrives</p>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-background/60 p-5">
            <p className="text-[13px] text-muted-foreground">From: Laura Méndez</p>
            <p className="text-[13px] text-muted-foreground">Subject: Summer info</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              Hi! My kids Sofía (11) and Mateo (9) would love to come this summer. She's into theatre and he just
              started guitar. Could you send info on the July session? You can reach me at this email or
              555-014-2290. Thanks!
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/70">Example email. Names and details are fictional.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
          className="panel p-6 md:p-8"
        >
          <p className="eyebrow">What the AI understands</p>
          <dl className="mt-5 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-background/60 font-mono text-[13px]">
            {extracted.map((row, i) => (
              <motion.div
                key={row.field}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 px-4 py-2.5 md:grid-cols-[96px_minmax(0,1fr)]"
              >
                <dt className="text-muted-foreground">{row.field}</dt>
                <dd className="break-words text-foreground/90 [overflow-wrap:anywhere]">{row.value}</dd>
              </motion.div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground/70">
            Validated before anything is written. Missing or malformed fields stop the lead.
          </p>
        </motion.div>
      </div>

      {/* More screens */}
      <div className="mt-24 md:mt-32">
        <Chapter eyebrow="The product" title="Everything the team needs, on one screen.">
          Every family the bot registered, where each lead came from, and anything waiting for a person to look at.
        </Chapter>
        <div className="grid gap-8 md:grid-cols-2 md:gap-5 [&>*]:min-w-0">
          <motion.figure {...reveal}>
            <BrowserFrame
              src="/projects/camp-lead/registered-leads.webp"
              alt="Registered leads table with parents, campers, lead source and CampMinder save status"
              url="getcamplead.com/dashboard#leads"
            />
            <figcaption className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              <span className="text-foreground">Registered leads.</span> Each family, its campers, and a confirmed save
              in CampMinder. Demo data.
            </figcaption>
          </motion.figure>
          <motion.figure {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
            <BrowserFrame
              src="/projects/camp-lead/getcamplead-site.webp"
              alt="The getcamplead.com product website"
              url="getcamplead.com"
            />
            <figcaption className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              <span className="text-foreground">getcamplead.com.</span> The product site for other camps that use
              CampMinder.
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <div className="hairline my-24 md:my-32" />

      {/* Human review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="mt-5 grid gap-6 panel p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-8"
      >
        <div>
          <p className="eyebrow">Built to stop</p>
          <h3 className="headline mt-3 text-2xl md:text-3xl">When in doubt, it asks a person.</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Writing the wrong family into a camp's records is worse than writing nothing. So the bot holds a lead for
            review whenever:
          </p>
        </div>
        <ul className="grid content-center gap-3">
          {humanReview.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/85">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Principles */}
      <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius)] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7 }}
            className="bg-card p-6 md:p-8"
          >
            <h4 className="font-semibold tracking-tight">{p.title}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground">
          Python, Playwright, Pydantic, local and hosted LLMs, SQLite, Docker. 67 automated tests, none of which ever
          touch a real inbox or a real camp account.
        </p>
        <a
          href="https://getcamplead.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground"
        >
          getcamplead.com
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  </section>
);

export default CampLead;
