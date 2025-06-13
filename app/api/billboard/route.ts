import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cinemaId = req.nextUrl.searchParams.get("cinema_id") || "740"

  try {
    const res = await fetch(`https://api.cinemark-peru.com/api/vista/data/billboard?cinema_id=${cinemaId}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener datos de la cartelera" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
