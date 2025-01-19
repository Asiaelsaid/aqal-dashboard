import React from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  hint,
}) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type="password"
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    />
    {hint && <p className="text-sm text-gray-500 mt-2">{hint}</p>}
  </div>
);

export default PasswordInput;
