import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import router from "@/routes";
import { ErrorBoundary, GlobalLoading } from "@/components";
import { TooltipProvider } from "@/components/ui";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<GlobalLoading />}>
        <Toaster />
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
