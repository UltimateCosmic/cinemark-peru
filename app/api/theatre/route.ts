import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.cinemark-peru.com/api/vista/data/theatres", {
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener datos de cines" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
