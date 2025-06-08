"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePeliculas } from "@/hooks/usePeliculas"
import { Pelicula } from "@/hooks/usePeliculas"

export default function PeliculasPage() {
  const { cartelera, proximosEstrenos } = usePeliculas()
  const [searchQuery, setSearchQuery] = useState("")

  // Simular preventa
  const preventa = proximosEstrenos.slice(0, 2).map((p) => ({
    ...p,
    releaseDate: p.fechaEstreno,
  }))

  // Filtrar películas según la búsqueda
  const filterMovies = (movies: Pelicula[]) => {
    if (!searchQuery) return movies
    return movies.filter(
      (movie) =>
        movie.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.genero && (Array.isArray(movie.genero) ? movie.genero.join(' ').toLowerCase() : movie.genero.toLowerCase()).includes(searchQuery.toLowerCase()))
    )
  }

  const filteredCartelera = filterMovies(cartelera)
  const filteredPreventa = filterMovies(preventa)
  const filteredProximamente = filterMovies(proximosEstrenos)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 uppercase">Películas</h1>

      {/* Buscador */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar películas por título o género..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-cinemark-dark border-cinemark-gray"
        />
      </div>

      <Tabs defaultValue="cartelera" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger value="cartelera" className="uppercase">En Cartelera</TabsTrigger>
          <TabsTrigger value="preventa" className="uppercase">Preventa</TabsTrigger>
          <TabsTrigger value="proximamente" className="uppercase">Próximamente</TabsTrigger>
        </TabsList>

        {/* Cartelera */}
        <TabsContent value="cartelera">
          <PeliculasGrid peliculas={filteredCartelera} tipo="cartelera" />
        </TabsContent>

        {/* Preventa */}
        <TabsContent value="preventa">
          <PeliculasGrid peliculas={filteredPreventa} tipo="preventa" />
        </TabsContent>

        {/* Próximamente */}
        <TabsContent value="proximamente">
          <PeliculasGrid peliculas={filteredProximamente} tipo="proximamente" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PeliculasGrid({ peliculas, tipo }: { peliculas: Pelicula[]; tipo: string }) {
  if (!peliculas.length) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">No se encontraron películas que coincidan con tu búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {peliculas.map((movie) => (
        <div key={movie.id} className="movie-card group relative rounded-lg overflow-hidden">
          {tipo === "preventa" && (
            <div className="absolute top-0 right-0 z-10 bg-cinemark-red text-white text-xs font-bold px-2 py-1">
              PREVENTA
            </div>
          )}
          <Image
            src={movie.imagen || "/placeholder.svg"}
            alt={movie.titulo}
            width={300}
            height={450}
            className="w-full aspect-[2/3] object-cover"
          />
          <div className="movie-overlay absolute inset-0 bg-black/80 opacity-0 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-lg font-semibold line-clamp-2">{movie.titulo}</h3>
            <div className="flex flex-wrap gap-1 my-1">
              <Badge variant="outline" className="text-xs border-cinemark-gold text-cinemark-gold">
                {movie.genero || "Género"}
              </Badge>
            </div>
            <p className="text-xs text-gray-300 mb-2">
              {tipo === "preventa" || tipo === "proximamente"
                ? `Estreno: ${movie.fechaEstreno} • ${movie.clasificacion}`
                : `${movie.duracion} • ${movie.clasificacion}`}
            </p>
            <Button size="sm" className={
              tipo === "proximamente"
                ? "border-cinemark-red text-cinemark-white hover:bg-cinemark-red/10 w-full uppercase"
                : "bg-cinemark-red hover:bg-red-700 text-white w-full uppercase"
            }>
              {tipo === "proximamente" ? "Recordar Estreno" : tipo === "preventa" ? "Comprar Preventa" : "Ver Horarios"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
