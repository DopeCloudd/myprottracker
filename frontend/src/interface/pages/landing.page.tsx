import FlexColumnCenter from "@/interface/components/box/flex-column-center.component";
import Hero from "@/interface/components/landing/Hero";
import Highlights from "@/interface/components/landing/Highlights";
import Title from "@/interface/components/landing/Title";
import PricingSection from "@/interface/components/sections/pricing.section";
import CtaButton from "@/interface/components/button/cta.button";

export default function Landing() {
  return (
    <FlexColumnCenter>
      <Title />
      <CtaButton />
      <Hero />
      <Highlights />
      <PricingSection />
    </FlexColumnCenter>
  );
}
