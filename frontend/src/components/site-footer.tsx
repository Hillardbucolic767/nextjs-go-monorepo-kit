import { appConfig } from "@/lib/app-config";

export function SiteFooter() {
  return (
    <footer className="px-0 pb-12 pt-4" id="contact">
      <div className="mx-auto flex w-[min(var(--max-width),calc(100%-2rem))] flex-wrap items-center justify-between gap-4 rounded-[32px] bg-[rgba(20,24,36,0.94)] px-6 py-6 text-white/90 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))] max-[720px]:flex-col max-[720px]:items-start">
        <div className="grid gap-1.5">
          <strong className="font-[family-name:var(--font-display)] text-[1.15rem]">
            {appConfig.name}
          </strong>
          <span className="text-white/70">A reusable full-stack starter with auth, dashboard patterns, sample modules, and analytics hooks.</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-white/10 px-3 py-2 text-sm">
            API: {appConfig.url.host}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-2 text-sm">
            Ready for Vercel, Railway, Render, or Fly
          </span>
        </div>
      </div>
    </footer>
  );
}
