import GalaxyClassifier from "@/components/galaxy/GalaxyClassifier";
import { BackToWork, NextProject } from "@/components/ProjectNav";
import usePageTitle from "@/usePageTitle";

const GalaxyClassifierPage = () => {
  usePageTitle("Galaxy Classifier");
  return (
    <>
      <BackToWork />
      <GalaxyClassifier />
      <NextProject current="galaxy-classifier" />
    </>
  );
};

export default GalaxyClassifierPage;
