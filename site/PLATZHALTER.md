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
| `team` | Team | Namen, Rollen, Qualifikationen der drei Mitglieder |
| `foto` | Leistungen, Praxis, Team | Siehe unten |
| `impressum-*` | Impressum | Inhaber:in, Aufsichtsbehörde, USt-Angabe, Verantwortliche:r |
| `hoster`, `datenschutzbeauftragter`, `aufsichtsbehoerde`, `stand` | Datenschutz | Hoster, ggf. DSB, Landesbehörde, Datum |

Die Preise stehen **nur** in [index.html](index.html) im Block
`services__group` unter „Privatleistungen". Nicht an anderer Stelle wiederholen.

## Fotos

Die Platzhalter sind `<div class="photo">` mit Schraffur. Ersetzen durch:

```html
<img src="assets/img/trainingsflaeche.webp" alt="Trainingsfläche der PhysioFabrik"
     width="1200" height="800" loading="lazy" style="object-fit:cover;width:100%;height:100%">
```

Benötigt: Trainingsfläche quer (Leistungen), Praxisraum quer (Praxis),
drei Porträts hochformat 3:4 (Team). Das erste Bild im Viewport ohne `loading="lazy"`.

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
