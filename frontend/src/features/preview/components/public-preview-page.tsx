import Link from "next/link";
import {
  ArrowRight,
  Eye,
  LayoutDashboard,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/lib/app-config";
import { sampleResources } from "@/lib/site-data";

const previewRoutes = [
  {
    title: "Public preview routes",
    description:
      "Landing pages and sample resource pages are open so people can understand the template before signing in.",
    Icon: Eye,
  },
  {
    title: "Optional auth demo",
    description:
      "Login, sign up, password reset, and email verification stay available as reusable examples rather than the first required step.",
    Icon: LockKeyhole,
  },
  {
    title: "Protected dashboard",
    description:
      "The owner analytics area remains private so the starter still demonstrates gated routes and permission-aware flows.",
    Icon: LayoutDashboard,
  },
];

export function PublicPreviewPage() {
  const featuredResource = sampleResources[0];

  return (
    <main className="relative overflow-x-hidden px-0 pb-14">
      <section className="relative mx-auto grid w-[min(1080px,calc(100%-2rem))] gap-6 py-8 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-4 left-[8%] h-40 w-40 rounded-full bg-[rgba(239,125,87,0.18)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-8 right-[10%] h-48 w-48 rounded-full bg-[rgba(31,111,120,0.12)] blur-3xl"
        />

        <section className="relative overflow-hidden rounded-[38px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,247,240,0.68))] px-[clamp(1.5rem,4vw,3rem)] py-[clamp(1.8rem,4vw,3rem)] shadow-[0_28px_72px_rgba(31,41,55,0.08)] backdrop-blur-[20px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 right-[-4%] h-48 w-48 rounded-full bg-[rgba(255,214,188,0.32)] blur-3xl"
          />
          <div className="relative grid gap-5">
            <Badge className="w-fit rounded-full bg-white/84 px-4 py-2 text-[var(--accent-brand)] shadow-sm hover:bg-white/84">
              Public Preview
            </Badge>
            <div className="grid gap-4">
              <h1 className="m-0 max-w-[940px] font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[0.94] tracking-[-0.06em] text-[var(--text)]">
                Explore the starter without creating an account first.
              </h1>
              <p className="m-0 max-w-[760px] text-[1.02rem] leading-8 text-[var(--muted-text)]">
                {appConfig.name} now treats previewing as the default path. You
                can browse the public product surface, open sample resources,
                and understand the structure before touching the auth flow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {featuredResource ? (
                <Button asChild>
                  <Link href={`/resources/${featuredResource.slug}`}>
                    Open sample resource
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="secondary">
                <Link href="/login">Open auth demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <Card className="rounded-[32px] border-white/80 bg-white/80">
            <CardHeader className="grid gap-2">
              <Badge variant="outline" className="w-fit">
                Public content preview
              </Badge>
              <CardTitle className="text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Sample resources that already work without login
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {sampleResources.map((resource) => (
                <article
                  key={resource.id}
                  className="grid gap-3 rounded-[26px] border border-white/85 bg-white/76 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    <span>{resource.visibility}</span>
                    <span>{resource.entry_count} entries</span>
                    <span>{resource.estimated_minutes} min</span>
                  </div>
                  <div className="grid gap-2">
                    <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.55rem] tracking-[-0.04em] text-[var(--text)]">
                      {resource.title}
                    </h2>
                    <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                      {resource.description}
                    </p>
                  </div>
                  <div>
                    <Button asChild variant="secondary">
                      <Link href={`/resources/${resource.slug}`}>
                        Preview route
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {previewRoutes.map(({ title, description, Icon }) => (
              <Card
                key={title}
                className="rounded-[30px] border-white/80 bg-white/78"
              >
                <CardContent className="grid gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[rgba(31,111,120,0.08)] text-[var(--accent-brand)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="grid gap-2">
                    <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.45rem] tracking-[-0.04em] text-[var(--text)]">
                      {title}
                    </h2>
                    <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="rounded-[30px] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,243,235,0.92))]">
              <CardContent className="grid gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(239,125,87,0.92),rgba(255,185,103,0.9))] text-white shadow-[0_16px_32px_rgba(239,125,87,0.2)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="grid gap-2">
                  <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.55rem] tracking-[-0.04em] text-[var(--text)]">
                    Better for deployed demos
                  </h2>
                  <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                    This makes the template easier to share publicly because the
                    first impression no longer depends on demo credentials or an
                    in-memory session surviving a refresh.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
}
