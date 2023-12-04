import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
import { ComponentType } from "react"
import { IconBaseProps } from 'react-icons'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string,
    icon?: ComponentType<IconBaseProps>
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, icon: Icon, ...props }, ref) => {
    return (
      <div className={className}>
        {!!label && (
          <Label className="font-light text-blue_primary" htmlFor={name}>
            {label}
          </Label>
        )}
        <div className={cn("flex items-end h-8 border-b-[1px] border-border_input bg-transparent", className)}>
          <input
            name={name}
            type={type}
            className={cn(
              "flex h-8 bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          {!!Icon && (
            <Icon className="mb-1 h-5 w-5" />
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
