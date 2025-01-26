import { SelectorsResultProps } from "@grapesjs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  FormLabel,
  Badge,
  Typography,
  Separator,
} from "@/components/ui"
import {} from "@/components/ui"
import { useState } from "react"
import { Selector } from "@edust/grapesjs"
import { Plus, X } from "lucide-react"

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
    return <Typography className="eg-px-2">Not selected</Typography>
  }

  return (
    <>
      <div className="gjs-custom-selector-manager eg-flex eg-flex-col eg-gap-2 eg-p-2 eg-text-left">
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
                        <SelectTrigger className="!eg-h-8">
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

        <Typography className="eg-text-sm">
          <span className="eg-font-medium">Selected: </span>
          {targetStr}
        </Typography>
        {/* start Selectors List or classes */}
        <div className="eg-flex eg-flex-wrap eg-items-center eg-gap-1 eg-rounded eg-bg-muted eg-px-1 eg-py-2 eg-shadow-inner">
          {isShowInput ? (
            <Input
              placeholder="add new"
              className="eg-bg-white"
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
              className="eg-rounded eg-bg-primary eg-p-1.5 eg-text-primary-foreground"
              onClick={() => setIsShowInput(true)}
            >
              <Plus className="eg-h-4 eg-w-4" />
            </button>
          )}

          {/* show list of classes */}
          {selectors.map((selector: Selector) => (
            <Badge
              variant={"outline"}
              key={selector.toString()}
              className="eg-bg-white"
            >
              {selector.getLabel()}
              <X
                className="eg-ml-px eg-w-3 eg-cursor-pointer hover:eg-text-red-500"
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
