"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  text?: string
}

export default function LoadingScreen({ text = "cargando..." }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true)

  // Efecto para ocultar el loading después de un tiempo (opcional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="animate-pulse-zoom">
        <Image
          src="https://cinemarkla.modyocdn.com/uploads/0fb71e7a-33c8-4970-906d-8baeba8243a6/original/Cinemark_Lettermark_RGB_crop_K.png"
          alt="Cinemark"
          width={200}
          height={100}
          className="object-contain invert"
        />
      </div>
      <p className="text-white mt-6 text-lg font-medium animate-pulse">{text}</p>
    </div>
  )
}
