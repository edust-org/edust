import {ContactFormSpree} from "./contact-form-spree"

export const ContactFormArea = () => {
  return (
    <div className="flex flex-col items-center gap-12 px-4">
      <section className="flex flex-col gap-4 text-center">
        <p className="text-5xl font-extrabold text-slate-900">
          Contact our team
        </p>
        <p className="text-base text-slate-900">
          Got any question about your problems?
        </p>
      </section>
      <ContactFormSpree />
    </div>
  )
}
