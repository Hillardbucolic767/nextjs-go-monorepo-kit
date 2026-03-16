"use client";

import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  LayoutDashboard,
  Rows3,
  SwatchBook,
  Type,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { appConfig } from "@/lib/app-config";

const paletteChips = [
  { label: "Brand", className: "bg-[var(--brand)] text-white" },
  { label: "Accent", className: "bg-[var(--accent-brand)] text-white" },
  {
    label: "Surface",
    className:
      "border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] text-[var(--text)]",
  },
  {
    label: "Canvas",
    className:
      "border border-[rgba(31,41,55,0.08)] bg-white text-[var(--text)]",
  },
];

const starterNotes = [
  "Use this page as a fast visual QA pass while you customize the starter.",
  "Keep one public route where contributors can inspect the shared UI language.",
  "Replace these examples with your own product primitives as the template evolves.",
];

const sectionClassName =
  "relative mx-auto w-[min(1040px,calc(100%-2rem))] border-t border-[rgba(31,41,55,0.08)] py-10 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]";

const sectionHeaderClassName =
  "grid gap-3 pb-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-start";

const sectionBodyClassName = "grid gap-5 md:pl-[220px]";

export function SandboxPage() {
  return (
    <main className="relative overflow-x-hidden px-0 pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-[6%] h-44 w-44 rounded-full bg-[rgba(255,194,161,0.34)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] right-[8%] h-52 w-52 rounded-full bg-[rgba(31,111,120,0.16)] blur-3xl"
      />

      <section className="relative px-0 pt-6 pb-8">
        <div className="mx-auto grid w-[min(1040px,calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
          <div className="grid gap-5 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.95),rgba(31,111,120,0.82))] p-[clamp(1.75rem,4vw,3rem)] text-white shadow-[var(--shadow)]">
            <Badge className="w-fit rounded-full bg-white/14 px-4 py-2 text-white hover:bg-white/14">
              Starter Sandbox
            </Badge>
            <div className="grid gap-3">
              <h1 className="m-0 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.4rem)] leading-[0.92] tracking-[-0.06em]">
                A vertical sandbox for the starter building blocks.
              </h1>
              <p className="m-0 max-w-[720px] text-[1rem] leading-8 text-white/82">
                Browse the shared pieces that ship with {appConfig.name}. This
                route is meant to feel like a calm inspection surface, not a
                fake app screen.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/">Back home</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Open dashboard preview</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/templates/demo-resource">Open demo template</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className={sectionHeaderClassName}>
          <div className="grid gap-3">
            <Badge variant="outline" className="w-fit">
              Overview
            </Badge>
            <h2 className="m-0 font-[family-name:var(--font-display)] text-[2.2rem] tracking-[-0.04em]">
              What this sandbox is for.
            </h2>
          </div>
          <p className="m-0 max-w-[680px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            Keep this route around as a visual audit page. It helps you see the
            starter language in one place before you rename sections, change
            spacing, or adjust product tone.
          </p>
        </div>

        <div className={sectionBodyClassName}>
          <div className="flex flex-wrap gap-3">
            {paletteChips.map((chip) => (
              <span
                key={chip.label}
                className={`rounded-full px-4 py-3 text-sm font-semibold shadow-sm ${chip.className}`}
              >
                {chip.label}
              </span>
            ))}
          </div>

          <div className="grid gap-3">
            {starterNotes.map((note, index) => (
              <div
                key={note}
                className="grid gap-2 border-l-2 border-[rgba(31,111,120,0.18)] pl-4"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-[var(--accent-brand)] uppercase">
                  0{index + 1}
                </span>
                <p className="m-0 max-w-[760px] text-sm leading-7 text-[var(--muted-text)]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className={sectionHeaderClassName}>
          <div className="grid gap-3">
            <Badge variant="outline" className="w-fit">
              Buttons
            </Badge>
            <h2 className="m-0 flex items-center gap-3 font-[family-name:var(--font-display)] text-[2.2rem] tracking-[-0.04em]">
              <Blocks className="h-7 w-7 text-[var(--accent-brand)]" />
              Action styles
            </h2>
          </div>
          <p className="m-0 max-w-[680px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            Primary actions stay warm and forward, secondary actions keep the
            lighter glass feel, and ghost actions are there for utility moments
            that should stay quiet.
          </p>
        </div>

        <div className={sectionBodyClassName}>
          <div className="flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="ghost">Ghost action</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small primary</Button>
            <Button size="sm" variant="secondary">
              Small secondary
            </Button>
            <Button size="sm" variant="ghost">
              Small ghost
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Dashboard preview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/templates/demo-resource">Demo template</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className={sectionHeaderClassName}>
          <div className="grid gap-3">
            <Badge variant="outline" className="w-fit">
              Typography
            </Badge>
            <h2 className="m-0 flex items-center gap-3 font-[family-name:var(--font-display)] text-[2.2rem] tracking-[-0.04em]">
              <Type className="h-7 w-7 text-[var(--brand-deep)]" />
              Type hierarchy
            </h2>
          </div>
          <p className="m-0 max-w-[680px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            Use the display face for hero moments and titles, then let body copy
            stay spacious and quiet so the page feels calmer overall.
          </p>
        </div>

        <div className={sectionBodyClassName}>
          <div className="grid gap-4">
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5rem)] leading-[0.92] tracking-[-0.07em]">
              Display heading for high-emphasis product moments.
            </h1>
            <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] tracking-[-0.05em]">
              Section heading for structured exploration.
            </h2>
            <p className="m-0 max-w-[760px] text-[1rem] leading-8 text-[var(--muted-text)]">
              Body copy should be easy to scan and soft on the eyes. This is the
              tone the rest of the starter leans on across public and private
              screens.
            </p>
            <span className="text-xs font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase">
              Small helper label / metadata line
            </span>
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className={sectionHeaderClassName}>
          <div className="grid gap-3">
            <Badge variant="outline" className="w-fit">
              Forms
            </Badge>
            <h2 className="m-0 flex items-center gap-3 font-[family-name:var(--font-display)] text-[2.2rem] tracking-[-0.04em]">
              <Rows3 className="h-7 w-7 text-[var(--accent-brand)]" />
              Form surfaces
            </h2>
          </div>
          <p className="m-0 max-w-[680px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            Inputs, selects, and long-form fields already share one visual
            language, so auth and dashboard forms don’t feel stitched together.
          </p>
        </div>

        <div className={`${sectionBodyClassName} max-w-[760px]`}>
          <div className="grid gap-2">
            <Label htmlFor="sandbox-name">Workspace name</Label>
            <Input
              id="sandbox-name"
              placeholder="Starter sandbox audit"
              defaultValue="Starter sandbox audit"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sandbox-type">Surface type</Label>
            <Select defaultValue="dashboard">
              <SelectTrigger id="sandbox-type">
                <SelectValue placeholder="Select a surface" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard shell</SelectItem>
                <SelectItem value="auth">Auth flow</SelectItem>
                <SelectItem value="marketing">Marketing section</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sandbox-notes">Notes</Label>
            <Textarea
              id="sandbox-notes"
              defaultValue="Use this playground to verify that inputs, select menus, and text areas still feel coherent after customization."
            />
          </div>
          <Button className="w-full sm:w-fit">Save sample state</Button>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className={sectionHeaderClassName}>
          <div className="grid gap-3">
            <Badge variant="outline" className="w-fit">
              Overlays
            </Badge>
            <h2 className="m-0 flex items-center gap-3 font-[family-name:var(--font-display)] text-[2.2rem] tracking-[-0.04em]">
              <SwatchBook className="h-7 w-7 text-[var(--brand-deep)]" />
              Slide-over utilities
            </h2>
          </div>
          <p className="m-0 max-w-[680px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            The shared sheet works well for lightweight controls, onboarding
            hints, internal notes, and compact utility surfaces.
          </p>
        </div>

        <div className={sectionBodyClassName}>
          <div className="grid max-w-[760px] gap-3">
            <div className="grid gap-2 border-l-2 border-[rgba(239,125,87,0.24)] pl-4">
              <p className="m-0 font-semibold text-[var(--text)]">
                Dashboard preview
              </p>
              <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                Public on `/dashboard`, private when the owner signs in.
              </p>
            </div>
            <div className="grid gap-2 border-l-2 border-[rgba(31,111,120,0.24)] pl-4">
              <p className="m-0 font-semibold text-[var(--text)]">
                Template detail preview
              </p>
              <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                Public on `/templates/demo-resource` with the same starter
                surface used for detail pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  Open sheet preview
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-5 pt-8">
                  <Badge variant="outline" className="w-fit">
                    Starter overlay
                  </Badge>
                  <div className="grid gap-3">
                    <h2 className="m-0 font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em] text-[var(--text)]">
                      Shared sheet component
                    </h2>
                    <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                      This is a good place for lightweight app controls,
                      internal notes, onboarding steps, or status panels.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-[22px] border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] p-4">
                      <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-5 w-5 text-[var(--accent-brand)]" />
                        <span className="font-semibold text-[var(--text)]">
                          Dashboard preview
                        </span>
                      </div>
                      <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                        Public on `/dashboard`, private when the owner logs in.
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] p-4">
                      <div className="flex items-center gap-3">
                        <Blocks className="h-5 w-5 text-[var(--brand-deep)]" />
                        <span className="font-semibold text-[var(--text)]">
                          Template detail preview
                        </span>
                      </div>
                      <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                        Public on `/templates/demo-resource` with the same
                        starter surface used for detail pages.
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button asChild variant="secondary">
              <Link href="/login">Open auth demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
