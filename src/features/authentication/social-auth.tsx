import assets from "@/assets/images";
import { FcGoogle } from "react-icons/fc";

export const SocialAuth = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button className="rounded-full border border-gray-200 bg-white p-2 shadow">
        <FcGoogle className="text-3xl" />
      </button>
      <button className="rounded-full border border-gray-200 bg-white p-2 shadow">
        <img src={assets.iconsFacebook} alt="" width={30} />
      </button>
    </div>
  );
};
