import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
          variant === 'primary' && "bg-indigo-600 text-white hover:bg-indigo-700",
          variant === 'secondary' && "bg-slate-800 text-slate-100 hover:bg-slate-700",
          variant === 'outline' && "border border-slate-700 bg-transparent hover:bg-slate-800",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
