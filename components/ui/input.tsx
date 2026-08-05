import * as React from "react"

import { cn } from "@/lib/utils"

// Local utility function for phone number masking
const maskPhoneNumber = (value: string): string => {
  if (!value) return value
  // Remove all non-numeric characters
  const digits = value.replace(/\D/g, "")
  if (digits.length < 4) return "***-***-****"
  const lastFour = digits.slice(-4)
  return `***-***-${lastFour}`
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>((
  { className, type, ...props }
}, ref) => {
  // Check if this is a phone input type
  const isPhoneInput = type === "tel"
  
  // Get display value - mask phone numbers for display
  const displayValue = isPhoneInput && props.value ? maskPhoneNumber(String(props.value)) : props.value
  
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
