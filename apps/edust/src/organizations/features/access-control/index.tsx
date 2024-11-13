import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import { Input, Typography } from "@/components/ui"

import { Layout } from "@/organizations/components/layout"

export const AccessControl = () => {
  return (
    <>
      <Layout>
        <Layout.Header>
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
          <section className="mb-4">
            <Typography variant="h1">Access Control</Typography>
          </section>
        </Layout.Body>
      </Layout>
    </>
  )
}
