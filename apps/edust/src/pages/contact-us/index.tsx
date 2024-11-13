import { ContactForm } from "./contact-form";
import { ContactNewsletter } from "./contact-newsletter";
import { ContactText } from "./contact-text";

export const ContactUs = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-20 justify-center">
        <ContactForm />
        <ContactText/>
      </div>
      <ContactNewsletter/>
    </>
  );
};
