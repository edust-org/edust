import {
  Badge,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Typography,
} from "@/components/ui"
import { SelectorsResultProps } from "@/edust-grapesjs/_react-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Selector } from "grapesjs"
import { Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useState } from "react"

const FormSchema = z.object({
  state: z
    .string({
      required_error: "Please select an state to display.",
    })
    .default("DEFAULT ID"),
})

export const Selectors = ({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, "Container">) => {
  const targetStr = targets.join(", ")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [isShowInput, setIsShowInput] = useState(false)

  if (!targetStr) {
    return <Typography className="px-2">Not selected</Typography>
  }

  return (
    <>
      <div className="gjs-custom-selector-manager flex flex-col gap-2 p-2 text-left">
        <div>
          <Form {...form}>
            <form
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                if (target.value === "-state-") {
                  setState("")
                } else {
                  setState(target.value)
                }
              }}
            >
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selectors</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={selectedState}
                    >
                      <FormControl>
                        <SelectTrigger className="eg:!h-8">
                          <SelectValue
                            placeholder={selectedState || "-state-"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          {
                            id: "-state-",
                            getName() {
                              return "-state-"
                            },
                          },
                          ...states,
                        ].map((state) => (
                          <SelectItem value={state.id as string} key={state.id}>
                            {state.getName()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <Typography className="eg:text-sm">
          <span className="eg:font-medium">Selected: </span>
          {targetStr}
        </Typography>
        {/* start Selectors List or classes */}
        <div className="eg:bg-muted eg:flex eg:flex-wrap eg:items-center eg:gap-1 eg:rounded eg:px-1 eg:py-2 eg:shadow-inner">
          {isShowInput ? (
            <Input
              placeholder="add new"
              className="eg:bg-white"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  const target = e.target as HTMLInputElement
                  addSelector({
                    name: target.value,
                    label: target.value,
                  })
                  setIsShowInput(false)
                }
              }}
              onBlur={() => setIsShowInput(false)}
            />
          ) : (
            <button
              className="eg:bg-primary eg:text-primary-foreground eg:rounded eg:p-1.5"
              onClick={() => setIsShowInput(true)}
            >
              <Plus className="eg:h-4 eg:w-4" />
            </button>
          )}

          {/* show list of classes */}
          {selectors.map((selector: Selector) => (
            <Badge
              variant={"outline"}
              key={selector.toString()}
              className="eg:bg-white"
            >
              {selector.getLabel()}
              <X
                className="eg:ml-px eg:w-3 eg:cursor-pointer eg:hover:text-red-500"
                onClick={() => removeSelector(selector)}
              />
            </Badge>
          ))}
        </div>

        {/* end Selectors List or classes */}
      </div>

      <Separator />
    </>
  )
}
