# PhysioFabrik — Praxis-Website

Website der Physiotherapie-Praxis PhysioFabrik in Vellmar, live unter
<https://physio-fabrik.de> (Deutsch) und <https://physio-fabrik.de/en/> (Englisch).
Umgesetzt ist Design-Richtung **1b „Werkstatt"** aus dem Handoff: schwarzer Hero
mit Rasteroverlay, sehr große Headline, Grün als Akzent, keine abgerundeten
Ecken, Trennlinien statt Karten.

| Was | Womit |
| --- | --- |
| Website | [Astro](https://astro.build), statisches HTML, kein Server nötig |
| Admin-Panel | [Sveltia CMS](https://sveltiacms.app) unter `/admin`, speichert direkt in dieses Repo (wie bei der Klavierschule und LUU) |
| Hosting | GitHub Pages, Build per GitHub Action bei jedem Push auf `main` |
| Schriften | Archivo + IBM Plex Mono, selbst gehostet (OFL-1.1) |

## Entwicklung

```sh
npm install
npm run dev       # http://127.0.0.1:4321 (läuft im Hintergrund; stoppen: npx astro dev stop)
npm run build     # Ausgabe in dist/
```

Für die Handyansicht in den DevTools die Device Toolbar auf 390 px stellen.

Das CMS lokal ohne Login: <http://127.0.0.1:4321/admin/index.html> →
„Work with Local Repository“ → Projektordner wählen (nur Chrome/Edge).

## Struktur

```
src/content/seite/*.json    ALLE Inhalte, ein Abschnitt pro Datei (im CMS bearbeitbar)
src/data/inhalte.ts         liest und prüft die JSON-Dateien (muss zu public/admin/config.yml passen)
src/components/
  Startseite.astro          die komplette Startseite, eine Vorlage für DE und EN
  Header.astro, Footer.astro
src/pages/
  index.astro               / (Deutsch, mit strukturierten Daten für Google)
  en/index.astro            /en/ (Englisch)
  impressum.astro, datenschutz.astro   Rechtstexte — bewusst NICHT im CMS
src/lib/sprache.ts          feste Oberflächentexte (Navigation, Formular) und Anker je Sprache
src/assets/photos/          alle Fotos, auch Uploads aus dem CMS; Astro verkleinert sie beim Build
public/assets/css/style.css Tokens + gesamtes Layout (das Design steckt komplett hier)
public/assets/js/main.js    Menü, Formular (mailto), Öffnungsstatus, Animationen
public/assets/img/          Logos, Favicons, Anfahrtskarte, Vorschaubild zum Teilen
public/admin/               Sveltia CMS (index.html + config.yml)
ANLEITUNG.md                Anleitung für die Praxis
PLATZHALTER.md              Herkunft der Inhalte und offene Punkte

werkzeuge/                  karte.py (Anfahrtskarte aus OSM), bilder.py (Fotos aufbereiten)
design_handoff_physiofabrik/   Design-Referenz, nicht Teil der Auslieferung
```

## Inhalte und CMS

- **Zweisprachig.** Jede Inhaltsdatei hat die Form `{ "de": {...}, "en": {...} }`
  (Sveltia i18n). Deutsch ist die Quelle der Wahrheit. Fotos, Kürzel und Namen sind
  im CMS `i18n: duplicate` und gelten für beide Sprachen. Fehlt im englischen Teil
  ein Feld, übernimmt `src/data/inhalte.ts` den deutschen Wert.
- `kontakt.json` ist einsprachig und speist Kontaktabschnitt, Fußzeile, Handy-Menü,
  Impressum, Datenschutz, die strukturierten Daten für Google und den
  Live-Öffnungsstatus (`main.js` liest die Tabelle `dl.hours`).
- **Handy und Desktop** zeigen dieselben Inhalte. Die Unterschiede in der Darstellung
  (z. B. Hero-Foto nur ab 1024 px) stehen als 📱/🖥-Hinweise an den CMS-Feldern und
  in `ANLEITUNG.md`. Für zugeschnittene Fotos gibt es das Feld „Bildausschnitt“
  (0–100 → `object-position: center N%`).
- Ein leeres Pflichtfeld lässt den Build mit verständlicher Meldung scheitern. Die
  Live-Seite bleibt dann auf dem letzten Stand.
- Neue Felder immer an drei Stellen anlegen: JSON, `src/data/inhalte.ts`, `public/admin/config.yml`.

## CMS-Login

Per **fine-grained GitHub-Token** aus Pauls Konto, nur für dieses Repo,
*Contents: Read and write* (wie bei LUU). Die Praxis braucht kein eigenes
GitHub-Konto; ihre Änderungen erscheinen als Commits von Kwerki.

## Deployment

`.github/workflows/pages.yml` baut bei jedem Push auf `main` (auch aus dem CMS)
und veröffentlicht `dist/` auf GitHub Pages. Die Domain steht in `public/CNAME`.
Die Adressen sind dieselben wie zu Zeiten der statischen Seite
(`/impressum.html`, `/en/index.html` …, Astro `build.format: 'preserve'`).

## Offen

- **Mailversand** des Kontaktformulars. Derzeit öffnet es das Mailprogramm des
  Besuchers (mailto); die Fassung mit Serverversand steht in der Git-Historie
  (`site/index.html` vor der Umstellung auf Astro).

## Datenschutz — bitte so lassen

Die Seite kommt ohne Cookie-Banner aus, weil sie keine Cookies setzt, nicht
trackt, keine Karte einbettet und die Schriften selbst ausliefert. Wird eines
davon wieder eingebaut — insbesondere Google Fonts per CDN oder ein
Maps-iframe — ist eine Einwilligungslösung nötig. Das CMS unter `/admin` lädt
Sveltia von unpkg.com; das betrifft nur die Bearbeiter:innen, nicht die Besucher.
