import { useState, useEffect } from "react";
import { Input } from "@/components/ui";

const ColorInput = ({
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

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="w-full flex items-center ">
      <div className="flex items-center gap-1">
        <div
          className={`w-9 h-9 border cursor-pointer relative rounded`}
          style={{
            backgroundColor: color,
          }}
        >
          <Input
            type="color"
            value={valueWithDef}
            onChange={handleColorChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
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
