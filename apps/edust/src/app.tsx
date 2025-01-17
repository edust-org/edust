import React, { Suspense } from "react"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { Toaster as ShadcnuiToaster } from "@/components/ui/toaster"
import router from "@/routes"
import { ErrorBoundary, GlobalLoading, ThemeProvider } from "@/components"
import { TooltipProvider } from "@/components/ui"

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<GlobalLoading />}>
        <ThemeProvider>
          <Toaster richColors />
          <ShadcnuiToaster />
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
