import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand)] text-white shadow-[0_14px_30px_rgba(239,125,87,0.24)] hover:bg-[var(--brand-deep)] hover:shadow-[0_18px_36px_rgba(216,95,54,0.3)]",
        secondary:
          "border border-[rgba(31,41,55,0.1)] bg-white/84 text-foreground shadow-[0_10px_24px_rgba(31,41,55,0.05)] hover:border-[rgba(31,41,55,0.16)] hover:bg-[rgba(255,244,236,0.98)] hover:shadow-[0_14px_28px_rgba(31,41,55,0.08)]",
        ghost:
          "text-foreground shadow-none hover:bg-[rgba(31,111,120,0.12)] hover:text-[var(--text)]",
      },
      size: {
        default: "h-12 px-5 py-2",
        sm: "h-10 px-4",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
