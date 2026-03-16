import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { RouteAreaShell } from "@/layouts/route-area-shell";

type SiteGroupLayoutProps = {
  children: ReactNode;
};

export default function SiteGroupLayout({ children }: SiteGroupLayoutProps) {
  return (
    <>
      <RouteAreaShell tone="site">{children}</RouteAreaShell>
      <SiteFooter />
    </>
  );
}
