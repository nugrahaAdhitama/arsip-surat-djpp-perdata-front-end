import { convertToDefaultDateValue } from "@/utils/time";
import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  value: any;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  values?: { id: number; name: string }[];
  width: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  values,
  width,
}) => {
  return (
    <>
      <div className={`relative ${width == "half" ? "w-[50%]" : "w-full"}`}>
        <label htmlFor={label} className="block text-base text-primary">
          {label}
        </label>
        <textarea
          id={label}
          placeholder={placeholder}
          value={value}
          name={name}
          className="w-full focus:outline-primary pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4 text-primary placeholder:text-tersier"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TextArea;
