import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormRegister, Path } from "react-hook-form";
import { FormData } from "@/app/types/types";

interface InputFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<FormData>;
  path: Path<FormData>;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  className?: string;
}

interface TextareaFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<FormData>;
  path: Path<FormData>;
  rows?: number;
  className?: string;
}

interface SelectFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<FormData>;
  path: Path<FormData>;
  options: string[];
  required?: boolean;
  className?: string;
}

interface CheckboxFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<FormData>;
  path: Path<FormData>;
  className?: string;
}

export function InputField({
  label,
  id,
  register,
  path,
  required = false,
  type = "text",
  disabled = false,
  className = "",
}: InputFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-cv-subheading font-medium">
        {label}
        {required && <span className="text-cv-accent ml-1">*</span>}
      </Label>
      <Input
        id={id}
        {...register(path, { required })}
        type={type}
        disabled={disabled}
        className="mt-1 border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
      />
    </div>
  );
}

export function TextareaField({
  label,
  id,
  register,
  path,
  rows = 3,
  className = "",
}: TextareaFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-cv-subheading font-medium">
        {label}
      </Label>
      <Textarea
        id={id}
        {...register(path)}
        rows={rows}
        className="mt-1 border-cv-border focus:border-cv-accent focus:ring-cv-accent/20"
      />
    </div>
  );
}

export function SelectField({
  label,
  id,
  register,
  path,
  options,
  required = false,
  className = "",
}: SelectFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-cv-subheading font-medium">
        {label}
        {required && <span className="text-cv-accent ml-1">*</span>}
      </Label>
      <select
        id={id}
        {...register(path, { required })}
        className="mt-1 w-full rounded-md border border-cv-border bg-cv-section px-3 py-2 text-cv-text focus:border-cv-accent focus:outline-none focus:ring-2 focus:ring-cv-accent/20"
      >
        <option value="">-- Choisir --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  id,
  register,
  path,
  className = "",
}: CheckboxFieldProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox
        id={id}
        {...register(path)}
        className="border-cv-border data-[state=checked]:bg-cv-accent data-[state=checked]:border-cv-accent"
      />
      <Label htmlFor={id} className="text-cv-text font-medium">
        {label}
      </Label>
    </div>
  );
}
