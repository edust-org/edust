import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
} from "@edust/ui"

interface FaqProps {
  question: string
  answer: string
  value: string
}

const FaqList: FaqProps[] = [
  {
    question: `What is this platform about?`,
    answer: `Our platform allows users to create accounts and authenticated users
            to create and manage organizations. These organizations can build
            their own websites, primarily focusing on educational institutions
            like schools, colleges, and universities.`,
    value: "item-1",
  },
  {
    question: `Who can create an organization on this platform?`,
    answer: `Only authenticated users who have registered on our platform can
            create organizations. Public users can view the organizations and
            their websites but cannot create or manage them.`,
    value: "item-2",
  },
  {
    question: `How do I register for an account?`,
    answer: `You can register for an account by clicking on the "Sign Up" button
            on the homepage. Fill in your name, email, password, and select your
            gender to create an account.`,
    value: "item-3",
  },
  {
    question: `Can I view the organizations without an account?`,
    answer: `Yes, you can view the list of organizations or institutions and
            their public sites without creating an account.`,
    value: "item-4",
  },
  {
    question: `What types of organizations can be created on this platform?`,
    answer: `Our platform supports the creation of educational organizations such
            as schools, colleges, and universities. You can create a
            customizable landing page for your organization to showcase your
            offerings.`,
    value: "item-5",
  },
  {
    question: `Can I create multiple organizations with a single account?`,
    answer: `No, authenticated users can not create and manage multiple
            organizations with a single account.`,
    value: "item-6",
  },
  {
    question: `How are organization sites built and managed?`,
    answer: `Once an organization is created, authenticated users can customize
            and manage their organization's site using our platform's tools.`,
    value: "item-7",
  },
]

export const Faq = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="mx-auto md:w-[700px]">
        <div className="mb-8 text-center">
          <Typography className="text-primary mb-2 text-center text-lg tracking-wider">
            FAQS
          </Typography>
          <Typography className="text-center text-3xl font-bold md:text-4xl">
            Common Questions
          </Typography>
        </div>

        <Accordion type="single" collapsible>
          {FaqList.map(({ question, answer, value }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
