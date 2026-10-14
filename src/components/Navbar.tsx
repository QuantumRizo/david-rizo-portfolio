import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Research", href: "#research" },
  { name: "Camp Lead", href: "#camp-lead" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled || isMenuOpen
          ? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-5">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-foreground">
          David Rizo
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/QuantumRizo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-foreground transition-colors hover:bg-white/[0.14]"
          >
            GitHub
          </a>
        </div>

        <button
          className="-mr-2 p-2 text-foreground/80 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 pb-6 pt-2">
          {[...navLinks, { name: "GitHub", href: "https://github.com/QuantumRizo" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/[0.06] py-3 text-2xl font-semibold tracking-tight text-foreground/90"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
