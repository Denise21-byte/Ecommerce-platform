import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const variants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'hover:bg-white/10 text-white/70 hover:text-white',
};

const Button = ({ variant = 'primary', isLoading, children, className = '', disabled, ...props }: Props) => (
  <button
    {...props}
    disabled={isLoading || disabled}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
  >
    {isLoading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
    {children}
  </button>
);

export default Button;