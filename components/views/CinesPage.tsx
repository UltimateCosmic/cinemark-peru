"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Clock, Phone, Navigation } from "lucide-react"
import { useCines } from "@/hooks/useCines"

export default function CinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("todos")
  const cines = useCines()

  // Obtener distritos únicos para el filtro
  const districts = [...new Set(cines.map((cine) => cine.direccion.split(", ").pop() || ""))].sort()

  // Filtrar cines según la búsqueda y distrito seleccionado
  const filteredCines = cines.filter((cine) => {
    const matchesSearch =
      searchQuery === "" ||
      cine.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cine.direccion.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDistrict = selectedDistrict === "todos" || cine.direccion.includes(selectedDistrict)

    return matchesSearch && matchesDistrict
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 uppercase">Nuestros Cines</h1>

      {/* Filtros */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre o dirección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-cinemark-dark border-cinemark-gray"
          />
        </div>

        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="bg-cinemark-dark border-cinemark-gray">
            <SelectValue placeholder="Filtrar por distrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los distritos</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <p className="text-gray-300">
          {filteredCines.length === cines.length
            ? `Mostrando todos los ${cines.length} cines`
            : `Mostrando ${filteredCines.length} de ${cines.length} cines`}
        </p>
      </div>

      {filteredCines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCines.map((cine) => (
            <Card
              key={cine.id}
              className="cinema-card bg-cinemark-dark border-cinemark-gray overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <Image src={cine.imagen || "/placeholder.svg"} alt={cine.nombre} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{cine.nombre}</h3>

                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-cinemark-red shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{cine.direccion}</p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-cinemark-red" />
                  <p className="text-sm text-gray-300">{cine.horario}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-300 mb-2">Servicios:</p>
                  <div className="flex flex-wrap gap-1">
                    {cine.servicios?.map((service) => (
                      <Badge
                        key={service}
                        variant="outline"
                        className="border-cinemark-gold text-cinemark-gold text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full bg-cinemark-red hover:bg-red-700 text-white uppercase">Ver Cartelera</Button>
                  <Button
                    variant="outline"
                    className="w-full border-cinemark-gray text-gray-300 hover:bg-cinemark-gray/20 uppercase"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Cómo llegar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-4">No se encontraron cines que coincidan con tu búsqueda.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {searchQuery && (
              <Button variant="link" className="text-cinemark-red" onClick={() => setSearchQuery("")}>
                Limpiar búsqueda
              </Button>
            )}
            {selectedDistrict !== "todos" && (
              <Button variant="link" className="text-cinemark-red" onClick={() => setSelectedDistrict("todos")}>
                Ver todos los distritos
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
