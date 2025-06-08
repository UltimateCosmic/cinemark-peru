"use client"
import { useEffect, useState } from "react"

export type Cine = {
  id: number
  nombre: string
  direccion: string
  imagen: string
  cartelera: {
    id: number
    horarios: string[]
  }[]
  horario?: string
  servicios?: string[]
}

export function useCines() {
  const [cines, setCines] = useState<Cine[]>([])

  useEffect(() => {
    fetch("/data/cines.json")
      .then((res) => res.json())
      .then(setCines)
  }, [])

  return cines
}
