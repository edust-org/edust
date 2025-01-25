import { useState, useEffect } from "react"
import { Input } from "@/components/ui"

type ColorInputProps = {
  placeholder: string
  value: string
  onChange: (ev: any) => void
  valueWithDef: string
  onColorChange: (color: string) => void
}

const ColorInput: React.FC<ColorInputProps> = ({
  placeholder,
  value,
  onChange,
  valueWithDef,
  onColorChange,
}) => {
  const [color, setColor] = useState(valueWithDef || "#ffffff")

  // Update local color state when valueWithDef changes
  useEffect(() => {
    setColor(valueWithDef)
  }, [valueWithDef])

  const handleColorChange = (event: any) => {
    const newColor = event.target.value
    setColor(newColor)
    onColorChange(newColor)
  }

  return (
    <div className="eg-flex eg-w-full eg-items-center">
      <div className="eg-flex eg-items-center eg-gap-1">
        <div
          className={`eg-relative eg-h-9 eg-w-9 eg-cursor-pointer eg-rounded eg-border`}
          style={{
            backgroundColor: color,
          }}
        >
          <Input
            type="color"
            value={valueWithDef}
            onChange={handleColorChange}
            className="eg-absolute eg-h-full eg-w-full eg-cursor-pointer eg-opacity-0"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="eg-w-full eg-flex-1"
        />
      </div>
    </div>
  )
}

export default ColorInput
