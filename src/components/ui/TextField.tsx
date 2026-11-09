import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: string;
  onValueChange: (value: string) => void;
}

/** Campo di testo con lo stile comune: dimensioni e testo si passano con `className` */
export function TextField({ value, onValueChange, className = '', ...inputProps }: TextFieldProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      className={`w-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...inputProps}
    />
  );
}
