import { Card } from "@/components/ui";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const NewSocialAuth = () => {
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
    <div className="flex items-center flex-col md:flex-row justify-center gap-4">
      <Card
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="text-xl" />
        <p className="font-semibold">Join With Google</p>
      </Card>
      <Card
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input"
        onClick={handleGitHubLogin}
      >
        <FaGithub className="text-xl" />
        <p className="font-semibold">Join With Github</p>
      </Card>
    </div>
  );
};
