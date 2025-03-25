"use client"

import { Footer, GlobalTopNotificationBar, Navbar } from "@/components"

import { Community } from "./components/community"
import { Faq } from "./components/faq"
import { Hero } from "./components/hero"
import { Newsletter } from "./components/newsletter"
import { Services } from "./components/services"
import { StartDesign } from "./components/start-design"

export default function HomePublic() {
  return (
    <>
      <title>Edust | Education Student Teacher</title>
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
