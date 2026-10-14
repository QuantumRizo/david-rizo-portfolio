import { useEffect } from "react";

const SITE = "David Rizo";

export default function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Physics and machine learning`;
  }, [title]);
}
