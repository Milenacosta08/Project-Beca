'use client'
import CardActivities from "@/components/card-activities";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Loading } from "@/components/loading";
import Carousel from "@/components/carousel";
import NavbarCpae from "@/components/navbar-cpae";

type Project = {
  id: string
  title: string
  description: string
  offerer: string
  link: string
  registration_date_start: string
  registration_date_end: string
  validity_date_start: string
  validity_date_end: string
  vacancies: number
  value: string
  duration: string 
}

type Graduation = {
  id: string
  title: string
  description: string
  offerer: string
  link: string
  registration_date_start: string
  registration_date_end: string
  vacancies: number
  duration: string
  categories: {
    id: string
    name: string
  }[]
}

async function useProjects() {
  const response = await api('/api/project/list')
  const data = (await response.json()) as Project[]
  return data
}

async function useGraduation() {
  const response = await api('/api/graduation/list')
  const data = (await response.json()) as Graduation[]
  return data
}

export default function HomeCpae() {
  const [projects, setProjects] = useState<Project[]>([])
  const [graduations, setGraduations] = useState<Graduation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([useProjects(), useGraduation()]).then(([projectsData, graduationData]) => {
      const projectsLatest = projectsData.reverse().slice(0, 3);
      setProjects(projectsLatest);
  
      const graduationsLatest = graduationData.reverse().slice(0, 3);
      setGraduations(graduationsLatest);
  
      setIsLoading(false);
    });
  }, [])

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
      <NavbarCpae />
      
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
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-white_title text-4xl">Pós-Graduação</h1>
                  <Button variant="ghost" className="w-auto h-7 py-3 px-3 rounded-md hover:bg-purple_primary">
                    Ver mais
                  </Button>
                </div>
                <div className="flex justify-between pt-8">
                  {graduations.map((graduation) => (
                    <div key={graduation.id}>
                      <CardActivities 
                        entity="graduation" 
                        vacancies={graduation.vacancies.toString()} 
                        title={graduation.title}
                        offerer={graduation.offerer}
                        startDate={graduation.registration_date_start}
                        endDate={graduation.registration_date_end}
                        categories={graduation.categories ? graduation.categories.map((category) => category.name) : []}
                        id={parseInt(graduation.id)}
                      />
                    </div>
                  ))}
                </div>
                <Separator className="my-16" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-white_title text-4xl">Eventos</h1>
                  <Button variant="ghost" className="w-auto h-7 py-3 px-3 rounded-md hover:bg-purple_primary">
                    Ver mais
                  </Button>
                </div>
                <div className="flex justify-between pt-8">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <CardActivities 
                        entity="extension-project" 
                        description={project.description} 
                        title={project.title}
                        offerer={project.offerer}
                        startDate={project.validity_date_start}
                        endDate={project.validity_date_end}
                        categories={[]}
                        id={parseInt(project.id)}
                      />
                    </div>
                  ))}
                </div>
                <Separator className="my-16" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-white_title text-4xl">Projetos de Extensão</h1>
                  <Button variant="ghost" className="w-auto h-7 py-3 px-3 rounded-md hover:bg-purple_primary">
                    Ver mais
                  </Button>
                </div>
                <div className="flex justify-between pt-8">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <CardActivities 
                        entity="extension-project" 
                        description={project.description} 
                        title={project.title}
                        offerer={project.offerer}
                        startDate={project.validity_date_start}
                        endDate={project.validity_date_end}
                        categories={[]}
                        id={parseInt(project.id)}
                      />
                    </div>
                  ))}
                </div>
                <Separator className="mt-16" />
              </div>
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
