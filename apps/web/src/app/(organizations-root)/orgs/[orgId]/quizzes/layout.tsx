"use client"

import { Layout } from "../../components/layout"

type QuizzesLayoutProps = {
  children: React.ReactNode
}

export default function QuizzesLayout({ children }: QuizzesLayoutProps) {
  return <Layout>{children}</Layout>
}
