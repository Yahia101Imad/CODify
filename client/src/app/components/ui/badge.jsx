import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 select-none border w-fit whitespace-nowrap shrink-0 overflow-hidden",

  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent shadow-sm hover:scale-105",

        secondary:
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md hover:scale-105",

        destructive:
          "bg-red-500 text-white border-transparent hover:bg-red-600",

        outline:
          "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
