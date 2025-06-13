import { useEffect, useState } from "react";
import { ComingSoonResponse, ComingSoonMovie } from "@/types/coming-soon";

export const useComingSoon = () => {
  const [comingSoon, setComingSoon] = useState<ComingSoonMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComingSoon = async () => {
      try {
        const res = await fetch("/api/coming-soon");
        if (!res.ok) throw new Error("Error al obtener los próximos estrenos");

        const data: ComingSoonResponse = await res.json();
        setComingSoon(data.value || []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchComingSoon();
  }, []);

  return { comingSoon, loading, error };
};
