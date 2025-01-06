import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui"
import { ChevronRight, Edit, StickyNote, Trash2 } from "lucide-react"
import { PagesResultProps, useEditor } from "@grapesjs/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { usePageContext } from "@/context/page"

const FormSchema = z.object({
  pageName: z.string().min(2, {
    message: "Page name must be at least 2 characters.",
  }),
})

export const Pages = ({
  pages,
  remove,
  select,
  selected,
}: PagesResultProps) => {
  const { deletePage, editPageName } = usePageContext()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pageName: "",
    },
  })
  const editor = useEditor()
  return (
    <>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CollapsibleTrigger>
              <StickyNote className="me-1" /> Pages
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenuSub>
              {pages.map((page, index) => {
                const pageName = page?.attributes?.name || "unknown page"
                if (index == 0) {
                  return (
                    <SidebarMenuButton
                      key={page.getId()}
                      className="data-[active=true]:bg-transparent"
                    >
                      <span
                        className="flex-grow capitalize"
                        onClick={() => select(page)}
                      >
                        {pageName}
                      </span>
                    </SidebarMenuButton>
                  )
                }
                return (
                  <SidebarMenuButton
                    key={page.getId()}
                    className="data-[active=true]:bg-transparent"
                  >
                    <span
                      className="flex-grow capitalize"
                      onClick={() => select(page)}
                    >
                      {pageName}
                    </span>
                    {selected !== page && (
                      <>
                        <Dialog
                          open={open}
                          onOpenChange={(open) => {
                            setOpen(open)
                            if (open) {
                              form.setValue("pageName", pageName)
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Edit className="ml-auto w-4 transition-colors hover:text-primary" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit page name</DialogTitle>
                              <DialogDescription>
                                Make changes to your page name here. Click save
                                when you're done.
                              </DialogDescription>
                            </DialogHeader>

                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(
                                  async (data: z.infer<typeof FormSchema>) => {
                                    const isEdited = await editPageName({
                                      pageName: data.pageName.toLocaleLowerCase(),
                                      page,
                                      pages,
                                      editor,
                                    })

                                    if (isEdited) {
                                      setOpen(false)
                                    }

                                    // if (pageName === data.pageName) {
                                    //   return toast.error("same name provided!")
                                    // }
                                    // page.set("name", data.pageName)

                                    // toast.success("successfully name changed!")
                                    // setOpen(false)
                                  },
                                )}
                                className="space-y-6"
                              >
                                <FormField
                                  control={form.control}
                                  name="pageName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Page Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="name" {...field} />
                                      </FormControl>
                                      <FormDescription>
                                        Do not use any space use - and small
                                        lattes.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit">Save changes</Button>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Trash2 className="ml-auto w-4 transition-colors hover:text-destructive" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your {pageName} page and
                                remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  await deletePage({
                                    page,
                                    editor,
                                    removePage: remove,
                                  })
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </SidebarMenuButton>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  )
}
