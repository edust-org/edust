import * as React from "react";
import { useEditor } from "@grapesjs/react";
import type { Trait } from "grapesjs";
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
} from "@/components/ui";
import ColorInput from "./color-input";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get("command");
    if (command) {
      typeof command === "string"
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== "undefined" ? value : defValue;

  let inputToRender = (
    <Input placeholder={defValue} value={value} onChange={onChange} />
  );

  switch (type) {
    case "select":
      {
        inputToRender = (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {trait.getOptions().map((option) => {
                  const optionId = trait.getOptionId(option) || "outside";
                  const optionLabel = trait.getOptionLabel(option) || "outside";
                  return (
                    <SelectItem key={optionId} value={optionId}>
                      {optionLabel}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }
      break;
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
        );
      }
      break;
    case "checkbox":
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onCheckedChange={(ev) => trait.setValue(ev)}
          />
        );
      }
      break;
    case "button":
      {
        inputToRender = (
          <Button className="w-full" onClick={handleButtonClick}>
            {trait.getLabel()}
          </Button>
        );
      }
      break;
  }

  return (
    <div {...rest} className="mb-3 w-full px-1">
      <div className={"mb-2 flex items-center"}>
        <div className="flex-grow capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  );
}
