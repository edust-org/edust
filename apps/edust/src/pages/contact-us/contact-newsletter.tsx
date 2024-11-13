import { Button, Input } from "@/components/ui";

export const ContactNewsletter = () => {
  return (
    <div className="flex items-center justify-between rounded bg-slate-50 p-6 mt-16">
      <div>
        <p className="text-2xl font-semibold text-black">
          Join Our Weekly Newsletter
        </p>
        <p className="text-base text-slate-900">
          Stay up to date with the latest news, announcements, and insightful
          articles.
        </p>
      </div>
      <div>
        {" "}
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
    </div>
  );
};
