import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { projects } from "@/projects";

export const BackToWork = () => (
  <div className="mx-auto max-w-[1080px] px-5 pt-20 md:pt-24">
    <Link
      to="/#work"
      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ChevronLeft className="size-4" />
      All work
    </Link>
  </div>
);

/** Large link to the other project, shown at the end of a case study. */
export const NextProject = ({ current }: { current: string }) => {
  const next = projects.find((p) => p.slug !== current);
  if (!next) return null;
  return (
    <section className="border-t border-white/[0.06]">
      <Link to={next.path} className="group mx-auto block max-w-[1080px] px-5 py-20 md:py-28">
        <p className="eyebrow">Next project</p>
        <p className="headline mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-none transition-colors group-hover:text-primary">
          {next.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-2">›</span>
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{next.summary}</p>
      </Link>
    </section>
  );
};
