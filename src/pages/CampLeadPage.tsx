import CampLead from "@/components/CampLead";
import { BackToWork, NextProject } from "@/components/ProjectNav";
import usePageTitle from "@/usePageTitle";

const CampLeadPage = () => {
  usePageTitle("Camp Lead");
  return (
    <>
      <BackToWork />
      <CampLead />
      <NextProject current="camp-lead" />
    </>
  );
};

export default CampLeadPage;
