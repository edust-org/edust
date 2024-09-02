import { Navbar } from "@/components";
import { Helmet } from "react-helmet-async";
import { HelpGetStarted } from "./help-get-started";
import { StartDesign } from "./start-design";
import { Faq } from "./faq";
import Hero from "./hero";

export const GuestHome = () => {
  return (
    <>
      <Helmet>
        <title>Edust | Welcome to here</title>
      </Helmet>

      <div className="mb-8">
        <Navbar.Guest />
        <Hero />
      </div>

      <main className="space-y-8 md:space-y-16">
        <HelpGetStarted />
        <Faq />
        <StartDesign />
      </main>
    </>
  );
};
