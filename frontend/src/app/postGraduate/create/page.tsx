import { Input } from "@/components/ui/input";
import Image from "next/image";


export default function createPostGraduate(){
    
    return(
        <div className = "grid grid-cols-3 h-screen w-screen" >
            <div className="flex justify-start items-center">
                <Image className="scale-x-[-1]"
                    src="/images/pattern.png"
                    width={300}
                    height={350}
                    alt="Pattern Beca"
                />
            </div>

        <div className="flex items-center justify-center p-6 pt-20 pb-20">
            <div className="flex items-center justify-center flex-col bg-amber-600 h-full w-full">
                <h1 className="font-">Informar Vaga de Pós Graduação</h1>
                <Input type="text" name="user" label="Título" className="w-full" />
            </div>
        </div>
        </div>
    )
}

