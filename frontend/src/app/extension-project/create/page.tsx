
'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { InputDate } from "@/components/input-date"
import { AiOutlineLink } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { api } from "@/services/api"
import { ExtensionProject } from "../edit/[id]/page"

type FormProps = {
  project?: ExtensionProject 
}

const extensionProjectFormSchema = z.object({
    title: z
      .string()
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

export default function CreateExtensionProject({ project }: FormProps) {
  const isEdit = !!project
  const { ...defaultValues } = project || ({} as ExtensionProject)

  const form = useForm<ExtensionProjectFormValues>({
    resolver: zodResolver(extensionProjectFormSchema),
    defaultValues: isEdit ? {
      ...defaultValues, 
      vacancies: defaultValues.vacancies.toString(), 
    } : {},
  })

  async function onSubmit(data: ExtensionProjectFormValues) {
    const { title, vacancies, value, duration, link, offerer, registration_date, validity_date } = data

    const response = !isEdit ? 
     await api("/api/project/create/", {
      method: "POST",
      body: JSON.stringify({
        title,
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
    }) : api(`/api/project/update/${project?.id}/`, {
      method: "PUT",
      body: JSON.stringify({
        title,
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

    form.reset();
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-3 flex items-end justify-around">
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
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="registration_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white_primary">Período de Inscrição</FormLabel>
                        <FormControl>
                          <InputDate {...field} />
                        </FormControl>
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
                    <FormLabel className="text-white_primary">Período de Vigência</FormLabel>
                      <FormControl>
                        <InputDate {...field} />
                      </FormControl>
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
            { isEdit ? "Salvar" : "Enviar" }
            <BsArrowRight className="mt-1 w-14 h-7" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

