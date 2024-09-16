import { Button } from "@/components/ui";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SocialAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v0/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v0/auth/github`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
        <FaGoogle className="mr-2" />
        Login With Google
      </Button>
      <Button className="w-full" variant="outline" onClick={handleGitHubLogin}>
        <FaGithub className="mr-2" />
        Login With Github
      </Button>
    </div>
  );
};
