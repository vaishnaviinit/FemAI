import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonTable from "@/components/landing/ComparisonTable";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <ComparisonTable />
      <CTASection />
    </>
  );
}
