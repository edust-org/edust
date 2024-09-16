import { setAuthentication } from "@/app/features";
import { useAppDispatch } from "@/app/hooks";
import { access_token } from "@/utils";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const SocialAuthCallback: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const token = params.access_token;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirectPath = location.state?.from?.pathname || "/";

    if (token) {
      access_token.setToken(token);
      dispatch(
        setAuthentication({
          isAuthenticated: true,
        }),
      );
      // Store the token securely
      if (access_token.hasToken()) {
        // Redirect to home or any other protected route
        navigate(redirectPath, { replace: true });
      }
    } else {
      // Redirect to login or home if token is not present
      navigate("/auth/sign-in", { replace: true });
    }
  }, [token, navigate, location.state?.from?.pathname, dispatch]);

  return <div>Loading...</div>;
};
