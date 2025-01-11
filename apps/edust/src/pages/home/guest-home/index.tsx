import { GlobalTopNotificationBar, Navbar } from "@/components"
import { Helmet } from "react-helmet-async"
import { Hero } from "./hero"
import { Services } from "./services"
import { Community } from "./community"
import { Faq } from "./faq"
import { StartDesign } from "./start-design"
import { Newsletter } from "./newsletter"
import { Footer } from "@/pages/components/footer"

export const GuestHome = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Welcome to Edust, a design platform for creating engaging and beautiful educational content."
        />
        <title>Edust | Welcome to here</title>
      </Helmet>

      <GlobalTopNotificationBar />

      <Navbar />

      <Hero />

      <Services />
      <Community />
      <Faq />
      <StartDesign />
      <Newsletter />
      <Footer />
    </>
  )
}
