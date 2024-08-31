import assets from "@/assets/images";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SocialAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v0/auth/google`;
  };
  const handleFacebookLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v0/auth/facebook`;
  };
  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v0/auth/github`;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handleGoogleLogin}
        className="rounded-full border border-gray-200 bg-white p-2 shadow"
      >
        <FcGoogle className="text-3xl" />
      </button>
      <button
        onClick={handleFacebookLogin}
        className="rounded-full border border-gray-200 bg-white p-2 shadow"
      >
        <img src={assets.iconsFacebook} alt="" width={30} />
      </button>
      <button
        onClick={handleGitHubLogin}
        className="rounded-full border border-gray-200 bg-white p-2 shadow"
      >
        <FaGithub className="text-3xl" />
      </button>
    </div>
  );
};
