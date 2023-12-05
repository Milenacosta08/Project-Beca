import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdArrowDropdown } from "react-icons/io";

export default function ButtonLogin() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  className="flex gap-2 bg-purple_primary w-auto h-7 py-3 px-5 rounded-lg" >
          Entrar
          <IoMdArrowDropdown size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto bg-background_options">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-blue_primary h hover:cursor-pointer">
            Egresso
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border_separator h-[1px]" />
          <DropdownMenuItem className="text-blue_primary hover:cursor-pointer">
            Empresa
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}