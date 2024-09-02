import { Navbar } from "@/components";
import { HelpGetStarted } from "./help-get-started";
import { Faq } from "./faq";
import { StartDesign } from "./start-design";
export const Playground = () => {
  return (
    <div className="space-y-8">
      <Navbar />
      <HelpGetStarted />
      <Faq />
      <StartDesign />

      <section></section>
    </div>
  );
};
