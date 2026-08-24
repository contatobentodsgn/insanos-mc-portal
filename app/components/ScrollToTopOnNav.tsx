"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTopOnNav() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If there is no anchor hash, ensure the viewport resets to the top
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
  }, [pathname]);

  return null;
}
