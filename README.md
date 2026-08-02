# PhysioFabrik — Praxis-Website

Statische Website für eine Physiotherapie-Praxis. Umgesetzt ist Design-Richtung
**1b „Werkstatt"** aus dem Handoff: schwarzer Hero mit Rasteroverlay, sehr große
Headline, Grün als Akzent, keine abgerundeten Ecken, Trennlinien statt Karten.

Plain HTML/CSS/JS, kein Build-Schritt, kein Framework. Ein Ordner, hochladen,
fertig.

## Struktur

```
site/                     ← das ist die auszuliefernde Website
  index.html              One-Pager: Hero, Leistungen, Team, Praxis, Kontakt
  impressum.html
  datenschutz.html
  assets/css/style.css    Tokens + gesamtes Layout
  assets/js/main.js       Overlay-Menü, Formularvalidierung
  assets/fonts/           Archivo + IBM Plex Mono, selbst gehostet (OFL-1.1)
  assets/img/             Logos
  PLATZHALTER.md          alles, was vor Livegang ersetzt werden muss

design_handoff_physiofabrik/   Design-Referenz, nicht Teil der Auslieferung
  PhysioFabrik Website.dc.html Vergleichs-Canvas 1a/1b/1c, Desktop + Phone
  README.md                    Tokens, Typografie, Raster, Vorgaben
```

## Lokal ansehen

```bash
cd site
python -m http.server 8080
```

Dann <http://127.0.0.1:8080> öffnen. Für die Handyansicht in den DevTools die
Device Toolbar auf 390 px stellen.

## Stand

Der statische Teil steht — Desktop und Mobil, inklusive Overlay-Menü,
Fokus-Ringen und Hover-States. Offen sind:

- **Mailversand** des Kontaktformulars. Markup, Validierung, Honeypot und
  Einwilligungs-Checkbox sind fertig; in `site/assets/js/main.js` markiert
  `TODO Mailversand` die Stelle für den POST.
- **Echte Inhalte.** Telefon, Adresse, Öffnungszeiten, Team, Fotos und der Preis
  der Wärmepackung sind Platzhalter — alle im Markup mit `data-placeholder`
  ausgezeichnet, Übersicht in `site/PLATZHALTER.md`.
- **EN-Fassung.** Der Umschalter zeigt EN inaktiv; Übersetzungen fehlen.

## Datenschutz — bitte so lassen

Die Seite kommt ohne Cookie-Banner aus, weil sie keine Cookies setzt, nicht
trackt, keine Karte einbettet und die Schriften selbst ausliefert. Wird eines
davon wieder eingebaut — insbesondere Google Fonts per CDN oder ein
Maps-iframe — ist eine Einwilligungslösung nötig.
