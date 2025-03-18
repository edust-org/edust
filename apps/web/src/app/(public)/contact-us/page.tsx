import { ContactFormSpree } from "./components/contact-form-spree"
import { ContactHeading } from "./components/contact-heading"
import { ContactNewsletter } from "./components/contact-newletter"
import { ContactText } from "./components/contact-text"

export default function ContactUs() {
  return (
    <>
      <section className="my-8 lg:my-16">
        <div className="container">
          <div className="mb-10 text-center">
            <ContactHeading />
          </div>
          <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-center md:justify-evenly">
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
    </>
  )
}
