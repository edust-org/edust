import { ticketHooks } from "@/hooks/react-query"
import { SupportTicketStatus } from "@edust/types"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import React from "react"

const FormSchema = z.object({
  status: z.nativeEnum(SupportTicketStatus),
})

type ChangeStatus = {
  status: SupportTicketStatus
  ticketId: string
}

export const ChangeStatus: React.FC<ChangeStatus> = ({ status, ticketId }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status,
    },
  })

  const changeStatus = ticketHooks.usePatchTicket()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    changeStatus
      .mutateAsync({
        ticketId,
        body: {
          status: data.status,
        },
      })
      .then((response) => {
        if (response.status === "SUCCESS") {
          toast.success(response.message)
        }
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuLabel className="p-0">Change Status</DropdownMenuLabel>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(SupportTicketStatus).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
