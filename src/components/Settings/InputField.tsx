import React from "react";

interface TextInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  prefix?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value = "",
  type = "text",
  placeholder,
  onChange,
  icon,
  prefix,
}) => {
  return (
    <div className="flex items-center w-full rounded-md shadow-sm">
      {prefix && (
        <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 text-sm border border-gray-300 rounded-l-md">
          {prefix}
        </span>
      )}
      {icon && (
        <span className="inline-flex items-center px-3 text-gray-600 border border-gray-300">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
