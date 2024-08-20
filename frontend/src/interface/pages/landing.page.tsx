import FlexColumnCenter from "@/interface/components/box/flex-column-center.component";
import CallToAction from "@/interface/components/landing/CallToAction";
import Hero from "@/interface/components/landing/Hero";
import Highlights from "@/interface/components/landing/Highlights";
import Title from "@/interface/components/landing/Title";
import PricingSection from "@/interface/components/sections/pricing.section";

export default function Landing() {
  return (
    <FlexColumnCenter>
      <Title />
      <CallToAction />
      <Hero />
      <Highlights />
      <PricingSection />
    </FlexColumnCenter>
  );
}
