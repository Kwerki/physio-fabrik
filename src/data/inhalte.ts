// Alle Inhalte der Seite. Sie liegen als JSON in src/content/seite/ und werden
// im CMS (/admin) bearbeitet. Die Schemas hier prüfen beim Build, ob die Dateien
// vollständig sind — fehlt etwas, bricht der Build mit einer verständlichen
// Meldung ab und die Live-Seite bleibt unverändert.
//
// WICHTIG: Die Feldnamen hier müssen zu public/admin/config.yml passen.
//
// Zweisprachige Dateien haben die Form { "de": {...}, "en": {...} } (Sveltia
// CMS, i18n „single_file“). Deutsch ist die Quelle der Wahrheit: Fehlt im
// englischen Teil ein Feld (z. B. ein Foto, das nur einmal gepflegt wird),
// wird der deutsche Wert übernommen.
import { z } from 'astro/zod';
import kontaktJson from '../content/seite/kontakt.json';
import allgemeinJson from '../content/seite/allgemein.json';
import startJson from '../content/seite/start.json';
import leistungenJson from '../content/seite/leistungen.json';
import teamJson from '../content/seite/team.json';
import praxisJson from '../content/seite/praxis.json';
import stellenJson from '../content/seite/stellen.json';
import kontaktbereichJson from '../content/seite/kontaktbereich.json';

export type Sprache = 'de' | 'en';

// Das CMS speichert leere optionale Felder teils als null oder ""
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === null || v === '' ? undefined : v), schema.optional());
const liste = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).nullish().transform((v) => v ?? []);
const text = z.string().min(1);
const foto = z.string().min(1);
// Bildausschnitt: 0 = oberer Bildrand, 100 = unterer Bildrand
const ausschnitt = z.coerce.number().min(0).max(100).default(50);

const uhrzeit = z.string().regex(/^\d{1,2}:\d{2}$/, 'Uhrzeit bitte als HH:MM, z. B. 08:00');

const kontaktSchema = z.object({
  praxisname: text,
  inhaber: text,
  strasse: text,
  etage: z.coerce.number().int().min(0).max(20),
  plz: text,
  ort: text,
  gebaeude: optional(z.string()),
  gebaeudeUrl: optional(z.string().url()),
  telefon: text,
  email: z.string().email(),
  lat: z.number(),
  lon: z.number(),
  oeffnungszeiten: liste(
    z.object({ tag: z.enum(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']), von: uhrzeit, bis: uhrzeit }),
  ),
});

const allgemeinSchema = z.object({
  seoTitel: text,
  seoBeschreibung: text,
  teilenBeschreibung: text,
  fusszeile: text,
});

const startSchema = z.object({
  eyebrow: text,
  titel: text,
  einleitung: text,
  knopfAnrufen: text,
  knopfEmail: text,
  foto,
  fotoBeschreibung: text,
  fotoAusschnitt: ausschnitt,
  fotoName: text,
  fotoRolle: text,
  infoleiste: liste(z.string()),
});

const leistungenSchema = z.object({
  eyebrow: text,
  titel: text,
  einleitung: text,
  foto,
  fotoBeschreibung: text,
  fotoAusschnitt: ausschnitt,
  gruppen: liste(
    z.object({
      titel: text,
      hinweis: optional(z.string()),
      eintraege: liste(z.object({ name: text, kuerzel: optional(z.string()), text })),
    }),
  ),
});

const teamSchema = z.object({
  eyebrow: text,
  titel: text,
  einleitung: text,
  personen: liste(
    z.object({
      name: text,
      rolle: text,
      foto: optional(z.string()),
      fotoBeschreibung: optional(z.string()),
      qualifikationen: liste(z.string()),
    }),
  ),
  jobsLink: text,
  bandFoto: optional(z.string()),
  bandFotoBeschreibung: optional(z.string()),
  bandFotoTitel: optional(z.string()),
  bandFotoAusschnitt: ausschnitt,
});

const praxisSchema = z.object({
  eyebrow: text,
  titel: text,
  einleitung: text,
  foto,
  fotoBeschreibung: text,
  fotoAusschnitt: ausschnitt,
  kennzahlen: liste(z.object({ zahl: text, text })),
  merkmale: liste(z.string()),
  galerie: liste(z.object({ foto, titel: text, beschreibung: text })),
});

const stellenSchema = z.object({
  anzeigen: z.boolean().default(true),
  eyebrow: text,
  titel: text,
  einleitung: text,
  stellen: liste(z.object({ titel: text, umfang: optional(z.string()), text })),
  kontaktSatz: text,
});

const kontaktbereichSchema = z.object({
  eyebrow: text,
  titel: text,
  formularHinweis: text,
  gesundheitsHinweis: optional(z.string()),
});

/** Füllt Lücken in `uebersetzung` mit den Werten aus `quelle` (rekursiv, Listen nach Position). */
function ergaenze(quelle: unknown, uebersetzung: unknown): unknown {
  if (uebersetzung === undefined || uebersetzung === null || uebersetzung === '') return quelle;
  if (Array.isArray(quelle) && Array.isArray(uebersetzung)) {
    // Listen mit Objekten (z. B. Galerie) sind im CMS gepaart: gleiche Länge,
    // gleiche Reihenfolge. Listen mit reinem Text werden je Sprache gepflegt.
    if (quelle.every((e) => typeof e === 'object' && e !== null)) {
      return quelle.map((e, i) => ergaenze(e, uebersetzung[i]));
    }
    return uebersetzung;
  }
  if (isObject(quelle) && isObject(uebersetzung)) {
    const out: Record<string, unknown> = { ...uebersetzung };
    for (const [k, v] of Object.entries(quelle)) out[k] = ergaenze(v, uebersetzung[k]);
    return out;
  }
  return uebersetzung;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function pruefe<T extends z.ZodTypeAny>(datei: string, schema: T, daten: unknown): z.infer<T> {
  const ergebnis = schema.safeParse(daten);
  if (!ergebnis.success) {
    const fehler = ergebnis.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`src/content/seite/${datei} ist unvollständig:\n${fehler}`);
  }
  return ergebnis.data;
}

function zweisprachig<T extends z.ZodTypeAny>(datei: string, schema: T, json: unknown) {
  const roh = json as { de?: unknown; en?: unknown };
  if (!roh.de) throw new Error(`src/content/seite/${datei}: deutscher Teil („de“) fehlt`);
  const de = pruefe(`${datei} (de)`, schema, roh.de);
  const en = pruefe(`${datei} (en)`, schema, ergaenze(roh.de, roh.en));
  return (sprache: Sprache): z.infer<T> => (sprache === 'en' ? en : de);
}

export const kontakt = pruefe('kontakt.json', kontaktSchema, kontaktJson);
export const allgemein = zweisprachig('allgemein.json', allgemeinSchema, allgemeinJson);
export const start = zweisprachig('start.json', startSchema, startJson);
export const leistungen = zweisprachig('leistungen.json', leistungenSchema, leistungenJson);
export const team = zweisprachig('team.json', teamSchema, teamJson);
export const praxis = zweisprachig('praxis.json', praxisSchema, praxisJson);
export const stellen = zweisprachig('stellen.json', stellenSchema, stellenJson);
export const kontaktbereich = zweisprachig('kontaktbereich.json', kontaktbereichSchema, kontaktbereichJson);

// --- Abgeleitete Angaben ---------------------------------------------------

/** „0561 82020145“ → „+4956182020145“ für tel:-Links */
export const telefonLink = (() => {
  const ziffern = kontakt.telefon.replace(/[^\d+]/g, '');
  if (ziffern.startsWith('+')) return ziffern;
  if (ziffern.startsWith('00')) return `+${ziffern.slice(2)}`;
  return `+49${ziffern.replace(/^0/, '')}`;
})();

const tageEn: Record<string, string> = { Mo: 'Mon', Di: 'Tue', Mi: 'Wed', Do: 'Thu', Fr: 'Fri', Sa: 'Sat', So: 'Sun' };
export const tageSchema: Record<string, string> = {
  Mo: 'Monday', Di: 'Tuesday', Mi: 'Wednesday', Do: 'Thursday', Fr: 'Friday', Sa: 'Saturday', So: 'Sunday',
};

/** Öffnungszeiten für die Tabelle; Tage ohne Eintrag am Ende als „geschlossen“ */
export function zeiten(sprache: Sprache) {
  const reihenfolge = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const offen = [...kontakt.oeffnungszeiten].sort((a, b) => reihenfolge.indexOf(a.tag) - reihenfolge.indexOf(b.tag));
  const zu = reihenfolge.filter((t) => !offen.some((o) => o.tag === t));
  const tag = (t: string) => (sprache === 'en' ? tageEn[t] : t);
  const zeilen = offen.map((o) => ({ tag: tag(o.tag), zeit: `${o.von} – ${o.bis}` }));
  if (zu.length) {
    // Aufeinanderfolgende geschlossene Tage zusammenfassen („Sa–So“)
    const zusammen =
      zu.length > 1 && reihenfolge.indexOf(zu[zu.length - 1]) - reihenfolge.indexOf(zu[0]) === zu.length - 1
        ? `${tag(zu[0])}–${tag(zu[zu.length - 1])}`
        : zu.map(tag).join(', ');
    zeilen.push({ tag: zusammen, zeit: sprache === 'en' ? 'closed' : 'geschlossen' });
  }
  return zeilen;
}

export function etage(sprache: Sprache) {
  const n = kontakt.etage;
  if (sprache === 'de') return n === 0 ? 'EG' : `${n}. OG`;
  if (n === 0) return 'ground floor';
  const endung = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
  return `${n}${endung} floor`;
}
