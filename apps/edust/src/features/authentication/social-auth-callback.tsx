import { setAuthentication } from "@/app/features"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import Cookies from "js-cookie"
import { toast } from "sonner"

export const SocialAuthCallback: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const token = params.token
  const navigate = useNavigate()
  const location = useLocation()
  const authState = useAppSelector((state) => state.authentication)

  useEffect(() => {
    const redirectPath = location.state?.from?.pathname || "/"
    const data = JSON.parse(Cookies.get("user") || "{}")

    if (token && data) {
      dispatch(
        setAuthentication({
          ...authState,
          isAuthenticated: true,
          isLoading: false,
          user: data?.data,
          auth: {
            token: data?.auth.token,
            expiresAt: data?.auth.expiresAt,
          },
        }),
      )

      toast.success(data?.message)
      navigate(redirectPath, { replace: true })
    } else {
      // Redirect to login or home if token is not present
      navigate("/auth/login", { replace: true })
    }
  }, [token, navigate, location.state?.from?.pathname, dispatch])

  return <div>Loading...</div>
}
