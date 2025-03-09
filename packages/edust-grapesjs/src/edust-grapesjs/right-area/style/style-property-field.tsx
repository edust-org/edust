import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from "@/components/ui"
import { useEditor } from "@/edust-grapesjs/_react-wrapper"
import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs"
import { FaPlus } from "react-icons/fa"
import { IoIosClose, IoMdArrowDropupCircle } from "react-icons/io"
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md"

import * as React from "react"

import ColorInput from "./color-input"

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor()
  const handleChange = (value: string) => {
    prop.upValue(value)
  }

  const onChange = (ev: any) => {
    handleChange(ev.target.value)
  }

  const openAssets = () => {
    const { Assets } = editor
    Assets.open({
      select: (asset: any, complete: any) => {
        prop.upValue(asset.getSrc(), { partial: !complete })
        if (complete) {
          Assets.close()
        }
      },
      types: ["image"],
      accept: "image/*",
    })
  }

  const type = prop.getType()
  const defValue = prop.getDefaultValue()
  const canClear = prop.canClear()
  const hasValue = prop.hasValue()
  const value = prop.getValue()
  const valueString = hasValue ? value : ""
  const valueWithDef = hasValue ? value : defValue

  let inputToRender = (
    <Input placeholder={defValue} value={valueString} onChange={onChange} />
  )

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio
        inputToRender = (
          <RadioGroup defaultValue={value} onValueChange={handleChange}>
            {radioProp.getOptions().map((option) => (
              <div
                key={radioProp.getOptionId(option)}
                className="eg:flex eg:items-center eg:space-x-2"
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
        )
      }
      break
    case "select":
      {
        const selectProp = prop as PropertySelect
        inputToRender = (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="eg:w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectProp.getOptions().map((option) => {
                  const optionId = selectProp.getOptionId(option) || "outside"
                  const optionLabel =
                    selectProp.getOptionLabel(option) || "outside"
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
            value={valueString}
            onChange={onChange}
            valueWithDef={valueWithDef}
            onColorChange={(value) => handleChange(value)}
          />
        )
      }
      break
    case "slider":
      {
        const sliderProp = prop as PropertySlider

        inputToRender = (
          <Slider
            value={[parseFloat(value)]}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onValueChange={(e) => {
              handleChange(e[0].toString())
            }}
          />
        )
      }
      break
    case "file":
      {
        inputToRender = (
          <div className="eg:flex eg:flex-col eg:items-center eg:gap-3">
            {value && value !== defValue && (
              <div
                className="eg:inline-block eg:h-[50px] eg:w-[50px] eg:cursor-pointer eg:rounded eg:bg-cover eg:bg-center"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button
              type="button"
              onClick={openAssets}
              className="eg:w-full eg:rounded eg:border eg:px-2 eg:py-1"
            >
              Select Image
            </button>
          </div>
        )
      }
      break
    case "composite":
      {
        const compositeProp = prop as PropertyComposite
        inputToRender = (
          <div className="eg:flex eg:flex-wrap eg:rounded eg:border eg:border-slate-500 eg:bg-black/20 eg:p-2">
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        )
      }
      break
    case "stack":
      {
        const stackProp = prop as PropertyStack
        const layers = stackProp.getLayers()
        const isTextShadow = stackProp.getName() === "text-shadow"
        inputToRender = (
          <div
            className={
              "eg:flex eg:min-h-[54px] eg:flex-col eg:gap-2 eg:rounded eg:border eg:border-slate-500 eg:bg-black/20 eg:p-2"
            }
          >
            {layers.map((layer) => (
              <div
                key={layer.getId()}
                className="eg:rounded eg:border eg:border-slate-500"
              >
                <div className="eg:flex eg:items-center eg:gap-1 eg:bg-slate-800 eg:px-2 eg:py-1">
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
                  <button
                    className="eg:flex-grow"
                    onClick={() => layer.select()}
                  >
                    {layer.getLabel()}
                  </button>
                  <div
                    className={
                      "eg:flex eg:min-h-[17px] eg:min-w-[17px] eg:justify-center eg:bg-white eg:text-sm eg:text-black"
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
                  <div className="eg:flex eg:flex-wrap eg:p-2">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }
      break
  }

  return (
    <div
      {...rest}
      className={`eg:mb-3 eg:px-1 ${prop.isFull() ? "eg:w-full" : "eg:w-1/2"}`}
    >
      <div
        className={`eg:mb-2 eg:flex eg:items-center ${canClear && "eg:text-slate-500"}`}
      >
        <div className="eg:flex-grow eg:capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <IoIosClose />
          </button>
        )}
        {type === "stack" && (
          <Button
            size="icon"
            className="eg:!ml-2 eg:h-6 eg:w-6"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <FaPlus />
          </Button>
        )}
      </div>
      {inputToRender}
    </div>
  )
}
