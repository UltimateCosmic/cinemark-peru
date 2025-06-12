import { useEffect, useState } from "react";
import { BillboardResponse } from "@/types/billboard";

export const useBillboard = () => {
  const [billboard, setBillboard] = useState<BillboardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const res = await fetch("/api/billboard");
        if (!res.ok) throw new Error("Error al obtener la cartelera");

        const data: BillboardResponse[] = await res.json();
        setBillboard(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchBillboard();
  }, []);

  return { billboard, loading, error };
};
