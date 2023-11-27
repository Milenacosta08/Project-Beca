"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  id: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, id, label, ...props }, ref) => (
  <div className="flex items-center">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "h-4 w-4 bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue_checkbox data-[state=checked]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" id={id}/>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {!!label && (
      <Label className="ml-3 font-light" htmlFor={id}>{label}</Label>
    )}
  </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
