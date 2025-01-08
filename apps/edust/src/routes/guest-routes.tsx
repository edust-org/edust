import { ComingSoon } from "@/components"
import Loading from "@/components/loading"
import { InstituteDetails, Institutes, Site } from "@/features"
import Authentication from "@/features/authentication"
import { AboutUs, ContactUs } from "@/pages"
import { Suspense } from "react"
import { Route } from "react-router"

export default (
  <>
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
    <Route path="/u/:orgIdOrUsername/site" element={<Site />} />
    <Route path="/institutes" element={<Institutes />} />
    <Route
      path="/institutes/:id"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <InstituteDetails />
        </Suspense>
      }
    />

    <Route path="/feedback" element={<ComingSoon />} />
    <Route path="/help-center" element={<ComingSoon />} />
    <Route path="/contact-support" element={<ComingSoon />} />
  </>
)
