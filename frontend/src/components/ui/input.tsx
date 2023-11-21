import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, ...props }, ref) => {
    return (
      <div>
        {!!label && (
          <Label className="font-light text-blue_primary" htmlFor={name}>
            {label}
          </Label>
        )}
        <input
          name={name}
          type={type}
          className={cn(
            "flex h-8 w-full rounded-md border-b-[1px] border-border_input bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
