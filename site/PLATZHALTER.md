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
| `preis` | Leistungen | Preis „Wärmepackung" statt „auf Anfrage" |
| `kennzahlen` | Praxis | 14 Jahre / 30 min / „Alle Kassen" bestätigen oder ersetzen |
| `team` | Team | Namen, Rollen, Qualifikationen der drei Mitglieder — dazu Porträtfotos, siehe unten |
| `impressum-*` | Impressum | Inhaber:in, Aufsichtsbehörde, USt-Angabe, Verantwortliche:r |
| `hoster`, `datenschutzbeauftragter`, `aufsichtsbehoerde`, `stand` | Datenschutz | Hoster, ggf. DSB, Landesbehörde, Datum |

Die Preise stehen **nur** in [index.html](index.html) im Block
`services__group` unter „Privatleistungen". Nicht an anderer Stelle wiederholen.

## Fotos — weitgehend erledigt

Die Praxisfotos sind eingebaut. Aufbereitet aus den Originalen in
`design_handoff_physiofabrik/assets/` mit `werkzeuge/bilder.py`: EXIF-Daten
entfernt (die Originale enthalten Geräte- und teils GPS-Angaben), auf die
tatsächlich gebrauchte Breite gerechnet, als WebP gespeichert. 1,7 MB → 768 KB.

| Datei | Wo |
|---|---|
| `trainingsflaeche-hoch.webp` | Leistungen, linke Spalte |
| `behandlung.webp` | Team, Band über den Karten |
| `trainingsflaeche-weit.webp` | Praxis, großes Bild |
| `behandlungszimmer.webp`, `behandlungszimmer-liege.webp`, `praxis-flur.webp`, `sitzecke.webp`, `uebung-am-geraet.webp`, `beinpresse.webp` | Praxis, Galerie |

Werden Fotos ausgetauscht: neue Datei nach `design_handoff_physiofabrik/assets/`,
Eintrag in `werkzeuge/bilder.py` ergänzen, Skript laufen lassen. Nicht
unbearbeitete Handyfotos direkt einbinden — die sind mehrere MB groß und
tragen Metadaten.

**Noch offen:** drei Porträts der Teammitglieder, Hochformat 3:4. Solange sie
fehlen, laufen die Team-Karten rein textlich. Mit Porträts: pro `team__member`
eine `<figure class="frame team__photo">` mit `aspect-ratio: 3/4` vor die
Überschrift setzen.

`beinpresse.webp` ist die schwächste Aufnahme der Reihe — nackte Beine aus der
Ich-Perspektive, wirkt eher privat als professionell. Steht als letzte Kachel
in der Galerie und lässt sich ersatzlos streichen.

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
