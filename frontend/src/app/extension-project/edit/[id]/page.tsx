'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AiOutlineLink } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { api } from "@/services/api"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import React, { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { LiaCalendarWeekSolid } from "react-icons/lia"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { pt } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Loading } from "@/components/loading"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

interface ExtensionProject {
  id: string
  title: string
  description: string
  vacancies: number
  value: string
  duration: string
  link: string
  offerer: string
  registration_date_start: Date
  registration_date_end: Date
  validity_date_start: Date
  validity_date_end: Date
}

type FormProps = {
  params: {
    id: string
  }
}

function createLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const extensionProjectFormSchema = z.object({
    title: z.string()
      .min(2, {
        message: "O título deve ter pelo menos 2 caracteres.",
      }),
    description: z.string({
        required_error: "Por favor, informe a descrição do projeto."
    }),
    registration_date: z.object({
      from: z.date({
        required_error: "Por favor, informe a data de início do período de inscrição projeto.",
      }),
      to: z.date({
        required_error: "Por favor, informe a data do fim do período de inscrição do projeto.",
      }),
    }),
    validity_date: z.object({
      from: z.date({
        required_error: "Por favor, informe a data de início do projeto.",
      }),
      to: z.date({
        required_error: "Por favor, informe a data do fim do projeto.",
      }),
    }),
    vacancies: z.string({
      required_error: "Por favor, informe a quantidade de vagas.",
    }),
    value: z.string({
      required_error: "Por favor, informe o valor da bolsa.",
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
  
type ExtensionProjectFormValues = z.infer<typeof extensionProjectFormSchema>

export default function EditExtensionProject({ params: { id } }: FormProps) {
  const router = useRouter()
  let project = {} as ExtensionProject

  const [loading, setLoading] = useState(true);

  const [dateRegistration, setDateRegistration] = React.useState<DateRange | undefined>({
    from: project.registration_date_start,
    to: project.registration_date_end,
  })

  const [dateValidity, setDateValidity] = React.useState<DateRange | undefined>({
    from: project.validity_date_start,
    to: project.validity_date_end,
  })

  async function getProject() {
    const response = await api(`/api/project/get/${id}/`, {
      method: 'GET'
    })

    project = (await response.json()) as ExtensionProject

    form.reset({
      title: project.title || "",
      description: project.description || "",
      vacancies: project.vacancies ? project.vacancies.toString() : "",
      value: project.value || "",
      duration: project.duration || "",
      link: project.link || "",
      offerer: project.offerer || "",
      registration_date: {
        from: createLocalDate(project.registration_date_start.toString()),
        to: createLocalDate(project.registration_date_end.toString())
      },
      validity_date: {
        from: createLocalDate(project.validity_date_start.toString()),
        to: createLocalDate(project.validity_date_end.toString())
      },
    });

    console.log(project)

    setLoading(false);
    
    return response
  }

  const form = useForm<ExtensionProjectFormValues>({
    resolver: zodResolver(extensionProjectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      vacancies: project?.vacancies ? project.vacancies.toString() : "",
      value: project?.value || "",
      duration: project?.duration || "",
      link: project?.link || "",
      offerer: project?.offerer || "",
      registration_date: {
        from: project?.registration_date_start || new Date(),
        to: project?.registration_date_end || addDays(new Date(), 20)
      },
      validity_date: {
        from: project?.validity_date_start || new Date(),
        to: project?.validity_date_end || addDays(new Date(), 20)
      },
    },
  })

  async function onSubmit(data: ExtensionProjectFormValues) {
    const { title, description, vacancies, value, duration, link, offerer, registration_date, validity_date } = data

    await api(`/api/project/update/${id}/`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        vacancies,
        value,
        duration,
        link,
        offerer,
        registration_date_start: registration_date.from.toISOString().split('T')[0],
        registration_date_end: registration_date.to.toISOString().split('T')[0],
        validity_date_start: validity_date.from.toISOString().split('T')[0],
        validity_date_end: validity_date.to.toISOString().split('T')[0],
      }),
    })

    router.push(`/extension-project/view/${id}`)
  }

  useEffect(() => {
    async function fetchData() {
      await getProject();

      setDateRegistration({
        from: createLocalDate(project.registration_date_start.toString()),
        to: createLocalDate(project.registration_date_end.toString())
      });

      setDateValidity({
        from: createLocalDate(project.validity_date_start.toString()),
        to: createLocalDate(project.validity_date_end.toString())
      });
    }

    try {
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }, []);

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-3 flex items-end justify-around">
          { loading ? ( <Loading /> ) : (
            <>
              <div className="space-y-8 p-9 w-[60%]">
                <h1 className="text-5xl font-bold text-white_title">Informar Projeto de Extensão</h1>
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white_primary">Descrição</FormLabel>
                      <FormControl>
                        <Textarea className="text-white_primary font-light border-border_input_white" {...field} />
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
                </div>
                <div className="flex justify-between">
                <FormField
                    control={form.control}
                    name="validity_date"
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
                                    !dateValidity && 'text-muted-foreground',
                                  )}
                                >
                                  {dateValidity?.from ? (
                                    dateValidity.to ? (
                                      <>
                                        {format(dateValidity.from, 'LLL dd, y', { locale: pt })} -{' '}
                                        {format(dateValidity.to, 'LLL dd, y', { locale: pt })}
                                      </>
                                    ) : (
                                      format(dateValidity.from, 'LLL dd, y', { locale: pt })
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
                                defaultMonth={dateValidity?.from}
                                selected={dateValidity}
                                onSelect={setDateValidity}
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
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white_primary">Valor da Bolsa</FormLabel>
                        <FormControl>
                          <Input className="text-white_primary font-light border-border_input_white" {...field} />
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
              <Button className="flex-col w-[124px] font-normal" type="submit" variant={"ghost"}>
                  Salvar
                  <BsArrowRight className="mt-1 w-14 h-7" />
              </Button>
            </>
          )} 
        </form>
      </Form>
    </div>
  )
}

