import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-cinemark-dark border-t border-cinemark-gray text-sm text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sección: Programación */}
        <div>
          <h3 className="text-cinemark-gold font-semibold uppercase tracking-wider mb-4">Programación</h3>
          <ul className="space-y-2">
            <li><Link href="/cartelera" className="hover:text-white">Cartelera</Link></li>
            <li><Link href="/peliculas?categoria=proximamente" className="hover:text-white">Próximamente</Link></li>
            <li><Link href="/peliculas?categoria=preventa" className="hover:text-white">Preventa</Link></li>
          </ul>
        </div>

        {/* Sección: Sobre Cinemark */}
        <div>
          <h3 className="text-cinemark-gold font-semibold uppercase tracking-wider mb-4">Sobre Cinemark</h3>
          <ul className="space-y-2">
            <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="/salas-y-formatos" className="hover:text-white">Salas y Formatos</Link></li>
            <li><Link href="/terminos-y-condiciones" className="hover:text-white">Términos y condiciones</Link></li>
            <li><Link href="/politica-de-privacidad" className="hover:text-white">Política de Protección de Datos</Link></li>
          </ul>
        </div>

        {/* Sección: Otros Servicios */}
        <div>
          <h3 className="text-cinemark-gold font-semibold uppercase tracking-wider mb-4">Otros Servicios</h3>
          <ul className="space-y-2">
            <li><Link href="/eventos-especiales" className="hover:text-white">Eventos especiales</Link></li>
            <li><Link href="/corporativo" className="hover:text-white">Corporativo</Link></li>
            <li><Link href="/publicidad" className="hover:text-white">Publicidad</Link></li>
            <li><Link href="/trabaja-con-nosotros" className="hover:text-white">Trabaja con nosotros</Link></li>
          </ul>
        </div>

        {/* Sección: Contacto y Social */}
        <div>
          <h3 className="text-cinemark-gold font-semibold uppercase tracking-wider mb-4">Contacto</h3>
          <ul className="space-y-2 mb-6">
            <li><Link href="/contacto" className="hover:text-white">Escríbenos</Link></li>
            <li><Link href="/devolucion" className="hover:text-white">Formulario de Devolución</Link></li>
            <li><Link href="/comprobante" className="hover:text-white">Ver mi comprobante</Link></li>
            <li><Link href="/libro-de-reclamaciones" className="hover:text-white">Libro de Reclamaciones</Link></li>
          </ul>

          <h3 className="text-cinemark-gold font-semibold uppercase tracking-wider mb-2">Síguenos</h3>
          <div className="flex space-x-4 mb-4">
            <Link href="https://facebook.com/CinemarkPeru" className="hover:text-white" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
            <Link href="https://instagram.com/cinemarkperu" className="hover:text-white" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
            <Link href="https://twitter.com/Cinemark_peru" className="hover:text-white" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
            <Link href="https://youtube.com" className="hover:text-white" aria-label="YouTube"><Youtube className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-cinemark-gray py-4 text-center text-xs text-gray-400">
        Cinemark del Perú S.R.L - RUC: 20337771085 © 2025
      </div>
    </footer>
  )
}
