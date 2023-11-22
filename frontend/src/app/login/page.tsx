import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Login() {

  return (
    <div className="grid grid-cols-2 gap-3 w-screen h-screen">
      <div className="flex flex-col gap-8 items-center justify-center bg-background_modal">
        <h1 className="mb-10 text-5xl font-bold text-blue_primary">Login</h1>
        <Input type="email" name="email" label="Email" className="w-[23rem]" />
        <Input type="password" name="password" label="Senha" className="w-[23rem]" />
      </div>
      <div className="flex items-center justify-center">
        <Image 
          src="/images/beca-welcome.png"
          width={200}
          height={100}
          alt="Bem Vindo ao Beca"
          className="z-1"
        />
        <Image 
          src="/images/pattern.png"
          width={100}
          height={100}
          alt="Pattern Beca"
          className="absolute top-0 right-0"
        />
      </div> 
    </div>
    
  )
}