"use client"

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components/ui"
import { MultipleSelector, Option } from "@/components/ui/manual"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { cn } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useEffect, useState } from "react"

const OPTIONS: Option[] = [
  { label: "Bug Report", value: "bug" },
  { label: "Feature Request", value: "feature" },
  { label: "Suggestion", value: "suggestion" },
  { label: "Other", value: "other" },
]

const FormSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  userId: z.string().trim().optional(),
  improvementAreas: z.array(z.string().min(1)).nonempty(),
  comments: z.string().trim().min(1),
})

export const Feedback = ({ className }: { className?: string }) => {
  const { data } = useSession()
  const userId = data?.user.id

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: 0,
      userId: "",
      improvementAreas: [],
      comments: "",
    },
  })

  const [value, setValue] = useState<Option[]>([])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.userId) {
      delete data.userId
    }

    try {
      const response = await axios.post(
        `${defaultValues.backendURL}/api/v0/public/feedback`,
        data,
      )

      form.reset()
      setValue([])

      toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  useEffect(() => {
    if (userId) {
      form.setValue("userId", userId)
    }
    if (value.length > 0) {
      const getImprovementAreas: string[] = value.map((v) => v.value)

      if (getImprovementAreas.length > 0) {
        form.setValue("improvementAreas", getImprovementAreas)
        form.clearErrors("improvementAreas")
      }
    } else {
      form.setValue("improvementAreas", [""])
      form.setError("improvementAreas", {
        message: "At least one suggestion required",
      })
    }
  }, [form, userId, value])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Rate from 1 to 5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MultipleSelector
          value={value}
          onChange={setValue}
          defaultOptions={OPTIONS}
          placeholder="Type something that does not exist in dropdowns..."
          creatable
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
        {form.formState.errors?.improvementAreas?.message && (
          <p
            data-slot="form-message"
            id="«r0»-form-item-message"
            className="text-destructive-foreground text-sm"
          >
            {form.formState.errors?.improvementAreas?.message}
          </p>
        )}

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Send</Button>
      </form>
    </Form>
  )
}
