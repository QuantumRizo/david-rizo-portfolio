import Hero from "@/components/Hero";
import ProjectsOverview from "@/components/ProjectsOverview";
import About from "@/components/About";
import usePageTitle from "@/usePageTitle";

const Home = () => {
  usePageTitle();
  return (
    <>
      <Hero />
      <ProjectsOverview />
      <About />
    </>
  );
};

export default Home;
