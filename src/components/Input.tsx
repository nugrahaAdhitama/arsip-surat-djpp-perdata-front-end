import { convertToDefaultDateValue } from "@/utils/time";
import React from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isSelect?: boolean;
  values?: { id: number; name: string }[];
  width: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  isSelect = false,
  values = [],
  width = "half",
}) => {
  return (
    <>
      {type !== "file" ? (
        <div className={`relative ${width == "half" ? "w-[50%]" : "w-full"}`}>
          <label htmlFor={label} className="block text-base text-gray-400">
            {label}
          </label>
          {!isSelect ? (
            <input
              type={type}
              id={label}
              placeholder={placeholder}
              className="w-full focus:outline-none pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4 text-primary placeholder:text-tersier"
              name={name}
              value={type == "date" ? convertToDefaultDateValue(value) : value}
              onChange={onChange}
              required
            />
          ) : (
            <div className="w-full focus:outline-none pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4">
              <select
                id={label}
                name={name}
                className="h-full rounded-md border-0 bg-transparent py-0 text-gray-400 focus:outline-none focus:ring-0 w-full sm:text-base"
                value={value}
                onChange={onChange}
              >
                <option>Choose {label}</option>
                {values.map(
                  (value: { id: number; name: string }, index: number) => (
                    <>
                      {name == "division_id" ||
                      name == "category_id" ||
                      name == "type_id" ? (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      ) : (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      )}
                    </>
                  )
                )}
              </select>
            </div>
          )}
        </div>
      ) : (
        <fieldset className="space-y-1 dark:text-gray-100">
          <label htmlFor={label} className="block text-base text-gray-400">
            {label}
          </label>
          <div className="flex">
            <input
              type={type}
              name={name}
              id={label}
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary ${
                width == "half" ? "w-[50%]" : "w-full"
              }`}
              onChange={onChange}
            />
          </div>
        </fieldset>
      )}
    </>
  );
};

export default Input;
