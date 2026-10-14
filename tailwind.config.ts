import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: "hsl(var(--card))",
        popover: "hsl(var(--popover))",
        agn: "hsl(var(--agn))",
        starburst: "hsl(var(--starburst))",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Text"', "Inter", "system-ui", "sans-serif"],
        display: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Display"', "Inter", "system-ui", "sans-serif"],
        mono: ['"SF Mono"', '"JetBrains Mono"', "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
    },
  },
} satisfies Config;
