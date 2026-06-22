import { Hero } from "@/components/home/Hero";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { ScrollWordHighlight } from "@/components/home/ScrollWordHighlight";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { StatsBar } from "@/components/home/StatsBar";
import { ProcessSnapshot } from "@/components/home/ProcessSnapshot";
import { RoiEstimator } from "@/components/home/RoiEstimator";
import { Testimonials } from "@/components/home/Testimonials";
import { TechStackMarquee } from "@/components/home/TechStackMarquee";
import { FaqStrip } from "@/components/home/FaqStrip";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeOffer />
      <ComparisonTable />
      <ScrollWordHighlight />
      <ServicesPreview />
      <FeaturedWork />
      <StatsBar />
      <ProcessSnapshot />
      <RoiEstimator />
      <Testimonials />
      <TechStackMarquee />
      <FaqStrip />
      <CtaBanner />
    </>
  );
}
