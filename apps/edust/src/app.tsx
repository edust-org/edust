import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import { Toaster as ShadcnuiToaster } from "@/components/ui/toaster"
import router from "@/routes"
import { ErrorBoundary, GlobalLoading } from "@/components"
import { TooltipProvider } from "@/components/ui"
import axios from "./utils/axios"

const App: React.FC = () => {
  // Axios - Set default configurations
  axios()
  return (
    <ErrorBoundary>
      <Suspense fallback={<GlobalLoading />}>
        <Toaster richColors />
        <ShadcnuiToaster />
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
