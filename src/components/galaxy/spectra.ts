// Illustrative rest-frame optical spectra. Shapes follow the textbook signatures
// of each class; they are drawn for explanation, not taken from SDSS.

export const LAMBDA_MIN = 3600;
export const LAMBDA_MAX = 7000;

type Line = { lambda: number; amp: number; sigma: number };

export type SpectrumKind = "agn" | "starburst";

export const keyLines = [
  { lambda: 3727, label: "[O II]" },
  { lambda: 4861, label: "Hβ" },
  { lambda: 5007, label: "[O III]" },
  { lambda: 6563, label: "Hα" },
];

const starburstLines: Line[] = [
  { lambda: 3727, amp: 1.1, sigma: 3.5 },
  { lambda: 4340, amp: 0.25, sigma: 3 },
  { lambda: 4861, amp: 0.7, sigma: 3 },
  { lambda: 4959, amp: 0.22, sigma: 3 },
  { lambda: 5007, amp: 0.65, sigma: 3 },
  { lambda: 6548, amp: 0.15, sigma: 3 },
  { lambda: 6563, amp: 2.4, sigma: 3.2 },
  { lambda: 6583, amp: 0.45, sigma: 3 },
  { lambda: 6716, amp: 0.3, sigma: 3 },
  { lambda: 6731, amp: 0.22, sigma: 3 },
];

const agnLines: Line[] = [
  // broad components from fast-moving gas around the black hole
  { lambda: 4340, amp: 0.35, sigma: 38 },
  { lambda: 4861, amp: 0.75, sigma: 45 },
  { lambda: 6563, amp: 1.9, sigma: 55 },
  // narrow, highly ionised lines
  { lambda: 3727, amp: 0.3, sigma: 3.5 },
  { lambda: 3869, amp: 0.25, sigma: 3.5 },
  { lambda: 4861, amp: 0.3, sigma: 3 },
  { lambda: 4959, amp: 0.65, sigma: 3.2 },
  { lambda: 5007, amp: 1.9, sigma: 3.4 },
  { lambda: 6563, amp: 0.55, sigma: 3.2 },
  { lambda: 6583, amp: 0.5, sigma: 3.2 },
];

const gauss = (x: number, l: Line) => l.amp * Math.exp(-0.5 * ((x - l.lambda) / l.sigma) ** 2);

export const flux = (kind: SpectrumKind, lambda: number) => {
  const t = (lambda - LAMBDA_MIN) / (LAMBDA_MAX - LAMBDA_MIN);
  // Starbursts: hot young stars → continuum rising to the blue.
  // AGN: power-law continuum, flatter, with a gentle blue excess.
  const continuum = kind === "starburst" ? 0.62 - 0.22 * t : 0.5 - 0.08 * t + 0.06 * Math.sin(t * 9);
  const lines = kind === "starburst" ? starburstLines : agnLines;
  let f = continuum;
  for (const l of lines) f += gauss(lambda, l);
  // A little deterministic texture so it reads as measured data.
  f += 0.012 * Math.sin(lambda * 0.91) + 0.008 * Math.sin(lambda * 2.37 + 1.1);
  return f;
};

/** Sample a spectrum into SVG path coordinates inside a w × h box. */
export const spectrumPath = (
  kind: SpectrumKind,
  w: number,
  h: number,
  { samples = 680, shift = 0, scale = 2.7, top = 8 }: { samples?: number; shift?: number; scale?: number; top?: number } = {},
) => {
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const lambda = LAMBDA_MIN + ((LAMBDA_MAX - LAMBDA_MIN) * i) / samples;
    const x = (i / samples) * w + shift;
    const y = h - (flux(kind, lambda) / scale) * (h - top);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
};

export const lambdaToX = (lambda: number, w: number) => ((lambda - LAMBDA_MIN) / (LAMBDA_MAX - LAMBDA_MIN)) * w;
