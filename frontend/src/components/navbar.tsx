import { Button } from "./ui/button"
import { RiDoorOpenFill } from "react-icons/ri";
import Image from 'next/image'


export default function Navbar() {
  return (
    <div className="flex justify-around bg-blue_primary w-screen py-3 px-5 items-center">
      <Image 
        src="/images/logo-beca.png"
        width={50}
        height={8}
        alt="Logo Beca"
        className=""
      />
      <Button variant="ghost" className="w-auto h-7 py-5 px-5 hover:bg-purple_primary rounded-lg">Eventos</Button>
      <Button variant="ghost" className="w-auto h-7 py-5 hover:bg-purple_primary rounded-lg">Pós-Graduação</Button>
      <Button variant="ghost" className="w-auto h-7 py-5 hover:bg-purple_primary rounded-lg">Projetos</Button>
      <Button variant="ghost" className="w-auto h-7 py-5 hover:bg-purple_primary rounded-lg">Egressos</Button>
      <Button variant="ghost" className="w-auto h-7 py-5 hover:bg-purple_primary rounded-lg">Empresas</Button>
      <Button className="flex gap-2 bg-purple_primary w-auto h-7 py-3 px-5 rounded-lg">
        Sair
        <RiDoorOpenFill size={20} />
      </Button>
    </div>
  )
}