# Vor Livegang ersetzen

Alle Stellen sind im Markup mit `data-placeholder="…"` ausgezeichnet.
Zum Sichtbarmachen in [assets/css/style.css](assets/css/style.css) ganz unten
diese Regel einkommentieren:

```css
[data-placeholder] { outline: 1px dashed var(--green); }
```

## Inhalte

| Marker | Wo | Was fehlt |
|---|---|---|
| `telefon` | Hero, Menü, Kontakt, Footer, Impressum | Echte Nummer — im Text **und** in `href="tel:+49…"` (ohne Leerzeichen, mit Ländervorwahl) |
| `email` | Kontakt, Footer, Impressum | Echte Adresse — im Text und in `href="mailto:…"` |
| `adresse` | Kontakt, Footer, Impressum, Datenschutz | Straße, PLZ, Ort |
| `oeffnungszeiten` | Infoleiste unter dem Hero, Kontakt | Echte Zeiten. Beide Stellen abgleichen |
| `kennzahlen` | Praxis | 14 Jahre / 30 min / „Alle Kassen" bestätigen oder ersetzen |
| `team` | Team | Namen, Rollen, Qualifikationen der drei Mitglieder — dazu Porträtfotos, siehe unten |
| `impressum-*` | Impressum | Inhaber:in, Aufsichtsbehörde, USt-Angabe, Verantwortliche:r |
| `hoster`, `datenschutzbeauftragter`, `aufsichtsbehoerde`, `stand` | Datenschutz | Hoster, ggf. DSB, Landesbehörde, Datum |

Die Privatleistungen stehen bewusst **ohne Preise** auf der Seite. Sollen wieder
welche rein, gehören sie ausschließlich in [index.html](index.html) in den Block
`services__group` unter „Privatleistungen" (je Zeile ein `<span class="rows__meta">`
neben den Namen) — nicht an anderer Stelle wiederholen.

## Leistungstexte gegenlesen

Die fünf Rezeptleistungen (KG, KGG, MT, CMD, KMT) sind aufklappbar und haben je
zwei Absätze Erklärung. Die Texte sind fachlich allgemein formuliert und **nicht
von der Praxis geprüft** — sie stehen nicht unter `data-placeholder`, weil sie
inhaltlich tragen, müssen vor Livegang aber einmal durchgesehen werden. Zu
prüfen sind vor allem die Aussagen zur Verordnung (MT braucht eine eigene
Angabe auf dem Rezept, KGG-Zulassung der Trainingsfläche) und die
Zuzahlungsangabe bei KG.

## Fotos — weitgehend erledigt

Die Praxisfotos sind eingebaut. Aufbereitet aus den Originalen in
`design_handoff_physiofabrik/assets/` mit `werkzeuge/bilder.py`: EXIF-Daten
entfernt (die Originale enthalten Geräte- und teils GPS-Angaben), auf die
tatsächlich gebrauchte Breite gerechnet, als WebP gespeichert. 1,7 MB → 768 KB.

| Datei | Wo |
|---|---|
| `trainingsflaeche-hoch.webp` | Leistungen, linke Spalte |
| `manuelle-therapie.webp` | Team, Band über den Karten — **Stockfoto**, siehe unten |
| `trainingsflaeche-weit.webp` | Praxis, großes Bild |
| `behandlungszimmer.webp`, `behandlungszimmer-liege.webp`, `praxis-flur.webp`, `sitzecke.webp` | Praxis, Galerie (vier Kacheln) |

Die Galerie zeigt bewusst nur noch Räume. „Training am Gerät" und „Beinpresse"
sind entfernt; das Raster ist auf vier Kacheln umgestellt (2×2 mobil, eine Reihe
ab Desktop). Sollen sie zurück, müssen es sechs oder acht bleiben — bei fünf
oder sieben bricht die letzte Reihe an.

**`manuelle-therapie.webp` ist als Einziges kein Praxisfoto**, sondern ein
Stockfoto: <https://unsplash.com/photos/a-woman-getting-a-back-massage-from-a-man-Qcl0YqqGwus>,
Edward Muntinga, Unsplash-Lizenz (kommerzielle Nutzung frei, keine
Namensnennung nötig). Es steht dort, weil das Handyfoto aus der Praxis für die
Fläche zu eng geschnitten war. Sobald eine eigene Aufnahme einer Behandlung
vorliegt — Hochformat 3:4 —, sollte sie das Stockfoto ersetzen: Menschen aus der
eigenen Praxis wirken glaubwürdiger als gekaufte. Vor der Aufnahme die
schriftliche Einwilligung der abgebildeten Person einholen.

Werden Fotos ausgetauscht: neue Datei nach `design_handoff_physiofabrik/assets/`,
Eintrag in `werkzeuge/bilder.py` ergänzen, Skript laufen lassen. Nicht
unbearbeitete Handyfotos direkt einbinden — die sind mehrere MB groß und
tragen Metadaten.

**Noch offen:** drei Porträts der Teammitglieder, Hochformat 3:4. Solange sie
fehlen, laufen die Team-Karten rein textlich. Mit Porträts: pro `team__member`
eine `<figure class="frame team__photo">` mit `aspect-ratio: 3/4` vor die
Überschrift setzen.

## Schriften — erledigt

Archivo und IBM Plex Mono liegen als woff2 unter
[assets/fonts/](assets/fonts/), beide unter SIL Open Font License 1.1 — frei
auch für kommerzielle Nutzung. Details in
[assets/fonts/LIZENZ.md](assets/fonts/LIZENZ.md). Die Seite baut keine
Verbindung zu Google auf; das darf auch nicht wieder eingebaut werden.

## Noch nicht gebaut

- **Mailversand** des Kontaktformulars. Markup, Validierung, Honeypot und
  Einwilligung stehen; in [assets/js/main.js](assets/js/main.js) markiert
  `TODO Mailversand` die Stelle für den POST.
- **EN-Fassung.** Der Umschalter zeigt EN auf 30 % Deckkraft als inaktiven
  `<span>`. Sobald `/en/` existiert: in allen drei HTML-Dateien zu
  `<a href="/en/" hreflang="en" lang="en">EN</a>` machen (Kommentar steht im Markup).
- **Anfahrt/Karte.** Kein iframe — statisches Kartenbild plus Link
  „In Google Maps öffnen" oder Leaflet/OpenStreetMap.
