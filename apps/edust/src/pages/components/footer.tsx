import { LogoEdust } from "@/components"
import { Separator, Typography } from "@/components/ui"
import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"

export const Footer = () => {
  return (
    <>
      <div className="container mt-8 lg:mt-16">
        <div>
          <LogoEdust />
          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">Overview</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Pricing</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Marketplace</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">About</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Team</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Blog</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Resources</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">Help</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Sales</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Advertise</a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="mb-10 flex items-center gap-2 text-muted-foreground">
                <li className="font-medium">
                  <a href="https://discord.gg/vnhqmn9mdj" target="_blank">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaDiscord className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="https://github.com/edust-org" target="_blank">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaGithub className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a
                    href="https://www.linkedin.com/company/edust-org"
                    target="_blank"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaLinkedin className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="https://www.facebook.com/edustorg" target="_blank">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaFacebook className="h-6 w-6" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Subscribe to our newsletter
                </label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Email"
                  />
                  <button
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  By submitting, you agree to our
                  <a href="#" className="ml-1 text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mt-4 md:mt-8" />
      <div className="container">
        <div className="grid items-center justify-center gap-4 py-4 md:grid-cols-2 md:justify-between md:py-6">
          <Typography className="text-center md:text-start">
            © 2024 Edust. All rights reserved.
          </Typography>
          <ul className="flex gap-4 text-muted-foreground md:justify-end">
            <li className="whitespace-nowrap underline hover:text-primary">
              <a href="#">Terms and Conditions</a>
            </li>
            <li className="whitespace-nowrap underline hover:text-primary">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
