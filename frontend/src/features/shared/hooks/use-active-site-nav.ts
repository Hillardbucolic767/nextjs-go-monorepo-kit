"use client";

import { useEffect, useMemo, useState } from "react";

type HomeSection = "home" | "about" | "contact";

function getActiveHomeSection(): HomeSection {
  const viewportCursor = window.scrollY + window.innerHeight * 0.38;
  const aboutTop = document.getElementById("about")?.offsetTop ?? Infinity;
  const contactTop = document.getElementById("contact")?.offsetTop ?? Infinity;

  if (viewportCursor >= contactTop) {
    return "contact";
  }

  if (viewportCursor >= aboutTop) {
    return "about";
  }

  return "home";
}

export function useActiveSiteNav(pathname: string) {
  const [activeHomeSection, setActiveHomeSection] =
    useState<HomeSection>("home");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      setActiveHomeSection(getActiveHomeSection());
    };

    updateActiveSection();

    window.addEventListener("hashchange", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [pathname]);

  return useMemo(() => {
    if (pathname === "/dashboard") {
      return "/dashboard";
    }

    if (pathname !== "/") {
      return pathname;
    }

    if (activeHomeSection === "about") {
      return "/#about";
    }

    if (activeHomeSection === "contact") {
      return "/#contact";
    }

    return "/";
  }, [activeHomeSection, pathname]);
}
