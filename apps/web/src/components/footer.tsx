import { LogoEdust } from "@/components"
import { Separator, Typography } from "@/components/ui"
import Link from "next/link"
import { FaFacebook, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

// data will be 3
const footerData = [
  {
    title: "Quick Links",
    links: [
      {
        title: "About Us",
        href: "/about-us",
        isExternal: false,
      },
      {
        title: "Contact Us",
        href: "/contact-us",
        isExternal: false,
      },
      {
        title: "Institutes",
        href: "/institutes",
        isExternal: false,
      },
      {
        title: "Create Organization",
        href: "/organization-create",
        isExternal: false,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Feedback Form",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScIxBL2Zm1MVpmRTNoLUIwD-vcW9rv1SG73zx3Ggq48y1RRZQ/viewform?usp=header",
        isExternal: true,
      },
      {
        title: "Help Center",
        href: "/help-center",
        isExternal: false,
      },
      {
        title: "Contact Support",
        href: "/contact-support",
        isExternal: false,
      },
      {
        title: "Live Chat",
        href: "#",
        isExternal: false,
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        title: "Discord",
        href: "https://discord.gg/vnhqmn9mdj",
        isExternal: true,
      },
      {
        title: "GitHub",
        href: "https://github.com/edust-org/edust/discussions",
        isExternal: true,
      },
      {
        title: "Forums",
        href: "#",
        isExternal: false,
      },
    ],
  },
]

const socialLinks = [
  {
    icon: <FaFacebook className="size-5" />,
    href: "https://www.facebook.com/edustorg",
  },
  {
    icon: <FaXTwitter className="size-5" />,
    href: "https://x.com/edust_org",
  },
  {
    icon: <FaLinkedin className="size-5" />,
    href: "https://www.linkedin.com/company/edust-org",
  },
]

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link rel="noreferrer noopener" href="/">
            <LogoEdust width={170} />
            <Typography
              affects="removePaddingMargin"
              className="py-2 text-sm font-light leading-5"
            >
              Edust is your trusted platform connecting students, teachers, and
              educational institutions. Our mission is to empower learning
              through innovation, collaboration, and access to exceptional
              resources.
            </Typography>
          </Link>

          <div className="flex items-center gap-2">
            <Typography variant="large">Follow Us | &nbsp;&nbsp;</Typography>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  rel="noreferrer noopener"
                  href={link.href}
                  className="opacity-60 hover:opacity-100"
                  target="_blank"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {footerData.map((item, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <h3 className="text-lg font-bold">{item.title}</h3>
            {item.links.map((link, index) => (
              <div key={index}>
                {link.isExternal ? (
                  link.title == "Feedback Form" ? (
                    <div className="relative inline-block">
                      <a
                        rel="noreferrer noopener"
                        href={link.href}
                        className="opacity-60 hover:opacity-100"
                        target="_blank"
                      >
                        {link.title}
                      </a>
                      <div className="absolute -right-4 top-0">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <a
                      rel="noreferrer noopener"
                      href={link.href}
                      className="opacity-60 hover:opacity-100"
                      target="_blank"
                    >
                      {link.title}
                    </a>
                  )
                ) : (
                  <Link
                    href={link.href}
                    className="opacity-60 hover:opacity-100"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="container pb-14 text-center">
        <Typography>&copy; 2025 Edust. All rights reserved.</Typography>
      </section>
    </footer>
  )
}
