"use client"
import { useEffect, useState } from "react"

export type Promocion = {
  id: number
  titulo: string
  inicio: string
  fin: string
  imagen: string
}

export function usePromociones() {
  const [promociones, setPromociones] = useState<Promocion[]>([])

  useEffect(() => {
    fetch("/data/promociones.json")
      .then((res) => res.json())
      .then(setPromociones)
  }, [])

  return promociones
}
