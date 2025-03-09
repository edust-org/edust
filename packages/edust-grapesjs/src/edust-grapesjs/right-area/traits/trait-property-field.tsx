import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { useEditor } from "@/edust-grapesjs/_react-wrapper"
import type { Trait } from "grapesjs"

import * as React from "react"

import ColorInput from "./color-input"

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor()
  const handleChange = (value: string) => {
    trait.setValue(value)
  }

  const onChange = (ev: any) => {
    handleChange(ev.target.value)
  }

  const handleButtonClick = () => {
    const command = (trait as any).get("command")
    if (command) {
      if (typeof command === "string") {
        editor.runCommand(command)
      } else {
        command(editor, trait)
      }
    }
  }

  const type = trait.getType()
  const defValue =
    trait.getDefault() ||
    (trait as any).getDefault() ||
    (trait as any)?.attributes?.placeholder
  const value = trait.getValue()
  const valueWithDef = typeof value !== "undefined" ? value : defValue

  let inputToRender = (
    <Input placeholder={defValue} value={value} onChange={onChange} />
  )

  switch (type) {
    case "select":
      {
        inputToRender = (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="eg:w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {trait.getOptions().map((option) => {
                  const optionId = trait.getOptionId(option) || "outside"
                  const optionLabel = trait.getOptionLabel(option) || "outside"
                  return (
                    <SelectItem key={optionId} value={optionId}>
                      {optionLabel}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }
      break
    case "color":
      {
        inputToRender = (
          <ColorInput
            placeholder={defValue}
            value={value}
            onChange={onChange}
            valueWithDef={valueWithDef}
            onColorChange={(value) => handleChange(value)}
          />
        )
      }
      break
    case "checkbox":
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onCheckedChange={(ev) => trait.setValue(ev)}
          />
        )
      }
      break
    case "button":
      {
        inputToRender = (
          <Button className="eg:w-full" onClick={handleButtonClick}>
            {trait.getLabel()}
          </Button>
        )
      }
      break
  }

  return (
    <div {...rest} className="eg:mb-3 eg:w-full eg:px-1">
      <div className="eg:mb-2 eg:flex eg:items-center">
        <div className="eg:flex-grow eg:capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  )
}
