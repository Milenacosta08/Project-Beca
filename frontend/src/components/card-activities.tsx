'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Image from 'next/image'
import Link from "next/link";
import { Button } from "./ui/button";

interface CardActivitiesProps {
  id: number
  description?: string
  vacancies?: string
  title: string
  offerer: string
  startDate: string
  endDate?: string
  categories: string[]
  pathImage?: string
  entity: string
}

export default function CardActivities({
  id,
  description,
  vacancies,
  title,
  offerer,
  startDate,
  endDate,
  categories,
  pathImage,
  entity
}: CardActivitiesProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Card className="max-w-350 h-auto">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="rounded-lg bg-background_modal flex flex-col pb-3"
      >
        <CollapsibleTrigger asChild className="rounded-lg">
          <CardHeader className="bg-background_modal w-full">
            <Image 
              src="/images/beca-capa.png"
              width={350}
              height={150}
              alt="Logo Beca"
              className="rounded-lg"
            />
            <div className="flex flex-col h-24 px-3 justify-center">
              <CardTitle className="text-blue_primary text-center text-lg font-normal">{title}</CardTitle>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-background_modal space-y-2 text">
          <CardContent className="flex flex-col gap-3">
            {description ? (
              <CardDescription>{description}</CardDescription>
            ): vacancies && (
              <CardDescription>{`${vacancies} vagas`}</CardDescription>
            )}
            <CardDescription>{offerer}</CardDescription>
            <CardDescription>{startDate} - {endDate}</CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Link  href={`/${entity}/view/${id}`}>
              <Button variant="link" className="text-blue_light w-auto text-md">
                Saber mais
              </Button>
            </Link>
          </CardFooter>
        </CollapsibleContent>
        {!isOpen && !categories ? (
          <CardDescription className="mt-auto ml-auto pr-3">{startDate} - {endDate ?? `${endDate}`}</CardDescription>
        ):(
          !isOpen && categories?.length > 0 && (
            <CardDescription className="mt-auto ml-auto pr-3">{categories.splice(0, 1)}</CardDescription>
          )
        )}
      </Collapsible>
    </Card>
  )
}