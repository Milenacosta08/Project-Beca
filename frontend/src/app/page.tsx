'use client'
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image'
import { Loading } from "@/components/loading";
import Carousel from "@/components/carousel";
import { useState } from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)

    const images = [
        {
          key: '1',
          path: '/images/beca-visual.png'
        },
        {
          key: '2',
          path: '/images/logo-beca.png'
        },
        {
          key: '3',
          path: '/images/beca-capa.png'
        }
      ]

    return (
        <div className="w-screen h-screen">
          <Navbar />
          
            {isLoading ? (
              <div className="w-screen h-screen flex justify-center items-center">
                <Loading />
              </div>
            ):(
              <>
                <div className="w-screen h-[60%]">
                  <Carousel images={images} />
                </div>
                <div className="p-20 h-screen flex flex-col gap-8">
                  <div>
                    <h1 className="font-bold text-white_title text-6xl">Quem Somos</h1>
                    <p className="font-normal mt-4 text-white_title">A CPAE (Comissão Permanente de Auxílio a Egressos) é um grupo responsável pelo auxílio dos graduados após sua vida acadêmica. Com o objetivo de promover o bem-estar dos egressos, apresentamos o Beca, um ambiente dedicado a você, onde pode:</p>
                  </div>
                  
                  <div className="flex flex-col gap 8">
                    <h2 className="font-bold text-white_title text-3xl">Egresso</h2>
                    <div className="grid grid-cols-5 h-[70%] w-full gap-5 p-5">
                      <div className="col-span-1 bg-purple_primary flex items-center justify-center rounded-md p-3">
                        <Image 
                          src="/images/conecte-icon.png"
                          width={100}
                          height={100}
                          alt="egresso icone"
                        />
                      </div>
                      <div className="col-span-4 bg-purple_primary rounded-md px-5 py-3">
                        <p className="font-bold text-white_title">Conecte-se</p>
                        <p className="font-normal text-white_title">Estabeleça um canal de comunicação direta com a instituição, tornando mais acessível e conveniente a troca de informações.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 h-[70%] w-full gap-5 p-5">
                      <div className="col-span-4 bg-blue_light rounded-md p-3">
                        <p className="font-bold text-white_title">Oportunidades</p>
                        <p className="font-normal text-white_title">Acesse oportunidades de emprego, cursos de aperfeiçoamento e projetos de extensão.</p>
                      </div>
                      <div className="col-span-1 bg-blue_light flex items-center justify-center rounded-md px-5 py-3">
                        <Image 
                          src="/images/oportunidade-icon.png"
                          width={100}
                          height={100}
                          alt="oportunidades icone"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 h-[70%] w-full gap-5 p-5">
                      <div className="col-span-1 bg-blue_primary flex items-center justify-center rounded-md p-3">
                        <Image 
                          src="/images/evento-icon.png"
                          width={100}
                          height={100}
                          alt="evento icone"
                        />
                      </div>
                      <div className="col-span-4 bg-blue_primary rounded-md px-5 py-3">
                        <p className="font-bold text-white_title">Eventos</p>
                        <p className="font-normal text-white_title">Descubra eventos acadêmicos, científicos e culturais promovidos pela instituição.</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-around pb-5">
                      <Image 
                        src="/images/beca-visual.png"
                        width={200}
                        height={80}
                        alt="Identidade Visual Beca"
                      />
                      <div className="text-border_separator text-sm font-light w-[28%]">
                        Este sistema foi desenvolvido para fortalecer os laços entre o Instituto Federal de Educação, Ciência e Tecnologia do Ceará - Campus Aracati, seus egressos do curso de Bacharelado em Ciência da Computação e o mercado de trabalho.
                      </div>
                      <div className="w-auto">
                        <span className="text-border_separator text-sm font-semibold">Fale Conosco</span>
                        <p className="text-border_separator text-sm font-light">becaifce@gmail.com</p>
                      </div>
                      <div className="w-auto">
                        <span className="text-border_separator text-sm font-semibold">Informações</span>
                        <p className="text-border_separator text-sm font-light">Termos e Condições</p>
                        <p className="text-border_separator text-sm font-light mt-2">Políticas de Privacidade</p>
                      </div>
    
                  </div>
                </div>
              </>
            )}
        </div>
      )
}