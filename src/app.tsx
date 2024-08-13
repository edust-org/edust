import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/auth";
import Loading from "./components/loading";
import { RouterProvider } from "react-router-dom";
import { useUserGetQuery } from "@/app/api/v0/user";
import { Toaster } from "@/components/ui/toaster";
import router from "@/routes";
import { ErrorBoundary } from "@/components";
import { useCheckingAuth } from "./hooks";

const App: React.FC = () => {
  useCheckingAuth();

  return (
    <Suspense fallback={<Loading.Spinner />}>
      <ErrorBoundary>
        <Toaster />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
