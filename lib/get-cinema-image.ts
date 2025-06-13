import { cinemaImages } from "./cinema-images";

export function getCinemaImage(cinemaName: string): string | null {
  const key = Object.keys(cinemaImages).find((k) =>
    cinemaName.toUpperCase().includes(k)
  );
  return key ? cinemaImages[key] : null;
}
