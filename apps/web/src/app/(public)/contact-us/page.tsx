'use client'
import { ContactNewsletter } from "./components/contact-newletter"
import { ContactText } from "./components/contact-text"
import { ContactFormSpree } from "./components/contact-form-spree"
import { ContactHeading } from "./components/contact-heading"
import { Footer, Navbar } from "@/components"



export default function ContactUs() {
  return (
    <>
    <Navbar />
      <section className="my-8 lg:my-16">
        <div className="container">
          <div className="text-center mb-10">
            <ContactHeading />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-evenly gap-10 mb-16">
            <div>
              <ContactFormSpree />
            </div>
            <div>
              <ContactText />
            </div>
          </div>
        </div>
      </section>

      <section>
        <ContactNewsletter />
      </section>
      <Footer />
    </>
  )
}
