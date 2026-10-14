export type ProjectSummary = {
  slug: string;
  path: string;
  name: string;
  summary: string;
};

export const projects: ProjectSummary[] = [
  {
    slug: "galaxy-classifier",
    path: "/projects/galaxy-classifier",
    name: "Galaxy Classifier",
    summary:
      "A neural network built from scratch that tells galaxies powered by black holes from galaxies full of newborn stars, just by reading their light.",
  },
  {
    slug: "camp-lead",
    path: "/projects/camp-lead",
    name: "Camp Lead",
    summary:
      "An AI agent that reads summer-camp enquiry emails and registers each family in CampMinder on its own, asking a person whenever it isn't sure.",
  },
];
