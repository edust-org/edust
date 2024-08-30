import * as React from "react";
import { useEditor } from "@grapesjs/react";
import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";

import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoIosClose, IoMdArrowDropupCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

import ColorInput from "./color-input";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Label,
  Slider,
} from "@/components/ui";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <Input placeholder={defValue} value={valueString} onChange={onChange} />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <RadioGroup defaultValue={value} onValueChange={handleChange}>
            {radioProp.getOptions().map((option) => (
              <div
                key={radioProp.getOptionId(option)}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={radioProp.getOptionId(option)}
                  id={radioProp.getOptionId(option)}
                />
                <Label htmlFor={radioProp.getOptionId(option)}>
                  {radioProp.getOptionLabel(option)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectProp.getOptions().map((option) => {
                  const optionId = selectProp.getOptionId(option) || "outside";
                  const optionLabel =
                    selectProp.getOptionLabel(option) || "outside";
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
            value={valueString}
            onChange={onChange}
            valueWithDef={valueWithDef}
            onColorChange={(value) => handleChange(value)}
          />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;

        inputToRender = (
          <Slider
            value={[parseFloat(value)]}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onValueChange={(e) => {
              handleChange(e[0].toString());
            }}
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="inline-block h-[50px] w-[50px] cursor-pointer rounded bg-cover bg-center"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button
              type="button"
              onClick={openAssets}
              className={"w-full rounded border px-2 py-1"}
            >
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div
            className={
              "flex flex-wrap rounded border border-slate-500 bg-black/20 p-2"
            }
          >
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div
            className={
              "flex min-h-[54px] flex-col gap-2 rounded border border-slate-500 bg-black/20 p-2"
            }
          >
            {layers.map((layer) => (
              <div
                key={layer.getId()}
                className={"rounded border border-slate-500"}
              >
                <div className="flex items-center gap-1 bg-slate-800 px-2 py-1">
                  <Button
                    size="icon"
                    onClick={() => layer.move(layer.getIndex() - 1)}
                  >
                    <IoMdArrowDropupCircle />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => layer.move(layer.getIndex() + 1)}
                  >
                    <MdOutlineArrowDropDownCircle />
                  </Button>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={
                      "flex min-h-[17px] min-w-[17px] justify-center bg-white text-sm text-black"
                    }
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <Button size="icon" onClick={() => layer.remove()}>
                    <MdDelete />
                  </Button>
                </div>
                {layer.isSelected() && (
                  <div className="flex flex-wrap p-2">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div
      {...rest}
      className={`mb-3 px-1 ${prop.isFull() ? "w-full" : "w-1/2"}`}
    >
      <div className={`mb-2 flex items-center ${canClear && "text-slate-500"}`}>
        <div className="flex-grow capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <IoIosClose />
          </button>
        )}
        {type === "stack" && (
          <Button
            size="icon"
            className="!ml-2 h-6 w-6"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <FaPlus />
          </Button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
