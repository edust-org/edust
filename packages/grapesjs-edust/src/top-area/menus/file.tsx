import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
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
} from "@/components/ui"
import { usePageContext } from "@/context/page"
import { useEditor } from "@grapesjs/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  pageName: z.string().min(2, {
    message: "Page name must be at least 2 characters.",
  }),
})

export const File = () => {
  const { addANewPage } = usePageContext()
  const editor = useEditor()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pageName: "",
    },
  })

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="eg-relative">File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className="eg-w-[230px]">
              {/* <MenubarItem>
                Page <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem> */}

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="eg-flex eg-w-full eg-cursor-auto eg-items-center eg-rounded-sm eg-px-2 eg-py-1.5 eg-text-sm hover:eg-bg-slate-50">
                  <span>Page</span> <MenubarShortcut>⌘N</MenubarShortcut>
                </DialogTrigger>
                <DialogContent className="sm:eg-max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create a new page</DialogTitle>
                    <DialogDescription>
                      Make a new page here. Click create new when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(
                        async (data: z.infer<typeof FormSchema>) => {
                          const isAdded = await addANewPage(data, editor)
                          if (isAdded) {
                            form.reset()
                            setOpen(false)
                          }
                        },
                      )}
                      className="eg-space-y-6"
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
                              Do not use any space use - and small lattes.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Create new</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <MenubarItem disabled>
                Playlist from Selection <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Playlist Folder</MenubarItem>
              <MenubarItem disabled>Genius Playlist</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem disabled>
            Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Library</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem disabled>Update Cloud Library</MenubarItem>
              <MenubarItem disabled>Update Genius</MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>Organize Library...</MenubarItem>
              <MenubarItem disabled>Export Library...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>Import Playlist...</MenubarItem>
              <MenubarItem disabled>Export Playlist...</MenubarItem>
              <MenubarItem disabled>Show Duplicate Items</MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>Get Album Artwork</MenubarItem>
              <MenubarItem disabled>Get Track Names</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem disabled>
            Import... <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
          </MenubarItem>
          <MenubarItem disabled>Convert</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Page Setup...</MenubarItem>
          <MenubarItem disabled>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </>
  )
}
