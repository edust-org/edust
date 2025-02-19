import { FaDiscord, FaWhatsapp } from "react-icons/fa"
import { PhoneCall } from "lucide-react"
import { Typography } from "@/components/ui"
import { defaultValues } from "@/configs"
export const ContactText = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3 p-6">
          <div>
            <p className="text-2xl font-semibold text-black">Chat with us</p>
            <p className="text-base text-slate-900">
              Live Chat Connect with our friendly team <br /> via live chat for
              immediate assistance.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Typography>
              <FaWhatsapp className="inline-block" />{" "}
              <a href={defaultValues.contactWhatsAppLink}>Reach out to us</a>
            </Typography>

            <Typography affects="removePaddingMargin">
              <FaDiscord className="inline-block" />{" "}
              <a href={defaultValues.discordLink}>
                Send us a message on Discord
              </a>
            </Typography>
          </div>
        </section>
        <section className="flex flex-col gap-3 p-6">
          <Typography variant="h3">Phone Support</Typography>
          <Typography affects="removePaddingMargin">
            Our team is available by phone Monday <br /> to Friday, 8 AM - 5 PM.
          </Typography>
          <Typography affects="removePaddingMargin">
            {" "}
            <PhoneCall className="inline-block" />{" "}
            <a href={`tel:${defaultValues.mobileNumber}`} target="_blank">
              {defaultValues.mobileNumber}
            </a>
          </Typography>
        </section>
      </div>
    </>
  )
}
