# Handoff: PhysioFabrik — Praxis-Website

## Überblick
One-Pager für eine Physiotherapie-Praxis. Ziel: neue Patienten gewinnen, Terminanfrage per Telefon / E-Mail / Formular, Leistungen verständlich erklären. Zwei Breakpoints sind entworfen: Desktop (1440 px Referenzbreite) und Phone (390 px). Sprachen: Deutsch (primär) mit EN-Umschalter.

## Zu den Design-Dateien
Die Dateien in diesem Bündel sind **Design-Referenzen in HTML** — Prototypen, die Aussehen und Verhalten zeigen, **kein Produktionscode zum Kopieren**. Die Aufgabe ist, diese Entwürfe in der Zielumgebung neu zu bauen (Astro, Next, Vue, plain HTML — je nach Projekt) mit deren etablierten Mustern. Existiert noch keine Umgebung: siehe „Empfohlener Stack" unten.

`PhysioFabrik Website.dc.html` ist ein Vergleichs-Canvas: **drei Design-Richtungen** (1a, 1b, 1c) nebeneinander, jede in Desktop- und Phone-Fassung. **Es ist noch keine Richtung final gewählt.** Vor der Implementierung muss eine Richtung (oder eine Kombination) entschieden werden. Die Datei enthält ein leichtes Präsentations-Chrome (graue Umgebung, Badges „1a/1b/1c", Karten-Rahmen) — das gehört **nicht** zum Design und wird nicht nachgebaut.

Öffnen: Datei direkt im Browser öffnen. `support.js` muss daneben liegen.

## Fidelity
**High-fidelity** für Farben, Typografie, Abstände, Rasterlogik und Copy — diese Werte sind final gemeint und sollen pixelnah übernommen werden.

**Bewusst offen / noch nicht entworfen:**
- Alle Fotos sind Platzhalter (diagonal schraffierte Flächen mit Beschriftung). Echte Bilder folgen.
- Praxisname im Fließtext, Adresse, Telefonnummer, E-Mail, Öffnungszeiten und die Zahlen im Hero (14 Jahre, 30 min) sind **Platzhalter** und müssen vor Livegang ersetzt werden.
- Preis „Wärmepackung" steht auf „auf Anfrage" — echter Preis fehlt noch.
- Nicht entworfen: Team-/Über-uns-Abschnitt, Kontakt-/Anfahrtsabschnitt, Footer, Impressum, Datenschutz, mobiles Menü im geöffneten Zustand, EN-Übersetzungen der Texte.

## Design-Tokens

### Farben
| Rolle | Wert |
|---|---|
| Tinte / Schwarz | `#0E0F0E` |
| Papier / Weiß | `#FAFAF8` |
| Flächen-Grau (Sektionshintergrund 1a) | `#F2F3EF` |
| Grün — Akzent | `oklch(0.74 0.12 150)` ≈ `#7FCB9B` |
| Grün — Text auf Weiß (dunkler, für Kontrast) | `oklch(0.55 0.11 150)` ≈ `#4A8F66` |
| Grün — Flächen-Tint (1c Privatleistungen) | `oklch(0.96 0.02 150)` ≈ `#EDF6F0` |
| Linie auf Weiß | `rgba(0,0,0,.10)` – `.12` (leicht), `.15` – `.25` (Rahmen/Inputs) |
| Linie auf Schwarz | `rgba(255,255,255,.14)`, Buttons `.30` |
| Text sekundär auf Weiß | `rgba(0,0,0,.62)` |
| Text tertiär / Labels | `rgba(0,0,0,.35)` – `.50` |
| Text sekundär auf Schwarz | `rgba(255,255,255,.68)` |

Regel: **Grün ist Akzent, nie Fläche für Fließtext.** Auf Weiß immer die dunklere Variante für Text (Kontrast), die helle Variante nur für Flächen, Linien und Marker.

### Typografie
- **Archivo** (Google Fonts, 400/500/600/700) — Überschriften, UI, Fließtext
- **IBM Plex Mono** (400/500) — Labels, Kürzel, Zahlen, Öffnungszeiten, Kontaktleiste. Trägt den „technischen" Charakter.

| Element | Desktop | Phone |
|---|---|---|
| H1 (1a) | 600 / 62px / 1.03 / -.025em | 600 / 40px / 1.04 |
| H1 (1b) | 700 / 92px / .96 / -.035em | 700 / 46px / .98 |
| H1 (1c) | 600 / 56px / 1.05 / -.03em | 600 / 38px / 1.06 |
| Hero-Lead | 400 / 17–18px / 1.65 | 400 / 15px / 1.6 |
| Sektions-Überschrift | 600 / 18–24px / 1.25 | 600 / 18px / 1.25 |
| Leistungszeile | 500–600 / 16–22px / 1.3 | 500 / 15px / 1.3 |
| Fließtext | 400 / 14px / 1.6 | 400 / 14px / 1.6 |
| Eyebrow / Label (Mono) | 500 / 11px / 1, letter-spacing .12–.14em, UPPERCASE | 500 / 10px / 1 |
| Kennzahl | 600 / 26px / 1 | 600 / 20px / 1 |
| Nav-Item | 500 / 13px / 1 | — |
| Button | 500 / 14px / 1 | 500 / 15px / 1 |
| Input-Placeholder | 400 / 13.5px / 1 | 400 / 13.5px / 1 |

`text-wrap: pretty` auf Absätzen, `text-wrap: balance` auf H1.

### Abstände & Raster
- Desktop-Seitenrand: **56px** (1a, 1b), **52px** (1c)
- Phone-Seitenrand: **20px**
- Header-Höhe: 82px Desktop / 60px Phone (1c: 88px + 58px Utility-Leiste darüber / 64px + 40px)
- Sektions-Innenabstand Desktop: 38–96px vertikal
- Button-Padding: `16px 24px` (Desktop), `17px 20px` full-width (Phone)
- **Border-Radius: 0 überall.** Keine abgerundeten Ecken — das ist zentral für den Charakter.
- Trennlinien statt Karten: Inhalte werden durch 1px-Linien im Raster abgeteilt, nicht durch Schatten oder Boxen.

### Wiederkehrende Muster
- **Foto-Platzhalter:** `repeating-linear-gradient(135deg, rgba(0,0,0,.05) 0 7px, transparent 7px 14px)`, unten links ein Mono-Label mit 1px-Rahmen. Im finalen Bau durch echtes Bild ersetzen (`object-fit: cover`).
- **Eyebrow:** Mono, uppercase, letterspaced — meist mit vorangestelltem 26–44px-Strich in Grün.
- **Kennzahlenleiste:** 3 Spalten, durch vertikale 1px-Linien getrennt, Zahl groß in Archivo, Label klein in Mono.
- **Leistungszeile:** `display:flex; justify-content:space-between; align-items:baseline; gap:16px`, Name links, Kürzel oder Preis rechts in Mono, `border-bottom: 1px`.

## Die drei Richtungen

### 1a — „Klinisch Clean"
Heller Hero auf `#FAFAF8`, zweispaltig (Text 1.15fr / Bild .85fr), dünnes Raster, Grün nur als Signalpunkt (10×10px Quadrat) und in der Eyebrow. Darunter drei nummerierte Vertrauens-Spalten (01/02/03), dann der Leistungsblock zweispaltig: links „Auf Rezept" auf Weiß, rechts „Privatleistungen" auf `#F2F3EF`.
*Charakter:* zurückhaltend, medizinisch-seriös, viel Weißraum.

### 1b — „Werkstatt"
Schwarzer Hero (`#0E0F0E`) mit weißem Logo, Grid-Overlay (56px Raster, `rgba(255,255,255,.055)`), sehr große Headline (92px). Grüner CTA-Button im Header, grüner Strich in der Eyebrow. Unter dem Hero eine 4-spaltige Mono-Infoleiste (Öffnungszeiten, Hausbesuche, Parkplätze, Barrierefrei). Darunter Split: Foto links, Leistungsliste rechts auf Weiß — „Auf Rezept" als große Zeilen mit Kürzel rechts, dann „Privatleistungen" mit Preisen.
*Charakter:* selbstbewusst, industriell, hoher Kontrast.

### 1c — „Datenblatt"
Schwarze Utility-Leiste ganz oben (Telefon, E-Mail, Öffnungszeiten, Sprachumschalter). Header mit 2px schwarzer Unterkante, Nav als umrandete Kacheln, „Kontakt" grün gefüllt. Hero zweispaltig: links Headline + **Terminformular direkt im Hero**, rechts Foto mit zwei überlagerten Vertrauens-Feldern (Alle Kassen / Zertifiziert). Darunter Leistungsblock zweispaltig, Privatleistungen auf grünem Tint.
*Charakter:* dicht, informativ, konversionsorientiert. Der grüne Badge „TERMINE KURZFRISTIG FREI" ist ein bewusstes Verknappungssignal.

## Leistungen (identisch in allen Richtungen — verbindlicher Inhalt)

**Auf Rezept — gesetzlich & privat versichert**
| Leistung | Kürzel |
|---|---|
| Krankengymnastik | KG |
| Krankengymnastik am Gerät | KGG |
| Manuelle Therapie | MT |
| Craniomandibuläre Dysfunktion (Kiefergelenk) | CMD |
| Klassische Massagetherapie | KMT |

**Privatleistungen — ohne Verordnung buchbar**
| Leistung | Preis |
|---|---|
| Personal Training | 100 € / Std. |
| Massage | 26 € |
| Wärmepackung | *auf Anfrage* (Preis nachtragen) |

Preise müssen an **einer** Stelle gepflegt werden (Content Collection / JSON), nicht im Markup verstreut.

## Interaktion & Verhalten
- **Header:** Desktop volle Nav + CTA. Phone: Logo + 2-Strich-Menü-Icon (22px breit, 1.5px Striche, 5px Abstand). Overlay-Menü geöffnet ist nicht entworfen — Vorschlag: Vollbild, schwarz, Nav-Items linksbündig groß, Telefonnummer als CTA unten.
- **Sprachumschalter:** `DE / EN`, aktive Sprache voll deckend, inaktive auf `.30` Opazität. Führt auf `/en/` bzw. `/de/`.
- **Telefon-CTA:** `<a href="tel:...">` — auf Mobile der wichtigste Pfad, muss ohne Scrollen erreichbar sein.
- **Formular (1c):** Felder Name, Telefon, Anliegen. Kein Cookie, keine externe Einbettung. Pflicht: Datenschutz-Checkbox mit Link zur Datenschutzerklärung, Honeypot gegen Spam, sichtbarer Hinweis „Rückruf innerhalb von 24 h". Validierung nativ (`required`, `type="tel"`), Fehlermeldungen auf Deutsch, inline unter dem Feld.
- **Hover-States** sind nicht ausgearbeitet. Vorschlag konsistent zum Charakter: Buttons invertieren (schwarz↔weiß), Leistungszeilen bekommen den grünen Tint als Hintergrund, Nav-Items unterstreichen 1px. Keine Transforms, keine Schatten.
- **Motion:** sehr sparsam. Maximal 150–200ms `ease-out` auf Farbe/Opazität. Keine Scroll-Animationen, keine Parallax.

## Responsive
Entworfen sind 1440 und 390. Dazwischen:
- **> 1440:** Inhalt auf max. 1440px zentrieren, Seitenränder wachsen mit. Der schwarze Hero (1b) darf full-bleed bleiben.
- **1024–1440:** Raster hält, Seitenrand auf 40px, H1 fluid (`clamp()`).
- **768–1024:** zweispaltige Heros werden einspaltig, Bild unter den Text. Kennzahlen bleiben 3-spaltig.
- **< 768:** Phone-Layout. Leistungs-Kürzel werden zu Chips (siehe Phone-Entwürfe), Nav zum Overlay.

## Barrierefreiheit
- Grün `oklch(0.74 0.12 150)` auf Weiß erreicht **kein** AA für Text — nur für Flächen und Rahmen verwenden. Grüner Text auf Weiß immer `oklch(0.55 0.11 150)`.
- Grün als Hintergrund mit schwarzem Text (`#0E0F0E`) ist unproblematisch.
- Fokus-Ring: 2px `#0E0F0E` mit 2px Offset (auf Schwarz: `#FAFAF8`). Nicht entfernen.
- Touch-Targets ≥ 44px — Phone-Buttons mit `padding:17px 20px` erfüllen das.
- Semantik: ein `<h1>` pro Seite, Leistungen als `<dl>` oder `<ul>`, Nav in `<nav>`, Sprachumschalter mit `hreflang` und `lang`-Attribut.

## Assets
- `assets/logo-schwarz.png` — Logo für helle Hintergründe (1a, 1c). Höhe 22–26px Desktop, 17–19px Phone.
- `assets/logo-weiss.png` — Logo für dunkle Hintergründe (1b). Gleiche Höhen.
- **Fonts nicht per Google-CDN einbinden** (DSGVO). Archivo und IBM Plex Mono als woff2 selbst hosten. Der Prototyp lädt sie noch vom CDN — das ist eine Prototyp-Abkürzung, kein Design-Entscheid.
- Fotos fehlen. Benötigt: Behandlung hochformat (1a), Trainingsfläche quer (1b), Praxisraum quadratisch (1c).

## Empfohlener Stack (falls noch keine Umgebung existiert)
**Astro, statischer Build.** Begründung: liefert reines HTML ohne JS-Bundle, DE/EN über Verzeichnisrouting eingebaut, Leistungen/Preise als Content Collection an einer Stelle pflegbar, Fonts und Bilder werden beim Build selbst gehostet und optimiert. Ergebnis ist ein Ordner statischer Dateien — Hosting auf Netlify / Cloudflare Pages / vorhandenem Webspace, keine laufenden Serverkosten, keine Wartung.

Formular ohne eigenen Server: Netlify Forms, Cloudflare Worker oder Formspree (EU-Region).

**DSGVO-relevant und designwirksam:** keine Google-Fonts vom CDN, kein Google-Maps-iframe — stattdessen statisches Kartenbild plus Link „In Google Maps öffnen" oder Leaflet/OpenStreetMap. Damit entfällt der Cookie-Banner vollständig, was der Seite gestalterisch zugutekommt.

Preact ist nicht nötig — die interaktiven Teile (Menü, Sprachumschalter, Formularvalidierung) sind wenige Zeilen. Falls später ein Terminkalender oder Fragebogen dazukommt: als Astro-Island (`client:visible`) nachrüstbar, ohne Umbau.

## Dateien in diesem Bündel
- `PhysioFabrik Website.dc.html` — die drei Design-Richtungen, Desktop + Phone
- `support.js` — Laufzeit für die Prototyp-Datei (nur zum Ansehen nötig, nicht übernehmen)
- `assets/logo-schwarz.png`, `assets/logo-weiss.png` — Logos zur Weiterverwendung

## Vor der Implementierung zu klären
1. Welche Richtung — 1a, 1b oder 1c? Oder Kombination (z. B. 1a-Ruhe mit dem Formular aus 1c)?
2. Praxisname, Adresse, Telefon, E-Mail, Öffnungszeiten
3. Preis der Wärmepackung
4. Team-Mitglieder mit Qualifikationen für den Über-uns-Abschnitt
5. Konkrete Zertifikate/Fortbildungen für den Vertrauensblock
6. Fotos
7. EN-Übersetzungen — vollständig oder nur Kernabschnitte?
