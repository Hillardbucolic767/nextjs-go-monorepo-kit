import { AboutSection } from "@/features/home/components/about-section";
import { CollectionCatalog } from "@/features/home/components/collection-catalog";
import { HeroSection } from "@/features/home/components/hero-section";
import { TemplateIdeas } from "@/features/home/components/template-ideas";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <TemplateIdeas />
      <CollectionCatalog />
    </main>
  );
}
