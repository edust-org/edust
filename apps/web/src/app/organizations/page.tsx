"use client"

import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import { Input } from "@/components/ui"

import { Header, Layout } from "./components/layout"

export default function Organizations() {
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Header>
          {/* <TopNav links={topNav} /> */}
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <NavbarRightMenus />
          </div>
        </Header>
      </Layout>
    </>
  )
}
