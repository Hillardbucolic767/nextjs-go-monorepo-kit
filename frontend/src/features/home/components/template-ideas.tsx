"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { featuredTemplates } from "@/lib/site-data";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Button } from "@/components/ui/button";

export function TemplateIdeas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const move = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-0 pt-12">
      <div className="mx-auto grid w-[min(var(--max-width),calc(100%-2rem))] gap-6 rounded-[32px] border border-white/70 bg-white/75 p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Starter Ideas</span>
            <h2>Sample directions you can take this template.</h2>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => move("left")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => move("right")}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className="grid auto-cols-[minmax(240px,280px)] grid-flow-col gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {featuredTemplates.map((idea) => (
            <article
              key={idea.title}
              className="rounded-[24px] border border-[rgba(31,41,55,0.06)] bg-white/85 p-4"
            >
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-[16px]">
                <PlaceholderArt
                  title={idea.title}
                  label={idea.category}
                  tone="soft"
                  className="h-full w-full"
                />
              </div>
              <h3 className="mt-0 mb-2 text-[1.17rem]">{idea.title}</h3>
              <p className="m-0 leading-[1.65] text-[var(--muted-text)]">
                {idea.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
