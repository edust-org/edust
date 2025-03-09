"use client"

import { ComingSoon } from "@/components"
import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import { Input } from "@/components/ui"

import { Layout } from "./components/layout"

export default function Organizations() {
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          {/* <TopNav links={topNav} /> */}
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <NavbarRightMenus />
          </div>
        </Layout.Header>
        <Layout.Body>
          <ComingSoon className={"h-[calc(100vh-120px)]"} />
        </Layout.Body>
      </Layout>
    </>
  )
}
