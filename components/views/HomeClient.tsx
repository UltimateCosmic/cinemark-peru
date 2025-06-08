"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { usePeliculas } from "@/hooks/usePeliculas"
import { usePromociones } from "@/hooks/usePromociones"
import { useCines } from "@/hooks/useCines"

export default function Home() {

  const { cartelera, proximosEstrenos } = usePeliculas()
  const [currentMovie, setCurrentMovie] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const promociones = usePromociones()
  const cines = useCines()

  const posters = [
    "/bailarina/ana-de-armas.jpg",
    "/bailarina/john-wick.jpg",
    "/bailarina/norman-reedus.jpg",
    "/bailarina/sooyoung.jpg",
  ]

  const movie = {
    title: "Bailarina",
    description: "Una asesina entrenada en las tradiciones de la organización Ruska Roma se embarca en una misión de venganza tras la muerte de su padre.",
    logo: "/bailarina/ballerina-logo.png"
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % posters.length)
    }, 3000)
  
    return () => clearInterval(interval)
  }, [posters.length])  

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {posters.map((poster, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentMovie === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <Image
              src={poster}
              alt={movie.title}
              fill
              className="object-cover object-top"
              priority={index === 0}
              style={{
                transform: scrollY !== undefined ? `translateY(${scrollY * 0.2}px)` : undefined,
                transition: "transform 0.1s ease-out",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <div
              className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto"
              style={{
                transform: scrollY !== undefined ? `translateY(${scrollY * -0.05}px)` : undefined,
                transition: "transform 0.1s ease-out",
              }}
            >
              <Image
                src={movie.logo}
                alt={movie.title}
                width={500}
                height={100}
                className="mb-4"
                priority
              />
              <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">{movie.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-cinemark-red hover:bg-red-700 text-white uppercase">Comprar Entradas</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 uppercase">
                  Ver Trailer
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {posters.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${currentMovie === index ? "bg-cinemark-red" : "bg-white/50"
                }`}
              onClick={() => setCurrentMovie(index)}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* En Cartelera Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">En Cartelera</h2>
          <Link href="/cartelera" className="text-cinemark-red hover:text-red-400 flex items-center">
            Ver todo <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {cartelera.map((movie) => (
            <div key={movie.id} className="movie-card group relative rounded-lg overflow-hidden">
              <Image
                src={movie.imagen}
                alt={movie.titulo}
                width={300}
                height={450}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="movie-overlay absolute inset-0 bg-black/70 opacity-0 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold">{movie.titulo}</h3>
                <p className="text-xs text-gray-300 mb-2">{movie.duracion} • {movie.clasificacion} • {movie.genero}</p>
                <Button size="sm" className="bg-cinemark-red hover:bg-red-700 text-white w-full">
                  Ver Horarios
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximos Estrenos */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto bg-cinemark-dark rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">Próximos Estrenos</h2>
          <Link
            href="/peliculas?categoria=proximamente"
            className="text-cinemark-red hover:text-red-400 flex items-center"
          >
            Ver todo <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proximosEstrenos.map((movie) => (
            <div key={movie.id} className="flex bg-black/50 rounded-lg overflow-hidden">
              <Image
                src={movie.imagen}
                alt={movie.titulo}
                width={150}
                height={200}
                className="w-1/3 object-cover"
              />
              <div className="p-4 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-lg font-semibold">{movie.titulo}</h3>
                  <p className="text-xs text-gray-300 mb-2">Estreno: {movie.fechaEstreno}</p>
                  <p className="text-sm text-gray-300 line-clamp-2">{movie.descripcion}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-cinemark-red text-cinemark-red hover:bg-cinemark-red/10 uppercase"
                >
                  Recordar Estreno
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promociones Destacadas */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">Promociones Destacadas</h2>
          <Link href="/promociones" className="text-cinemark-red hover:text-red-400 flex items-center">
            Ver todo <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promociones.map((promo) => (
            <div
              key={promo.titulo}
              className="promo-card rounded-lg overflow-hidden border border-cinemark-gray bg-cinemark-dark"
            >
              <div className="overflow-hidden">
                <Image
                  src={promo.imagen}
                  alt={promo.titulo}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{promo.titulo}</h3>
                <p className="text-sm text-gray-300 mb-4">Válido hasta: {promo.fin}</p>
                <Button
                  variant="outline"
                  className="w-full border-cinemark-red text-cinemark-red hover:bg-cinemark-red/10 uppercase"
                >
                  Ver Detalle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nuestros Cines */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">Nuestros Cines</h2>
          <Link href="/cines" className="text-cinemark-red hover:text-red-400 flex items-center">
            Ver todo <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cines.map((cinema) => (
            <div
              key={cinema.id}
              className="cinema-card rounded-lg overflow-hidden border border-cinemark-gray bg-cinemark-dark transition-transform duration-300"
            >
              <Image
                src={`${cinema.imagen}`}
                alt={`Cine ${cinema}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Cinemark Jockey Plaza</h3>
                <p className="text-sm text-gray-300 mb-2">Av. Javier Prado Este 4200, Santiago de Surco</p>
                <Button className="w-full bg-cinemark-red hover:bg-red-700 text-white uppercase">Ver Cartelera</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
