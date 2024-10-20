import { SelectorsResultProps } from "@grapesjs/react";
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Button,
  Input,
} from "@/components/ui";
import {} from "@/components/ui";
import { useState } from "react";

const FormSchema = z.object({
  state: z
    .string({
      required_error: "Please select an state to display.",
    })
    .default("DEFAULT ID"),
});

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, "Container">) {
  const targetStr = targets.join(", ");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
  }

  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="gjs-custom-selector-manager flex flex-col gap-2 p-2 text-left">
      <div className="flex items-center">
        <div className="flex-grow">Selectors</div>
        <Form {...form}>
          <form
            onChange={(e) => {
              setState(e.target.value);
            }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={selectedState}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedState} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
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

      {/* start Selectors List or classes */}
      <div
        className={
          "flex min-h-[45px] flex-wrap items-center gap-2 rounded border border-slate-500 bg-slate-200 p-2"
        }
      >
        {targetStr ? (
          <>
            {isShowInput ? (
              <Input
                placeholder="Custom class"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    addSelector({
                      name: e?.target?.value,
                      label: e?.target?.value,
                    });
                    setIsShowInput(false);
                  }
                }}
                onBlur={() => setIsShowInput(false)}
              />
            ) : (
              <Button
                type="button"
                onClick={() => setIsShowInput(true)}
                className={"h-6 w-6 rounded border"}
                size="icon"
              >
                <FaPlus />
              </Button>
            )}
          </>
        ) : (
          <div className="opacity-70">Select a component</div>
        )}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className="flex items-center gap-1 whitespace-nowrap rounded bg-slate-500 px-2 py-1 text-white"
          >
            <div className="whitespace-pre-wrap break-all">
              {selector.getLabel()}
            </div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <IoIosClose />
            </button>
          </div>
        ))}
      </div>
      {/* end Selectors List or classes */}

      <div>
        Selected: <span className="opacity-70">{targetStr || "None"}</span>
      </div>
    </div>
  );
}
