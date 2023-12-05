'use client'
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LiaEdit } from "react-icons/lia";
import { AiOutlineLink } from "react-icons/ai"
import ModalDelete from "@/components/modal-delete"

interface PostGraduate {
  id: string
  title: string
  vacancies: number
  duration: string
  link: string
  offerer: string
  registration_date_start: Date
  registration_date_end: Date
}
  

type FormProps = {
  params: {
    id: string
  }
}

export default function ViewPostGraduate({ params: { id } }: FormProps) {
  const [graduate, setGraduate] = useState<PostGraduate>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getGraduate() {
    const response = await api(`/api/graduation/get/${id}/`, {
      method: 'GET'
    })

    const graduate = (await response.json()) as PostGraduate
    setGraduate(graduate)

    setIsLoading(false);
    
    return response
  }

  useEffect(() => {
    try {
      getGraduate()
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
          graduate &&
          <div className="grid grid-cols-5 w-screen h-screen">
            <div className="col-span-3 py-8">
              <div className="grid grid-cols-5 mb-8">
                <h1 className="col-span-4 text-3xl text-center font-bold text-white_title">{graduate.title}</h1>
                <div className="col-span-1 flex justify-center gap-3">
                    <Link href={`/post-graduate/edit/${id}`}>
                      <Button variant="ghost" size="icon" className="text-white_primary">
                        <LiaEdit size={24} />
                      </Button>
                    </Link>
                    <ModalDelete id={id} entity="graduate" />
                  </div>
              </div>
              <div className="flex flex-col gap-8 px-8">
                <div className="flex items-end gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Período de Inscrição:</h2>
                  <p className="text-white_primary font-extralight">{new Date(graduate.registration_date_start).toLocaleDateString('pt-BR')} - {new Date(graduate.registration_date_end).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex items-center gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Duração:</h2>
                  <p className="text-white_primary font-extralight">{graduate.duration}</p>
                </div>
                <div className="flex items-center gap-5">
                  <h2 className="text-xl text-center font-normal text-white_title">Vagas:</h2>
                  <p className="text-white_primary font-extralight">{graduate.vacancies} vagas</p>
                </div>
                <div className="flex items-end gap-6">
                  <h2 className="text-xl text-center font-normal text-white_title">Ofertante:</h2>
                  <p className="text-white_primary font-extralight">{graduate.offerer}</p>
                </div>
                <div className="flex items-end gap-6">
                  <h2 className="text-xl text-center font-normal text-white_title">Link Edital:</h2>
                  <p className="flex items-center gap-1 text-white_primary font-extralight">
                    <AiOutlineLink size={20}/>
                    <a href={graduate.link} target="_blank" rel="noopener noreferrer">
                      {graduate.link}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-red-400"></div>
          </div>
        )}
      </div>
  )
}