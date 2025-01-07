import { setAuthentication } from "@/app/features"
import { useAppDispatch } from "@/app/hooks"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import Cookies from "js-cookie"
import { toast } from "@/hooks/shadcn-ui"

export const SocialAuthCallback: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const token = params.token
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const redirectPath = location.state?.from?.pathname || "/"
    const data = JSON.parse(Cookies.get("user") || "{}")

    if (token && data) {
      dispatch(
        setAuthentication({
          isAuthenticated: true,
          isLoading: false,
          user: data?.data,
          auth: {
            token: data?.auth.token,
            expiresAt: data?.auth.expiresAt,
          },
        }),
      )

      toast({
        variant: "success",
        title: data?.message,
      })
      navigate(redirectPath, { replace: true })
    } else {
      // Redirect to login or home if token is not present
      navigate("/auth/sign-in", { replace: true })
    }
  }, [token, navigate, location.state?.from?.pathname, dispatch])

  return <div>Loading...</div>
}
