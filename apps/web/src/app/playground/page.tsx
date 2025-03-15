"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"

import { useEffect } from "react"

export default function Playground() {
  useEffect(() => {
    axios
      .get(
        `${defaultValues.backendURL}/api/v0/administrator/users
`,
      )
      .then((res) => {
        console.log(res)
      })
  }, [])

  return <>Playground</>
}
