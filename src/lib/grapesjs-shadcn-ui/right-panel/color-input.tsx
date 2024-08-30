import { useState, useEffect } from "react";
import { Input } from "@/components/ui";

type ColorInputProps = {
  placeholder: string;
  value: string;
  onChange: (ev: any) => void;
  valueWithDef: string;
  onColorChange: (color: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({
  placeholder,
  value,
  onChange,
  valueWithDef,
  onColorChange,
}) => {
  const [color, setColor] = useState(valueWithDef || "#ffffff");

  // Update local color state when valueWithDef changes
  useEffect(() => {
    setColor(valueWithDef);
  }, [valueWithDef]);

  const handleColorChange = (event: any) => {
    const newColor = event.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center gap-1">
        <div
          className={`relative h-9 w-9 cursor-pointer rounded border`}
          style={{
            backgroundColor: color,
          }}
        >
          <Input
            type="color"
            value={valueWithDef}
            onChange={handleColorChange}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full flex-1"
        />
      </div>
    </div>
  );
};

export default ColorInput;
