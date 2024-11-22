import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import { Input } from "@/components/ui"

import { Layout } from "@/organizations/components/layout"
import { Helmet } from "react-helmet-async"

import { Trash2, Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export const AccessControl = () => {
  //
  const users = [
    { id: 1, name: "Organizer", role: "OWNER" },
    { id: 2, name: "Isabel Balistreri", role: "EDITOR" },
    { id: 3, name: "James Daugherty", role: "EDITOR" },
  ]

  return (
    <>
      <Layout>
        <Helmet>
          <title>Access Controll | Edust</title>
          <meta
            name="description"
            content="Edust is a powerful and flexible platform for building and managing websites."
          />
          <meta property="og:title" content="Access Controll | Edust" />
          <meta
            property="og:description"
            content="Edust is a powerful and flexible platform for building and managing websites."
          />
        </Helmet>
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
            <div className="">
              <div className="mb-6 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Manage access</h2>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add a new user</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-start">
                        Find user
                      </DialogTitle>
                      <DialogDescription className="text-start text-sm">
                        Search by name and add a new access controller for this
                        organization.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative mb-4">
                      <Input
                        placeholder="Search user by name"
                        className="dark:border-inherit"
                      />
                      <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      {users?.map((user) => (
                        <div
                          key={user?.id}
                          className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <span className="text-sm font-medium">
                            {user?.name}
                          </span>
                          <Button>Add as a editor</Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-inherit">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="pr-9 text-right">Role</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user?.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {user?.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-medium">
                            {user?.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Trash2 className="h-4 w-4 cursor-pointer text-red-500 hover:text-red-600" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </Layout.Body>
      </Layout>
    </>
  )
}
