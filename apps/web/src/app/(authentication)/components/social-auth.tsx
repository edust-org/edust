import { defaultValues } from "@/configs"
import { Button } from "@edust/ui"
import { FaGithub, FaGoogle } from "react-icons/fa"

export const SocialAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${defaultValues.backendURL}/api/v0/auth/google`
  }

  const handleGitHubLogin = () => {
    window.location.href = `${defaultValues.backendURL}/api/v0/auth/github`
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
        <FaGoogle className="mr-2" />
        Login With Google
      </Button>
      <Button className="w-full" variant="outline" onClick={handleGitHubLogin}>
        <FaGithub className="mr-2" />
        Login With Github
      </Button>
    </div>
  )
}
