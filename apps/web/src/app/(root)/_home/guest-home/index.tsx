import { Footer, GlobalTopNotificationBar, Navbar } from "@/components"

import { Community } from "./community"
import { Faq } from "./faq"
import { Hero } from "./hero"
import { Newsletter } from "./newsletter"
import { Services } from "./services"
import { StartDesign } from "./start-design"

export const GuestHome = () => {
  return (
    <>
      {/* 
        <meta
          name="description"
          content="Welcome to Edust, a design platform for creating engaging and beautiful educational content."
        />
        <title>Edust | Welcome to here</title>
      */}

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
