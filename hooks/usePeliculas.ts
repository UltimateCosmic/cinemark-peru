import { useEffect, useState } from "react"

export type Pelicula = {
  id: number
  titulo: string
  duracion: string
  clasificacion: string
  genero?: string | string[]
  imagen: string
  formato?: string[]
  idioma?: string[]
  horarios?: string[]
}

export function usePeliculas() {
  const [data, setData] = useState<{
    cartelera: Pelicula[]
    proximosEstrenos: Pelicula[]
  }>({ cartelera: [], proximosEstrenos: [] })

  useEffect(() => {
    fetch("/data/peliculas.json")
      .then((res) => res.json())
      .then(setData)
  }, [])

  return data
}
