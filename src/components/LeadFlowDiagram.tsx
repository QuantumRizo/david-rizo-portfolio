import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Mail, Sparkles, UserRound } from "lucide-react";

// Each extracted field has its own colour so you can follow it from the email to the record.
const fields = [
  { key: "parent", label: "Parent", value: "Laura Méndez", color: "#5ea8ff" },
  { key: "campers", label: "Campers", value: "Sofía, 11 · Mateo, 9", color: "#f5b041" },
  { key: "phone", label: "Phone", value: "(555) 014-2290", color: "#34d399" },
  { key: "interests", label: "Interests", value: "Theatre, guitar", color: "#f472b6" },
] as const;

type FieldKey = (typeof fields)[number]["key"];
const colorOf = (key: FieldKey) => fields.find((f) => f.key === key)!.color;

// 0 idle → 1 highlight email → 2 AI reading → 3 fields fill → 4 saved
const PHASES = [700, 1500, 1300, 1700, 3200];

const Mark = ({ k, on, children }: { k: FieldKey; on: boolean; children: React.ReactNode }) => (
  <span
    className="rounded-[4px] px-0.5 transition-[background-color,box-shadow] duration-500"
    style={
      on
        ? { backgroundColor: `${colorOf(k)}2e`, boxShadow: `inset 0 -1.5px 0 ${colorOf(k)}` }
        : { backgroundColor: "transparent", boxShadow: "inset 0 -1.5px 0 transparent" }
    }
  >
    {children}
  </span>
);

/** Dots travelling along a connector between two cards. */
const Flow = ({ active, vertical = false }: { active: boolean; vertical?: boolean }) => (
  <div className={`relative ${vertical ? "mx-auto h-10 w-px" : "h-px w-full"} bg-white/10`} aria-hidden="true">
    {active &&
      [0, 0.4, 0.8].map((delay) => (
        <motion.span
          key={delay}
          className="absolute size-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.6)]"
          style={vertical ? { left: -2.5 } : { top: -2.5 }}
          initial={vertical ? { top: "0%", opacity: 0 } : { left: "0%", opacity: 0 }}
          animate={vertical ? { top: "100%", opacity: [0, 1, 0] } : { left: "100%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
  </div>
);

const LeadFlowDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase]);
    return () => window.clearTimeout(id);
  }, [phase, inView, reduce]);

  const marked = phase >= 1;
  const thinking = phase === 2;
  const filled = phase >= 3;
  const saved = phase >= 4;

  return (
    <div
      ref={ref}
      className="panel relative overflow-hidden p-5 md:p-8"
      role="img"
      aria-label="Diagram: an enquiry email is read by a language model, which extracts the parent, campers, phone and interests, and saves the family in CampMinder. Unclear emails go to a person for review."
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.10),transparent)]" />

      <div className="relative grid items-center gap-0 md:grid-cols-[minmax(0,1fr)_88px_auto_88px_minmax(0,1fr)]">
        {/* Email */}
        <div className="rounded-2xl border border-white/[0.08] bg-background/70 p-4 md:p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5" />
            New email · Summer info
          </div>
          <p className="mt-3 text-[14px] leading-[1.7] text-foreground/85">
            Hi! I'm <Mark k="parent" on={marked}>Laura Méndez</Mark>. My kids{" "}
            <Mark k="campers" on={marked}>Sofía (11) and Mateo (9)</Mark> would love to come this summer. She's into{" "}
            <Mark k="interests" on={marked}>theatre</Mark> and he just started{" "}
            <Mark k="interests" on={marked}>guitar</Mark>. Call me at{" "}
            <Mark k="phone" on={marked}>555-014-2290</Mark>!
          </p>
        </div>

        <div className="py-1 md:hidden">
          <Flow active={marked && !saved} vertical />
        </div>
        <div className="hidden px-2 md:block">
          <Flow active={marked && !saved} />
        </div>

        {/* AI */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="relative flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-card"
            animate={thinking ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: thinking ? Infinity : 0 }}
          >
            <span
              className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${thinking || filled ? "opacity-100" : "opacity-0"}`}
              style={{
                background:
                  "conic-gradient(from 0deg, #5ea8ff33, #f5b04133, #34d39933, #f472b633, #5ea8ff33)",
              }}
            />
            <Sparkles className="relative size-6 text-foreground" strokeWidth={1.6} />
          </motion.div>
          <p className="mt-3 text-sm font-medium">AI reads it</p>
          <p className="text-xs text-muted-foreground">and checks every field</p>
        </div>

        <div className="py-1 md:hidden">
          <Flow active={filled && !saved} vertical />
        </div>
        <div className="hidden px-2 md:block">
          <Flow active={filled && !saved} />
        </div>

        {/* Record */}
        <div className="rounded-2xl border border-white/[0.08] bg-background/70 p-4 md:p-5">
          <div className="flex h-[22px] items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserRound className="size-3.5" />
              CampMinder · new family
            </span>
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300"
                >
                  <Check className="size-3" strokeWidth={3} />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <dl className="mt-3 space-y-2">
            {fields.map((f, i) => (
              <div key={f.key} className="flex items-center gap-3">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: f.color }} />
                <dt className="w-[70px] shrink-0 text-xs text-muted-foreground">{f.label}</dt>
                <dd className="relative h-5 min-w-0 flex-1">
                  {!filled && <span className="absolute inset-y-1 left-0 right-0 rounded bg-white/[0.05]" />}
                  <AnimatePresence>
                    {filled && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.18, duration: 0.4 }}
                        className="relative block truncate font-mono text-[13px] leading-5 text-foreground"
                      >
                        {f.value}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Human review branch */}
      <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/[0.06] pt-5 text-center text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-0.5 text-amber-200">
          Not sure?
        </span>
        If an email is ambiguous, mentions several families or asks not to be contacted, it goes to a person instead.
      </div>
    </div>
  );
};

export default LeadFlowDiagram;
