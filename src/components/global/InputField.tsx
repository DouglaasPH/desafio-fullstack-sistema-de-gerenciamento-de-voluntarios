// shadcn
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  error?: string | null;
  onChange: (v: string) => void;
  onBlur?: () => void;
}

function InputField({
  label,
  value,
  placeholder,
  type = "text",
  error,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex gap-3 items-center">
        <label className="text-sm text-gray-800">{label}</label>
        {error && (
          <span className="text-[0.6rem] bg-red-500 text-white px-3 py-1 rounded-md">
            {error}
          </span>
        )}
      </div>

      <Input
        type={type}
        placeholder={placeholder}
        className="placeholder:text-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputField;
