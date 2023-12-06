'use client'
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { GiTrashCan } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InputDate } from "@/components/input-date";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

type ModalDeleteProps = {
    id: string;
    entity: string;
}

export default function ModalProgram() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date())
    
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" type="button" className="bg-transparent border border-border_input w-auto">
          Adicionar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-end items-end">
            <AlertDialogCancel className="transform -translate-y-3 text-blue_primary"><IoIosClose size={20} /></AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-blue_primary font-normal text-lg text-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  size={"sm"}
                  variant={'date'}
                  className={cn(
                    'w-[100%] flex pl-3 justify-between font-normal bg-background text-white_primary placeholder:text-white_primary',
                    !date && 'text-muted-foreground',
                  )}
                >
                  {date ? (
                    format(date, 'LLL dd, y', { locale: pt })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                  <LiaCalendarWeekSolid className="h-7 w-7" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-input" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={date}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  locale={pt}
                  className="bg-white_primary text-red-600"
                />
              </PopoverContent>
            </Popover>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogAction className="w-25 h-10 bg-blue_primary text-white_primary" onClick={handleDelete}>{isLoading ? <Loading /> : 'Remover'}</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}