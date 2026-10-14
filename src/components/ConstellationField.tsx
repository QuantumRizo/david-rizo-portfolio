import { useEffect, useRef } from "react";

type Star = {
  bx: number;
  by: number;
  col: number;
  row: number;
  mag: number;
  phase: number;
};

type Probe = { x: number; y: number; r: number; strength: number };

const SPACING = 64;
const POINTER_RADIUS = 220;

/**
 * A star field laid out on a jittered grid. Stars near the pointer (or near a few
 * slowly wandering "probes" when there is no pointer) brighten and link to their
 * grid neighbours, so constellations form and dissolve as you move.
 */
const ConstellationField = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let stars: Star[] = [];
    let grid: (Star | undefined)[][] = [];
    let frame = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false, ease: 0 };

    // Deterministic pseudo-random so the sky is the same on every visit.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed = 7;
      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;
      stars = [];
      grid = Array.from({ length: cols }, () => Array(rows));
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Leave some cells empty so the grid reads as a sky, not a lattice.
          if (rand() < 0.28) continue;
          const star: Star = {
            bx: offsetX + c * SPACING + (rand() - 0.5) * SPACING * 0.7,
            by: offsetY + r * SPACING + (rand() - 0.5) * SPACING * 0.7,
            col: c,
            row: r,
            mag: Math.pow(rand(), 2.2),
            phase: rand() * Math.PI * 2,
          };
          stars.push(star);
          grid[c][r] = star;
        }
      }
    };

    const probesAt = (t: number): Probe[] => [
      {
        x: width * (0.5 + 0.34 * Math.sin(t * 0.00011)),
        y: height * (0.45 + 0.28 * Math.sin(t * 0.00017 + 1.3)),
        r: 190,
        strength: 0.55,
      },
      {
        x: width * (0.5 + 0.4 * Math.cos(t * 0.00008 + 2.1)),
        y: height * (0.55 + 0.3 * Math.sin(t * 0.00013 + 4.2)),
        r: 150,
        strength: 0.4,
      },
    ];

    const influence = (x: number, y: number, probes: Probe[]) => {
      let v = 0;
      for (const p of probes) {
        const d = Math.hypot(x - p.x, y - p.y);
        if (d < p.r) {
          const f = 1 - d / p.r;
          v = Math.max(v, f * f * p.strength);
        }
      }
      return v;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      const drift = reduceMotion ? 0 : t * 0.004;
      const dx = Math.sin(drift * 0.01) * 6;
      const dy = Math.sin(drift * 0.007 + 1) * 6;

      // Faint survey grid, vignetted toward the edges.
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.hypot(cx, cy);
      ctx.lineWidth = 1;
      for (let c = 0; c < cols; c++) {
        const x = Math.round((width - (cols - 1) * SPACING) / 2 + c * SPACING + dx) + 0.5;
        const a = 0.045 * (1 - Math.abs(x - cx) / cx);
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let r = 0; r < rows; r++) {
        const y = Math.round((height - (rows - 1) * SPACING) / 2 + r * SPACING + dy) + 0.5;
        const a = 0.045 * (1 - Math.abs(y - cy) / cy);
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      pointer.ease += ((pointer.active ? 1 : 0) - pointer.ease) * 0.06;
      const probes = reduceMotion ? probesAt(42000) : probesAt(t);
      if (pointer.ease > 0.01) {
        probes.push({ x: pointer.x, y: pointer.y, r: POINTER_RADIUS, strength: pointer.ease });
      }

      const glow = new Map<Star, number>();
      for (const s of stars) {
        glow.set(s, influence(s.bx + dx, s.by + dy, probes));
      }

      // Constellation links between neighbouring grid cells.
      const neighbours = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1],
      ];
      for (const s of stars) {
        const gs = glow.get(s)!;
        if (gs < 0.04) continue;
        for (const [oc, or] of neighbours) {
          const n = grid[s.col + oc]?.[s.row + or];
          if (!n) continue;
          const gn = glow.get(n)!;
          const a = Math.min(gs, gn);
          if (a < 0.04) continue;
          ctx.strokeStyle = `rgba(160,196,255,${a * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s.bx + dx, s.by + dy);
          ctx.lineTo(n.bx + dx, n.by + dy);
          ctx.stroke();
        }
      }

      // Stars.
      for (const s of stars) {
        const x = s.bx + dx;
        const y = s.by + dy;
        const g = glow.get(s)!;
        const twinkle = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(t * 0.0012 + s.phase);
        const vignette = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / maxR);
        const alpha = Math.min(1, (0.18 + s.mag * 0.55) * twinkle * (0.35 + vignette * 0.65) + g * 0.9);
        const radius = 0.6 + s.mag * 1.1 + g * 1.4;

        if (g > 0.15 || s.mag > 0.8) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, radius * 6);
          halo.addColorStop(0, `rgba(170,205,255,${alpha * 0.35})`);
          halo.addColorStop(1, "rgba(170,205,255,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(235,242,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
      if (reduceMotion) draw(0);
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    build();
    draw(0);
    start();

    const resizeObserver = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
};

export default ConstellationField;
