import CallToAction from "@/interface/components/landing/CallToAction";
import Hero from "@/interface/components/landing/Hero";
import Highlights from "@/interface/components/landing/Highlights";
import Pricing from "@/interface/components/landing/Pricing";
import Title from "@/interface/components/landing/Title";
import FlexColumnCenter from "@/interface/components/mui/FlexColumnCenter";

export default function Landing() {
  return (
    <FlexColumnCenter>
      <Title />
      <CallToAction />
      <Hero />
      <Highlights />
      <Pricing />
    </FlexColumnCenter>
  );
}
