'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type LoginProps = {
  params: {
    version: "cpae" | "egress"
  }
}

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string()
})

type LoginForm = z.infer<typeof loginFormSchema>

export default function Login({ params: { version } }: LoginProps) {
  const isCpae = version === "cpae"

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  async function onSubmit(data: LoginForm) {
    const { username, password } = data

    const response = await api("/api/cpae/login/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
    })

    console.log(response)
}

  return (
    <div className="grid grid-cols-5 gap-3 w-screen h-screen">
      <div className="col-span-2 flex flex-col gap-8 items-center justify-center bg-background_modal">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 items-center justify-center"
          >
            <h1 className="mb-10 text-5xl font-bold text-blue_primary">Login</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue_primary">Usuário</FormLabel>
                  <FormControl>
                    {isCpae ? (
                      <Input type="text" className="w-[23rem]" {...field} />
                    ) : (
                      <Input type="email" className="w-[23rem]" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue_primary">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-[23rem]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-[5rem]">
              <Checkbox id="rememberMe" label="Lembre de mim"/>
              <Button variant="link" size="sm" className="font-light text-blue_primary">Esqueci a Senha</Button>
            </div>
            <Button type="submit" variant="default" className="text-[24px]">Entrar</Button>
          </form>
        </Form>
        
        {!isCpae && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-blue_primary font-light">Não tem uma conta?</span>
            <Link href="#" className="text-blue_light">Registre-se</Link>
          </div>
        )}
      </div>
      <div className="col-span-3 flex items-center justify-center">
        <Image 
          src="/images/beca-welcome.png"
          width={400}
          height={300}
          alt="Bem Vindo ao Beca"
          className="z-10"
        />
        <Image 
          src="/images/pattern.png"
          width={300}
          height={350}
          alt="Pattern Beca"
          className="absolute right-0 z-0"
        />
      </div> 
    </div>
  )
}