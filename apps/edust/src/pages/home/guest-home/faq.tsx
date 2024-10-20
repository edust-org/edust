import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
} from "@/components/ui";

export const Faq = () => {
  return (
    <section className="container">
      <Typography variant="h1" className="mb-8 text-center">
        Frequently Asked Questions (FAQ)
      </Typography>

      <Accordion type="single" collapsible className="mx-auto max-w-[700px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this platform about? </AccordionTrigger>
          <AccordionContent>
            Our platform allows users to create accounts and authenticated users
            to create and manage organizations. These organizations can build
            their own websites, primarily focusing on educational institutions
            like schools, colleges, and universities.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Who can create an organization on this platform?
          </AccordionTrigger>
          <AccordionContent>
            Only authenticated users who have registered on our platform can
            create organizations. Public users can view the organizations and
            their websites but cannot create or manage them.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I register for an account?</AccordionTrigger>
          <AccordionContent>
            You can register for an account by clicking on the "Sign Up" button
            on the homepage. Fill in your name, email, password, and select your
            gender to create an account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Can I view the organizations without an account?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can view the list of organizations or institutions and
            their public sites without creating an account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            What types of organizations can be created on this platform?
          </AccordionTrigger>
          <AccordionContent>
            Our platform supports the creation of educational organizations such
            as schools, colleges, and universities. You can create a
            customizable landing page for your organization to showcase your
            offerings.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Can I create multiple organizations with a single account?
          </AccordionTrigger>
          <AccordionContent>
            No, authenticated users can not create and manage multiple
            organizations with a single account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            How are organization sites built and managed?
          </AccordionTrigger>
          <AccordionContent>
            Once an organization is created, authenticated users can customize
            and manage their organization's site using our platform's tools.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
