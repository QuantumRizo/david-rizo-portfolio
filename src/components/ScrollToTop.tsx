import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Jump to the top on page changes, or to the anchor when the URL has a hash. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target page has rendered.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}
