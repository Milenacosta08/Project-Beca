import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="grid grid-cols-5 gap-3 w-screen h-screen">
      <div className="col-span-2 flex flex-col gap-8 items-center justify-center bg-background_modal">
        <h1 className="mb-10 text-5xl font-bold text-blue_primary">Login</h1>
        <Input type="text" name="user" label="Usuário" className="w-[23rem]" />
        <Input type="password" name="password" label="Senha" className="w-[23rem]" />
        <div className="flex items-center gap-[5rem]">
          <Checkbox id="rememberMe" label="Lembre de mim"/>
          <Button variant="link" size="sm" className="font-light text-blue_primary">Esqueci a Senha</Button>
        </div>
        <Button variant="default" className="text-[24px]">Entrar</Button>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-blue_primary font-light">Não tem uma conta?</span>
          <Link href="#" className="text-blue_light">Registre-se</Link>
        </div>
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