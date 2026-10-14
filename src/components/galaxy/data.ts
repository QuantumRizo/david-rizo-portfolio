// Every number here comes from the training run in
// github.com/QuantumRizo/agn-starburst-galaxy-classifier (notebook.ipynb).

export const REPO_URL = "https://github.com/QuantumRizo/agn-starburst-galaxy-classifier";

export const stats = {
  validationAccuracy: 0.9708,
  spectra: 4786,
  perClass: 2393,
  train: 3350,
  validation: 1436,
  parameters: 32_934_017,
  bestEpoch: 49,
  stoppedEpoch: 69,
};

// [epoch, train accuracy, validation accuracy, train loss, validation loss]
const history: [number, number, number, number, number][] = [
  [1, 0.7105, 0.9102, 2.3504, 1.3939],
  [2, 0.8995, 0.9234, 1.2775, 1.0013],
  [3, 0.921, 0.9311, 0.9703, 0.8542],
  [4, 0.9452, 0.9234, 0.8289, 0.8509],
  [5, 0.9442, 0.9506, 0.7481, 0.6707],
  [6, 0.958, 0.9561, 0.6351, 0.7229],
  [7, 0.9653, 0.9533, 0.6184, 0.6674],
  [8, 0.9555, 0.9659, 0.5921, 0.5702],
  [9, 0.9707, 0.9701, 0.5026, 0.6058],
  [10, 0.9689, 0.9659, 0.4905, 0.4907],
  [11, 0.961, 0.961, 0.4665, 0.5776],
  [12, 0.9668, 0.9694, 0.4784, 0.5552],
  [13, 0.9746, 0.968, 0.4085, 0.5411],
  [14, 0.9805, 0.9624, 0.3824, 0.4594],
  [15, 0.9806, 0.9673, 0.3633, 0.4116],
  [16, 0.974, 0.9694, 0.3546, 0.3889],
  [17, 0.9701, 0.9687, 0.36, 0.4291],
  [18, 0.9839, 0.968, 0.3001, 0.3749],
  [19, 0.9845, 0.9714, 0.2883, 0.3504],
  [20, 0.979, 0.9659, 0.2928, 0.4355],
  [21, 0.9829, 0.9721, 0.2712, 0.3322],
  [22, 0.9841, 0.9673, 0.2562, 0.3745],
  [23, 0.9845, 0.9694, 0.2397, 0.3084],
  [24, 0.981, 0.9721, 0.2498, 0.3473],
  [25, 0.9818, 0.9701, 0.2409, 0.3481],
  [26, 0.9845, 0.9666, 0.236, 0.2876],
  [27, 0.9824, 0.9701, 0.236, 0.3387],
  [28, 0.9816, 0.968, 0.2284, 0.2889],
  [29, 0.987, 0.9701, 0.2048, 0.2764],
  [30, 0.9874, 0.9687, 0.1991, 0.3266],
  [31, 0.9876, 0.9701, 0.1881, 0.2853],
  [32, 0.9776, 0.9589, 0.2114, 0.3625],
  [33, 0.9757, 0.9666, 0.2356, 0.2766],
  [34, 0.9892, 0.9694, 0.1861, 0.265],
  [35, 0.9887, 0.9666, 0.1839, 0.3147],
  [36, 0.9857, 0.9714, 0.1847, 0.3093],
  [37, 0.986, 0.9603, 0.178, 0.3311],
  [38, 0.986, 0.9701, 0.1783, 0.2809],
  [39, 0.993, 0.9673, 0.1614, 0.3008],
  [40, 0.9915, 0.9728, 0.1589, 0.2804],
  [41, 0.9971, 0.9735, 0.143, 0.2668],
  [42, 0.9971, 0.9756, 0.1324, 0.2583],
  [43, 0.9981, 0.9728, 0.1228, 0.2852],
  [44, 0.9961, 0.9694, 0.1186, 0.2637],
  [45, 0.9966, 0.9735, 0.1168, 0.2441],
  [46, 0.9962, 0.9701, 0.1143, 0.2831],
  [47, 0.9975, 0.9666, 0.1074, 0.2528],
  [48, 0.9986, 0.9714, 0.104, 0.235],
  [49, 0.9986, 0.9708, 0.1031, 0.2278],
  [50, 0.999, 0.9673, 0.0955, 0.2589],
  [51, 0.9955, 0.9701, 0.1012, 0.3075],
  [52, 0.9973, 0.968, 0.1005, 0.2837],
  [53, 0.9986, 0.9714, 0.0946, 0.3085],
  [54, 0.9983, 0.9694, 0.0896, 0.2901],
  [55, 0.9968, 0.9694, 0.0931, 0.2733],
  [56, 0.9984, 0.9673, 0.0852, 0.3059],
  [57, 0.9977, 0.9631, 0.087, 0.3123],
  [58, 0.9972, 0.9659, 0.0875, 0.2704],
  [59, 0.9971, 0.9666, 0.0867, 0.2663],
  [60, 0.9996, 0.968, 0.0789, 0.2709],
  [61, 0.9992, 0.9701, 0.0778, 0.2738],
  [62, 0.9993, 0.9701, 0.0776, 0.2773],
  [63, 0.9984, 0.9694, 0.0782, 0.2717],
  [64, 0.9983, 0.9694, 0.0759, 0.2682],
  [65, 0.9998, 0.968, 0.0748, 0.2701],
  [66, 0.9996, 0.9694, 0.074, 0.2746],
  [67, 0.9995, 0.9694, 0.0725, 0.2753],
  [68, 0.9997, 0.9694, 0.0731, 0.277],
  [69, 0.9991, 0.9687, 0.0726, 0.2744],
];

export const trainingHistory = history.map(([epoch, acc, valAcc, loss, valLoss]) => ({
  epoch,
  acc,
  valAcc,
  loss,
  valLoss,
}));

// Rows = actual class, columns = predicted class, over all 4,786 spectra.
export const confusion = {
  labels: ["AGN", "Starburst"] as const,
  matrix: [
    [2378, 15],
    [28, 2365],
  ],
};

export type Stage = {
  id: string;
  name: string;
  kind: "input" | "conv" | "flatten" | "dense" | "output";
  shape: string;
  length: number;
  channels: number;
  params: number;
  plain: string;
  technical: string;
};

export const architecture: Stage[] = [
  {
    id: "input",
    name: "Spectrum",
    kind: "input",
    shape: "2000 × 1",
    length: 2000,
    channels: 1,
    params: 0,
    plain: "One galaxy's light, measured as brightness at 2,000 evenly spaced wavelengths.",
    technical: "Rest-frame flux, linearly interpolated onto a uniform log-wavelength grid.",
  },
  {
    id: "conv1",
    name: "Conv · 64",
    kind: "conv",
    shape: "999 × 64",
    length: 999,
    channels: 64,
    params: 256,
    plain:
      "64 tiny detectors slide along the spectrum. Each one learns to light up for a simple shape: a sharp peak, a slope, a dip.",
    technical: "Conv1D(64, k=3, ReLU, L2 1e-3) → 1998 × 64, then MaxPool(2).",
  },
  {
    id: "conv2",
    name: "Conv · 128",
    kind: "conv",
    shape: "498 × 128",
    length: 498,
    channels: 128,
    params: 24_704,
    plain:
      "The next layer combines those simple shapes into richer ones, like a narrow line sitting next to a broad one.",
    technical: "Conv1D(128, k=3, ReLU, L2 1e-3) → 997 × 128, then MaxPool(2).",
  },
  {
    id: "conv3",
    name: "Conv · 256",
    kind: "conv",
    shape: "248 × 256",
    length: 248,
    channels: 256,
    params: 98_560,
    plain:
      "Each pooling step zooms out by 2×, so deeper detectors see wider stretches of the spectrum at once.",
    technical: "Conv1D(256, k=3, ReLU, L2 1e-3) → 496 × 256, then MaxPool(2).",
  },
  {
    id: "conv4",
    name: "Conv · 512",
    kind: "conv",
    shape: "123 × 512",
    length: 123,
    channels: 512,
    params: 393_728,
    plain:
      "512 high-level features, each covering a broad region. These capture the kind of line ratios astronomers use by hand.",
    technical: "Conv1D(512, k=3, ReLU, L2 1e-3) → 246 × 512, then MaxPool(2).",
  },
  {
    id: "flatten",
    name: "Flatten",
    kind: "flatten",
    shape: "62,976",
    length: 62_976,
    channels: 1,
    params: 0,
    plain: "All the features are laid side by side into one long list of numbers.",
    technical: "123 × 512 feature map reshaped to a 62,976-vector.",
  },
  {
    id: "dense512",
    name: "Dense · 512",
    kind: "dense",
    shape: "512",
    length: 512,
    channels: 1,
    params: 32_244_224,
    plain:
      "Here the network weighs the evidence. This single layer holds 98% of all its parameters. Half its connections are randomly switched off in training so it can't memorise.",
    technical: "Dense(512, ReLU, L2 1e-3) + Dropout(0.5).",
  },
  {
    id: "dense256",
    name: "Dense · 256",
    kind: "dense",
    shape: "256",
    length: 256,
    channels: 1,
    params: 131_328,
    plain: "The evidence is distilled further, with the same random switch-off to keep it honest.",
    technical: "Dense(256, ReLU, L2 1e-3) + Dropout(0.5).",
  },
  {
    id: "dense128",
    name: "Dense · 128 → 64",
    kind: "dense",
    shape: "128 → 64",
    length: 128,
    channels: 1,
    params: 41_152,
    plain: "Two final layers compress everything into a compact summary of the galaxy.",
    technical: "Dense(128, ReLU) → Dense(64, ReLU), both L2 1e-3.",
  },
  {
    id: "output",
    name: "Verdict",
    kind: "output",
    shape: "1",
    length: 1,
    channels: 1,
    params: 65,
    plain:
      "A single number between 0 and 1: how confident the network is that this galaxy is a starburst rather than an AGN.",
    technical: "Dense(1, sigmoid). Binary cross-entropy, Adam (lr 1e-3, halved on plateau).",
  },
];
