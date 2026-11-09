interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxField({ label, checked, onCheckedChange }: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="rounded text-blue-600 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}
