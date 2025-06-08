"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Cartelera", href: "/cartelera" },
  { name: "Películas", href: "/peliculas" },
  { name: "Cines", href: "/cines" },
  { name: "Promociones", href: "/promociones" },
  { name: "Confitería", href: "/confiteria" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black border-b border-cinemark-gray sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Cinemark Perú</span>
            <Image
              src="/cinemark-logo.png"
              alt="Cinemark Perú"
              width={30}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 uppercase">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-cinemark-red transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-cinemark-red">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-cinemark-red">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-cinemark-red hover:bg-red-700 text-white uppercase">
            Comprar Entradas
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-cinemark-gray">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Cinemark Perú</span>
              <Image
                src="/placeholder.svg?height=40&width=150"
                alt="Cinemark Perú"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-800">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-cinemark-gray"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" className="text-white hover:text-cinemark-red">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:text-cinemark-red">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="default" className="w-full bg-cinemark-red hover:bg-red-700 text-white">
                  Comprar Entradas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
