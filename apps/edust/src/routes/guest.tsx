import Loading from "@/components/loading"
import { InstituteDetails, Institutes } from "@/features"
import Authentication from "@/features/authentication"
import { AboutUs, ContactUs } from "@/pages"
import { Home } from "@/pages/home"
import { Suspense } from "react"
import { Route } from "react-router-dom"

export const guestRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Home.GuestHome />
        </Suspense>
      }
    />

    {/* For auth routes */}
    <Route path="/auth">
      <Route
        path="register"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.Register />
          </Suspense>
        }
      />
      <Route
        path="verify/:token"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.VerifyEmailByToken />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.Login />
          </Suspense>
        }
      />
      <Route
        path="forgot-password"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path="callback/:token"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.SocialAuthCallback />
          </Suspense>
        }
      />
    </Route>

    <Route
      path="/about-us"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <AboutUs />
        </Suspense>
      }
    />
    <Route
      path="/contact-us"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <ContactUs />
        </Suspense>
      }
    />
    <Route
      path="/institutes"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Institutes />
        </Suspense>
      }
    />
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
