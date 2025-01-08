import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from "@/components/ui"

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string
  pro: ProService
  description: string
}
const serviceList: ServiceProps[] = [
  {
    title: "Custom Domain Integration",
    description:
      "Create a unique identity for your organization with custom domain support for your Edust landing page.",
    pro: 0,
  },
  {
    title: "Social Media Integrations",
    description:
      "Seamlessly connect your organization’s social media profiles to enhance engagement and visibility.",
    pro: 0,
  },
  {
    title: "Email Notifications and Updates",
    description:
      "Stay connected with automated email notifications for updates, collaborations, and events.",
    pro: 1,
  },
  {
    title: "SEO Optimization",
    description:
      "Boost your organization’s visibility with built-in SEO tools for optimized search rankings.",
    pro: 1,
  },
]

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <Typography className="mb-2 text-center text-lg tracking-wider text-primary">
        Services
      </Typography>

      <Typography className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Grow Your Business
      </Typography>
      <Typography className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        From marketing and sales to operations and strategy, we have the
        expertise to help you achieve your goals.
      </Typography>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>

      <div className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-2">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="relative h-full bg-muted/60 dark:bg-card"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -right-3 -top-2 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  )
}
