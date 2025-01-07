import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Typography,
} from "@/components/ui"
import faqData from "./faq-data"
import { Link } from "react-router"
import assets from "@/assets/images"

export const Faq = () => {
  return (
    <section className="container">
      <Typography variant="h1" className="mb-8 text-center">
        Frequently Asked Questions (FAQ)
      </Typography>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <Accordion type="single" collapsible>
          {faqData.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <img src={assets.homeFaq} alt="faq" />
      </div>

      <div className="mx-auto mt-16 max-w-xl space-y-4 rounded bg-muted px-4 py-6 text-center shadow-sm">
        <Typography variant="h3">Still have questions?</Typography>
        <Typography>
          Have questions or need assistance? Our team is here to help!
        </Typography>
        <div>
          <Link to={"/contact-us"}>
            <Button>Contact us</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
