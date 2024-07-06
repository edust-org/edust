import { IconsFacebook } from "@/assets/images";
import { FcGoogle } from "react-icons/fc";

export const SocialAuth = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button className="bg-white shadow border border-gray-200 p-2 rounded-full">
        <FcGoogle className="text-3xl" />
      </button>
      <button className="bg-white shadow border border-gray-200 p-2 rounded-full">
        <img src={IconsFacebook} alt="" width={30} />
      </button>
    </div>
  );
};
