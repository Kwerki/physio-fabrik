import type { ImageMetadata } from 'astro';

// Alle Fotos liegen in src/assets/photos, auch die Uploads aus dem CMS.
// So verkleinert Astro sie beim Build und liefert passende Größen aus.
const dateien = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

const nachName = new Map(Object.entries(dateien).map(([pfad, datei]) => [pfad.split('/').pop()!, datei.default]));

/** Liefert ein Foto. Akzeptiert den Pfad aus dem CMS („/photos/raum.webp“). */
export function foto(pfad: string): ImageMetadata {
  const name = pfad.split('/').pop()!;
  const datei = nachName.get(name);
  if (!datei) throw new Error(`Foto „${pfad}“ fehlt in src/assets/photos`);
  return datei;
}
