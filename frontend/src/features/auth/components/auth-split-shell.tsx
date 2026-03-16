import type { ReactNode } from "react";

type AuthSplitShellProps = {
  badge: string;
  heading: string;
  description: string;
  children: ReactNode;
};

export function AuthSplitShell({
  badge,
  heading,
  description,
  children,
}: AuthSplitShellProps) {
  return (
    <main className="mx-auto my-4 grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(300px,0.95fr)_minmax(0,1.05fr)] gap-5 max-[900px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="grid min-h-[520px] content-end gap-4 rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(16,52,67,0.48),rgba(16,52,67,0.94))] p-[clamp(1.8rem,4vw,3rem)] text-white shadow-[var(--shadow)] max-[900px]:min-h-[320px]">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-2 text-[0.88rem] tracking-[0.04em] uppercase">
          {badge}
        </span>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.96]">
          {heading}
        </h1>
        <p className="m-0 leading-[1.8] text-white/80">{description}</p>
      </section>

      {children}
    </main>
  );
}
