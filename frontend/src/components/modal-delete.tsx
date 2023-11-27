'use client'
import { api } from "@/services/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { GiTrashCan } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { Loading } from "./loading";

type ModalDeleteProps = {
    id: string;
    entity: string;
}

export default function ModalDelete({
  id,
  entity
}: ModalDeleteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  
  const entityName = 
    entity === 'project' ? 'projeto' : 
    entity === 'graduation' ? 'vaga de pós graduação' : 
    'evento'

  const pageName =
    entity === 'project' ? 'extension-project' :
    entity === 'graduation' ? 'postGraduate' :
    'event'

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await api(`/api/${entity}/delete/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir');
      }

      setIsLoading(false);
      // Adicione aqui o código para atualizar a UI após a exclusão
      router.push(`/${pageName}`);

    } catch (error) {
      console.error(error);
    }
  };
    
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white_primary">
          <GiTrashCan size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <div></div>
            <AlertDialogTitle className="text-blue_primary font-bold text-xl text-center">Atenção</AlertDialogTitle>
            <AlertDialogCancel className="transform -translate-y-3 text-blue_primary"><IoIosClose size={20} /></AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-blue_primary font-normal text-lg text-center">
            Tem certeza que deseja excluir est{entity === 'graduation' ? 'a' : 'e'} {entityName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-25 h-10 bg-blue_primary text-white_primary" onClick={handleDelete}>{isLoading ? <Loading /> : 'Remover'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}