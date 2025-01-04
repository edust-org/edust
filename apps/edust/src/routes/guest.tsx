import Loading from "@/components/loading"
import { InstituteDetails, Institutes } from "@/features"
import Authentication from "@/features/authentication"
import { AboutUs, ContactUs } from "@/pages"
import { Home } from "@/pages/home"
import { Suspense } from "react"
import { Route } from "react-router-dom"

export const guestRoutes = (
  <Route>
    <Route path="/" element={<Home.GuestHome />} />

    {/* For auth routes */}
    <Route path="/auth">
      <Route path="register" element={<Authentication.Register />} />
      <Route
        path="verify/:token"
        element={<Authentication.VerifyEmailByToken />}
      />
      <Route path="login" element={<Authentication.Login />} />
      <Route
        path="forgot-password"
        element={<Authentication.ForgotPassword />}
      />

      <Route
        path="callback/:token"
        element={<Authentication.SocialAuthCallback />}
      />
    </Route>

    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/institutes" element={<Institutes />} />
    <Route
      path="/institutes/:id"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <InstituteDetails />
        </Suspense>
      }
    />
  </Route>
)
