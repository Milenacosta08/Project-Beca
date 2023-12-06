import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InputSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string
    label: string
  }[]
}

export default function InputSelect({
  options,
  ...props
}: InputSelectProps) {
    return (
      <Select>
        <SelectTrigger className="flex justify-between items-center w-[100%] border-b-[1px] border-border_input">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
    </Select>
    )
}