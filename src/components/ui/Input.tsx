import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-white/70">{label}</label>}
    <input
      ref={ref}
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg glass text-white placeholder-white/30 outline-none transition-all duration-200 focus:ring-2 ${
        error ? 'ring-2 ring-red-500/60 focus:ring-red-500' : 'focus:ring-purple-500/60'
      } ${className}`}
    />
    {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;