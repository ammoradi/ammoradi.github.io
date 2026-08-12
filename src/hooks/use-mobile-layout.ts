import { useEffect, useState } from "react";
import { getInitialMobileLayout } from "../utils/initial-preferences";

export function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(getInitialMobileLayout);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mobileLayout = window.matchMedia("(max-width: 740px)");
    const updateMobileLayout = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);
    mobileLayout.addEventListener("change", updateMobileLayout);
    return () => mobileLayout.removeEventListener("change", updateMobileLayout);
  }, []);

  return isMobile;
}
