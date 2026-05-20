import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PressSection } from "@/components/sections/PressSection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <VideoSection />
      <ProcessSection />
      {/* <TeamSection /> */}
      {/* <PartnersSection /> */}
      <PressSection />
      <ContactSection />
    </>
  );
}
