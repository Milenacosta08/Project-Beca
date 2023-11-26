'use client'
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LiaEdit } from "react-icons/lia";
import { GiTrashCan } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai"
import ModalDelete from "@/components/modal-delete"

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

export default function ViewExtensionProject({ params: { id } }: FormProps) {
  const [project, setProject] = useState<ExtensionProject>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getProject() {
    const response = await api(`/api/project/get/${id}/`, {
      method: 'GET'
    })

    const project = (await response.json()) as ExtensionProject
    setProject(project)

    setIsLoading(false);
    
    return response
  }

  useEffect(() => {
    try {
      getProject()
    } catch (err) {
      console.log(err)
    }
  }, [])
    
  return (
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          project &&
          <div className="grid grid-cols-5 w-screen h-screen">
            <div className="col-span-3 py-8">
              <div className="grid grid-cols-5 mb-8">
                <h1 className="col-span-4 text-3xl text-center font-bold text-white_title">{project.title}</h1>
                <div className="col-span-1 flex justify-center gap-3">
                    <Link href={`/extension-project/edit/${id}`}>
                      <Button variant="ghost" size="icon" className="text-white_primary">
                        <LiaEdit size={24} />
                      </Button>
                    </Link>
                    <ModalDelete id={id} entity="project" />
                  </div>
              </div>
              <div className="flex flex-col gap-8 px-8">
                <div className="flex items-start gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Descrição:</h2>
                  <p className="text-white_primary font-extralight">{project.description}</p>
                </div>
                <div className="flex items-start gap-40">
                  <div className="flex items-center gap-5">
                    <h2 className="text-xl text-center font-normal text-white_title">Duração:</h2>
                    <p className="text-white_primary font-extralight">{project.duration}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <h2 className="text-xl text-center font-normal text-white_title">Vagas:</h2>
                    <p className="text-white_primary font-extralight">{project.vacancies} vagas</p>
                  </div>
                </div>
                <div className="flex items-end gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Valor da Bolsa:</h2>
                  <p className="text-white_primary font-extralight">{project.value}</p>
                </div>
                <div className="flex items-end gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Período de Inscrição:</h2>
                  <p className="text-white_primary font-extralight">{new Date(project.registration_date_start).toLocaleDateString('pt-BR')} - {new Date(project.registration_date_end).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex items-end gap-6">
                  <h2 className="text-xl text-center font-normal text-white_title">Período de Vigência:</h2>
                  <p className="text-white_primary font-extralight">{new Date(project.validity_date_start).toLocaleDateString('pt-BR')} - {new Date(project.validity_date_end).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex items-end gap-6">
                  <h2 className="text-xl text-center font-normal text-white_title">Edital:</h2>
                  <p className="flex items-center gap-1 text-white_primary font-extralight">
                    <AiOutlineLink size={20}/>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </p>
                </div>
                <div className="flex items-end gap-6">
                  <h2 className="text-xl text-center font-normal text-white_title">Ofertante:</h2>
                  <p className="text-white_primary font-extralight">{project.offerer}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-red-400"></div>
          </div>
        )}
      </div>
  )
}