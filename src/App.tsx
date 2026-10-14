import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import GalaxyClassifierPage from "@/pages/GalaxyClassifierPage";
import CampLeadPage from "@/pages/CampLeadPage";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/galaxy-classifier" element={<GalaxyClassifierPage />} />
        <Route path="/projects/camp-lead" element={<CampLeadPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
