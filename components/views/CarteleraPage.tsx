"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Info } from "lucide-react"
import { Cine, useCines } from "@/hooks/useCines"
import { Pelicula, usePeliculas } from "@/hooks/usePeliculas"

export default function CarteleraPage() {
  const cines: Cine[] = useCines()
  const peliculas: Pelicula[] = usePeliculas().cartelera

  const [selectedCinema, setSelectedCinema] = useState<string>("1")
  const [selectedDate, setSelectedDate] = useState("hoy")
  const [selectedFormat, setSelectedFormat] = useState("todos")
  const [selectedLanguage, setSelectedLanguage] = useState("todos")

  const dates = [
    { id: "hoy", label: "Hoy" },
    { id: "manana", label: "Mañana" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
  ]

  const selectedCinemaData = cines.find((cine) => cine.id === Number(selectedCinema))

  const mappedMovies = peliculas.map((movie) => {
    const match = selectedCinemaData?.cartelera.find((c) => c.id === movie.id)
    return match
      ? { ...movie, horarios: match.horarios }
      : null
  })

  const filteredMovies = mappedMovies.filter(
    (movie): movie is Pelicula & { horarios: string[] } =>
      movie !== null &&
      (selectedFormat === "todos" || (Array.isArray(movie.formato) && movie.formato.includes(selectedFormat))) &&
      (selectedLanguage === "todos" || (Array.isArray(movie.idioma) && movie.idioma.includes(selectedLanguage)))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 uppercase">Cartelera</h1>

      <div className="mb-8">
        <Select value={selectedCinema} onValueChange={setSelectedCinema}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Selecciona un cine" />
          </SelectTrigger>
          <SelectContent>
            {cines.map((cine) => (
              <SelectItem key={cine.id} value={String(cine.id)}>
                {cine.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCinemaData && (
        <Card className="mb-8 bg-cinemark-dark border-cinemark-gray">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{selectedCinemaData.nombre}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-cinemark-red shrink-0 mt-0.5" />
                <p className="text-gray-300">{selectedCinemaData.direccion}</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-cinemark-red shrink-0 mt-0.5" />
                <p className="text-gray-300">Horario: {selectedCinemaData.horario}</p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <Info className="h-5 w-5 text-cinemark-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 mb-2">Servicios:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCinemaData?.servicios?.map((servicio) => (
                      <Badge key={servicio} variant="outline" className="border-cinemark-gold text-cinemark-gold">
                        {servicio}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-cinemark-red" />
          <h2 className="text-lg font-semibold uppercase">Selecciona una fecha</h2>
        </div>
        <Tabs value={selectedDate} onValueChange={setSelectedDate} className="w-full">
          <TabsList className="w-full grid grid-cols-3 md:grid-cols-7 h-auto">
            {dates.map((date) => (
              <TabsTrigger key={date.id} value={date.id} className="py-2 uppercase">
                {date.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="format-filter" className="block text-sm font-medium mb-2 uppercase">Formato</label>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los formatos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los formatos</SelectItem>
              <SelectItem value="2D">2D</SelectItem>
              <SelectItem value="3D">3D</SelectItem>
              <SelectItem value="XD">XD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="language-filter" className="block text-sm font-medium mb-2 uppercase">Idioma</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los idiomas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los idiomas</SelectItem>
              <SelectItem value="DOB">Doblada</SelectItem>
              <SelectItem value="SUB">Subtitulada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="bg-cinemark-dark border border-cinemark-gray rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
                <div className="relative h-[300px] md:h-full">
                  <Image src={movie.imagen || "/placeholder.svg"} alt={movie.titulo} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{movie.titulo}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm text-gray-300">{movie.duracion}</span>
                        <Badge variant="outline" className="text-white border-white">{movie.clasificacion}</Badge>
                        {movie.formato?.map((format: string) => (
                          <Badge key={format} className="bg-cinemark-gold text-black hover:bg-cinemark-gold/80">
                            {format}
                          </Badge>
                        ))}
                        {movie.idioma?.map((lang: string) => (
                          <Badge key={lang} variant="outline" className="border-cinemark-red text-cinemark-red">
                            {lang === "DOB" ? "Doblada" : "Subtitulada"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">Horarios disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {movie.horarios?.map((time: string) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="border-cinemark-gray hover:border-cinemark-red hover:bg-cinemark-red/10"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No se encontraron películas con los filtros seleccionados.</p>
            <Button
              variant="link"
              className="text-cinemark-red mt-2"
              onClick={() => {
                setSelectedFormat("todos")
                setSelectedLanguage("todos")
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
