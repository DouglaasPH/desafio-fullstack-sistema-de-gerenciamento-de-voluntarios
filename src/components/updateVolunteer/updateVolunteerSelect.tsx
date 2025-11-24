// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  error?: string | null;
  onChange: (v: string) => void;
}

export function SelectField({
  label,
  value,
  options,
  error,
  onChange,
}: SelectFieldProps) {
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

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectField;
