import { api } from "@/services/api"
import CreateExtensionProject from "../../create/page"

type FormProps = {
    params: {
        id: string
    }
}

export interface ExtensionProject {
    id?: number
    title: string
    registration_date_start: Date
    registration_date_end: Date
    validity_date_start: Date
    validity_date_end: Date
    vacancies: number
    value: string
    duration: string
    link: string
    offerer: string
}

export default async function EditExtensionProject({ params: { id } }: FormProps) {
    // chamar formulário do create passando o id
    let project = {} as ExtensionProject

    try {
        const response = await api(`/api/project/get/${id}/`, {
            method: "GET",
        })
    
        const projectFinded = (await response.json()) as ExtensionProject

        project = projectFinded
    } catch (error) {
        console.log(error)
    }
    
    return (
        <CreateExtensionProject project={project} />
    )
}