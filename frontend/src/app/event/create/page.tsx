'use client'
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import InputSelect from "@/components/input-select";
import { useState } from "react";
import ModalProgram from "./modal-program";

type Program = {
  id?: string
  title: string
  local: string
  date: string
  hour: string
}

const eventFormSchema = z.object({
  title: z.string()
    .min(2, {
      message: "O título deve ter pelo menos 2 caracteres.",
    }),
  description: z.string({
    required_error: "Por favor, informe a descrição do projeto."
  }),
  duration: z.string({
    required_error: "Por favor, informe a duração do projeto.",
  }),
  local: z.string({
    required_error: "Por favor, informe o link do projeto.",
  }),
  programs: z.array(z.object({
      title: z.string(),
      local: z.string(),
      date: z.string(),
      hour: z.string(),
  }))
})

type EventFormValues = z.infer<typeof eventFormSchema>

export default function CreateEvent() {
  const router = useRouter()

  const [programs, setPrograms] = useState<Program[]>([])
  const [optionsPrograms, setOptionsPrograms] = useState<{
    value: string
    label: string
  }[]>([])

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      local: "",
      duration: "",
      programs: [],
    }
  })

  async function onSubmit(data: EventFormValues) {
    const { title, description, duration, local, programs } = data

    const response = await api("/api/event/create/", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        local,
        duration,
        programs,
      }),
    })

    router.push("/event")
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
              <h1 className="text-5xl font-bold text-white_title">Informar Evento</h1>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white_primary">Nome do Evento</FormLabel>
                    <FormControl>
                      <Input className="text-white_primary font-light border-border_input_white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white_primary">Duração</FormLabel>
                    <FormControl>
                      <Input className="text-white_primary font-light border-border_input_white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white_primary">Local</FormLabel>
                    <FormControl>
                      <Input className="w-full text-white_primary font-light border-border_input_white" {...field} />
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
              <FormField
                control={form.control}
                name="programs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white_primary">Programação</FormLabel>
                    <div className="flex gap-5">
                      <FormControl>
                        <InputSelect options={optionsPrograms} />
                      </FormControl>
                      {/* <Button variant="outline" className="bg-transparent border border-border_input w-auto">
                        Adicionar
                      </Button> */}
                      <ModalProgram />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="flex-col w-[124px] font-normal" type="submit" variant={"ghost"}>
              Enviar
              <BsArrowRight className="mt-1 w-14 h-7" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}