"use client"

import { Loading } from "@/components"
import { useGetOrgSitesByUsernameQuery } from "@/lib/store/api/v0/public"
import { useParams, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { useEffect, useState } from "react"

import notFoundData from "./not-found-data.json"

export default function Site() {
  const params = useParams()
  const searchParams = useSearchParams()

  const filters = searchParams.get("name")
    ? `name=${searchParams.get("name")}`
    : `name=home`

  const { data, isLoading, error } = useGetOrgSitesByUsernameQuery({
    orgUsername: params.orgIdOrUsername,
    filters,
  })

  const [content, setContent] = useState(null)

  useEffect(() => {
    if (data?.data?.items[0]) {
      setContent(data?.data?.items[0])
    }
    if (error?.data?.status) {
      toast.error({
        title: error?.data?.message,
      })
    }
  }, [data?.data?.items, error?.data?.message, error?.data?.status])

  const [isTailwindLoaded, setTailwindLoaded] = useState(false)

  useEffect(() => {
    const handleLoad = () => setTailwindLoaded(true)

    const tailwindScript = document.createElement("script")
    tailwindScript.src = "https://cdn.tailwindcss.com?v=3.4.5"
    tailwindScript.async = true
    tailwindScript.onload = handleLoad
    document.head.appendChild(tailwindScript)

    // Cleanup function to remove the script
    return () => {
      document.head.removeChild(tailwindScript)
    }
  }, [])

  useEffect(() => {
    if (isTailwindLoaded && content?.css) {
      // By default tailwindcss available but when we use components we need cdn
      const style = document.createElement("style")
      style.type = "text/css"
      style.innerHTML = content.css
      style.setAttribute("data-dynamic", "true")
      document.head.appendChild(style)
    }
  }, [isTailwindLoaded, content?.css])

  if (isLoading) {
    return <Loading.Spinner />
  }

  return (
    <>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content?.html }}></div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: notFoundData.html }}></div>
      )}
    </>
  )
}
