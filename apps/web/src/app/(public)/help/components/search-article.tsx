"use client"

import { Input } from "@edust/ui"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React from "react"

const FormSchema = z.object({
  name: z.string().trim(),
})
export const SearchArticle = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(searchParams)
    if (data.name) {
      params.set("q", data.name)
    } else {
      params.delete("q")
    }
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex max-w-xl gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search help articles..."
                    {...field}
                    className="h-10 bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"lg"}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </Form>
    </>
  )
}
