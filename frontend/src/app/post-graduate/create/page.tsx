'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from "next/image"
import { cn } from "@/lib/utils";
import { LiaCalendarWeekSolid } from "react-icons/lia"
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { Calendar } from "@/components/ui/calendar";
import { pt } from "date-fns/locale"

const postGraduateFormSchema = z.object({
    title: z.string()
      .min(2, {
        message: "O título deve ter pelo menos 2 caracteres.",
      }),
    registration_date: z.object({
      from: z.date({
        required_error: "Por favor, informe a data de início do período de inscrição projeto.",
      }),
      to: z.date({
        required_error: "Por favor, informe a data do fim do período de inscrição do projeto.",
      }),
    }),
    vacancies: z.string({
      required_error: "Por favor, informe a quantidade de vagas.",
    }),
    duration: z.string({
      required_error: "Por favor, informe a duração do projeto.",
    }),
    link: z.string({
      required_error: "Por favor, informe o link do projeto.",
    }),
    offerer: z.string({
      required_error: "Por favor, informe a oferta do projeto.",
    }),
})

type PostGraduateFormValues = z.infer<typeof postGraduateFormSchema>

export default function CreatePostGraduate() {
    const router = useRouter();

    const [dateRegistration, setDateRegistration] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<PostGraduateFormValues>({
        resolver: zodResolver(postGraduateFormSchema),
        defaultValues: {
          title: "",
          vacancies: "",
          duration: "",
          link: "",
          offerer: "",
          registration_date: {
            from: new Date(),
            to: addDays(new Date(), 20),
          },
        }
    })

    async function onSubmit(data: PostGraduateFormValues) {
        const { title, vacancies, duration, link, offerer, registration_date } = data
    
        const response = await api("/api/graduation/create/", {
          method: "POST",
          body: JSON.stringify({
            title,
            vacancies,
            duration,
            link,
            offerer,
            registration_date_start: registration_date.from.toISOString().split('T')[0],
            registration_date_end: registration_date.to.toISOString().split('T')[0],
          }),
        })
        
        router.push("/post-graduate")
    }

    return (
        <div className="grid grid-cols-4 w-screen h-screen">
          <div className="flex items-center">
            <Image 
              src="/images/pattern.png"
              width={300}
              height={350}
              alt="Pattern Beca"
              className="scale-x-[-1]"
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-3 flex items-center justify-around">
              <div className="flex items-end justify-around">
                <div className="space-y-8 p-9 w-[60%]">
                  <h1 className="text-5xl font-bold text-white_title">Informar Vaga de Pós Gradução</h1>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white_primary">Título</FormLabel>
                        <FormControl>
                          <Input className="text-white_primary font-light border-border_input_white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name="registration_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white_primary">Período de Inscrição</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    id="date"
                                    size={"sm"}
                                    variant={'date'}
                                    className={cn(
                                      'w-[100%] flex pl-3 justify-between font-normal bg-background text-white_primary placeholder:text-white_primary',
                                      !dateRegistration && 'text-muted-foreground',
                                    )}
                                  >
                                    {dateRegistration?.from ? (
                                      dateRegistration.to ? (
                                        <>
                                          {format(dateRegistration.from, 'LLL dd, y', { locale: pt })} -{' '}
                                          {format(dateRegistration.to, 'LLL dd, y', { locale: pt })}
                                        </>
                                      ) : (
                                        format(dateRegistration.from, 'LLL dd, y', { locale: pt })
                                      )
                                    ) : (
                                      <span>Selecione a data</span>
                                    )}
                                    <LiaCalendarWeekSolid className="h-7 w-7" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 border-input" align="start">
                                <Calendar
                                  initialFocus
                                  mode="range"
                                  defaultMonth={dateRegistration?.from}
                                  selected={dateRegistration}
                                  onSelect={setDateRegistration}
                                  numberOfMonths={1}
                                  locale={pt}
                                  {...field}
                                />
                              </PopoverContent>
                            </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white_primary">Duração</FormLabel>
                          <FormControl>
                            <Input className="text-white_primary font-light border-border_input_white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                  <FormField
                      control={form.control}
                      name="vacancies"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white_primary">Vagas Disponíveis</FormLabel>
                          <FormControl>
                            <Input type="number" className="w-[100%] text-white_primary font-light border-border_input_white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white_primary">Link do Edital</FormLabel>
                          <FormControl>
                            <Input className="w-full text-white_primary font-light border-border_input_white" icon={AiOutlineLink} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="offerer"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white_primary">Ofertante</FormLabel>
                        <FormControl>
                          <Input className="text-white_primary font-light border-border_input_white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                </div>
                <Button className="flex-col w-[124px] font-normal" type="submit" variant={"ghost"} onClick={() => setIsLoading(true)}>
                  Enviar
                  <BsArrowRight className="mt-1 w-14 h-7" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
    )
    
}