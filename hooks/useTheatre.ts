import { useEffect, useState } from "react";
import { TheatreGroup } from "@/types/theatre";

export const useTheatre = () => {
  const [theatres, setTheatres] = useState<TheatreGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await fetch("/api/theatre");
        if (!res.ok) throw new Error("Error al obtener los cines");

        const data: TheatreGroup[] = await res.json();
        setTheatres(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  return { theatres, loading, error };
};
