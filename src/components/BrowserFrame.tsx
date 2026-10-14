/** A quiet browser window around a product screenshot. */
const BrowserFrame = ({ src, alt, url, eager = false }: { src: string; alt: string; url: string; eager?: boolean }) => (
  <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1c1c1f] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
      </div>
      <span className="mx-auto truncate rounded-md bg-white/[0.06] px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
        {url}
      </span>
      <span className="w-[42px]" aria-hidden="true" />
    </div>
    <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="block w-full" />
  </div>
);

export default BrowserFrame;
