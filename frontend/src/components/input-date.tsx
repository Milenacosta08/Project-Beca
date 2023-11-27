'use client'

import { addDays, format } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { LiaCalendarWeekSolid } from 'react-icons/lia'
import { Calendar } from './ui/calendar'
import { pt } from 'date-fns/locale'

export function InputDate({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  return (
    <div className={cn('grid gap-2', className)}>
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
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: pt })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale: pt })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: pt })
              )
            ) : (
              <span>Selecione a data</span>
            )}
            <LiaCalendarWeekSolid className="h-7 w-7" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-input" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            locale={pt}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}