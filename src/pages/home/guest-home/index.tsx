import { Navbar } from "@/components";
import { Helmet } from "react-helmet-async";
import { HelpGetStarted } from "./help-get-started";
import { StartDesign } from "./start-design";
import { Faq } from "./faq";

export const GuestHome = () => {
  return (
    <>
      <Helmet>
        <title>Edust | Welcome to here</title>
      </Helmet>

      <div className="mb-8">
        <Navbar />
      </div>

      <main className="space-y-8 md:space-y-16">
        <StartDesign />
        <HelpGetStarted />
        <Faq />
      </main>
    </>
  );
};
