import { PiTelegramLogoDuotone } from "react-icons/pi";
import { FaDiscord } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
export const ContactText = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3 p-6">
          <div>
            {" "}
            <p className="text-2xl font-semibold text-black">Chat with us</p>
            <p className="text-base text-slate-900">
              Live Chat Connect with our friendly team <br /> via live chat for
              immediate assistance.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3 text-base font-bold text-slate-900 hover:underline ">
              <PiTelegramLogoDuotone /> <span>Reach out to us</span>
            </p>
            <p className="flex items-center gap-3 text-base font-bold text-slate-900 hover:underline">
              <FaDiscord />
              <span>Send us a message on Discord</span>
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-3 p-6">
          <div>
            <p className="text-2xl font-semibold text-black">Phone Support</p>
            <p className="text-base text-slate-900">
              Our team is available by phone Monday <br /> to Friday, 8 AM - 5
              PM.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3 text-base font-bold text-slate-900 hover:underline">
              <FiPhoneCall /> <span>+880 1760-255882</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
