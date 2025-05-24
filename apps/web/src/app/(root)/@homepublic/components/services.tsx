import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from "@edust/ui"

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
    title: "Organization Landing Pages",
    description:
      "Design and customize a dedicated landing page for your organization to showcase your vision, programs, and updates.",
    pro: 0,
  },
  {
    title: "SEO Optimization",
    description:
      "Boost your organization’s visibility with built-in SEO tools for optimized search rankings.",
    pro: 0,
  },
]

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <Typography className="text-primary mb-2 text-center text-lg tracking-wider">
        Services
      </Typography>

      <Typography className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Grow Your Organization
      </Typography>
      <Typography className="text-muted-foreground mx-auto mb-8 text-center text-xl md:w-1/2">
        Empower your organization with tools to create a unique and impactful
        website tailored to your educational goals.
      </Typography>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>

      <div className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-2">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card relative h-full"
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
