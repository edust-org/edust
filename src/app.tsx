/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Loading from "./components/loading";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import router from "@/routes";
import { ErrorBoundary, ThemeProvider } from "@/components";
import { useCheckingUserSession } from "./hooks";
import { TooltipProvider } from "@/components/ui";

const App: React.FC = () => {
  // ! IN THIS HOOKS HAVE A ISSUE IF USER NOT SIGN-IN
  useCheckingUserSession();

  return (
    <Suspense fallback={<Loading.Spinner />}>
      <ErrorBoundary>
        <Toaster />

        <ThemeProvider>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default React.memo(App);
