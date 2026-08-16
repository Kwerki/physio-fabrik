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
| ~~`telefon`~~ | Hero, Menü, Kontakt, Footer, Impressum | Erledigt: 0561 8200615 (einzige Nummer — die zweite Nummer aus der Vorlage sowie der Vellmax-Hinweis wurden bewusst weggelassen, siehe unten) |
| ~~`email`~~ | Kontakt, Footer, Impressum | Erledigt: physio.fabrik@outlook.de |
| ~~`adresse`~~ | Kontakt, Footer, Impressum, Datenschutz | Erledigt: Brüder-Grimm-Straße 32, 2. OG, 34246 Vellmar |
| `oeffnungszeiten` | Infoleiste unter dem Hero, Kontakt | Weiterhin offen — keine echten Zeiten geliefert. Beide Stellen abgleichen |
| ~~`kennzahlen`~~ | Praxis | Erledigt: 7 Jahre / 20 min / „Alle Kassen und Privat" |
| ~~`team`~~ | Team | Erledigt für Nils Fischer (Praxisleitung/Inhaber) mit echtem Foto. Die zwei fiktiven Kolleg:innen sind raus, stattdessen eine Stellenanzeige-Karte — die Praxis sucht aktiv Personal |
| `impressum-*` | Impressum | Anbieter/Kontakt/Verantwortlich sind mit Nils Fischer gefüllt. Weiterhin offen: Aufsichtsbehörde, USt-Angabe |
| `hoster`, `datenschutzbeauftragter`, `aufsichtsbehoerde`, `stand` | Datenschutz | Hoster, ggf. DSB, Landesbehörde, Datum |

**Telefonnummer bewusst reduziert:** Die Vorlage nannte zusätzlich 0561 82020145
sowie einen Hinweis „(Vellmax, macht Terminvergabe)" bei der zweiten Nummer —
auf ausdrücklichen Wunsch der Praxis wird nur noch die eine Nummer
0561 8200615 angezeigt, ohne den Vellmax-Hinweis.

**Keine Hausbesuche:** Die Vorlage stellte klar, dass keine Hausbesuche
angeboten werden. Die vorherigen Behauptungen „Hausbesuche möglich" (Infoleiste)
und „Hausbesuche im Stadtgebiet" (Praxis-Merkmale) waren falsch und sind entfernt
bzw. ersetzt (Fahrstuhl-Hinweis, „Keine Hausbesuche").

Die Privatleistungen stehen bewusst **ohne Preise** auf der Seite. Sollen wieder
welche rein, gehören sie ausschließlich in [index.html](index.html) in den Block
`services__group` unter „Privatleistungen" (je Zeile ein `<span class="rows__meta">`
neben den Namen) — nicht an anderer Stelle wiederholen.

## Leistungstexte gegenlesen

Alle acht Leistungen sind aufklappbar und haben je zwei Absätze Erklärung —
fünf auf Rezept (KG, KGG, MT, CMD, KMT) und drei Privatleistungen (Personal
Training, Massage, Wärmepackung). Die Texte sind fachlich allgemein formuliert
und **nicht von der Praxis geprüft** — sie stehen nicht unter
`data-placeholder`, weil sie inhaltlich tragen, müssen vor Livegang aber einmal
durchgesehen werden.

Besonders zu prüfen:

- Verordnung: MT braucht eine eigene Angabe auf dem Rezept, KGG-Zulassung der
  Trainingsfläche
- Zuzahlungsangabe bei KG
- Dauer der Massage: korrigiert auf 20 Minuten (Vorlage nannte fälschlich 25 Minuten)
- Ob die Wärmepackung tatsächlich einzeln buchbar ist oder nur begleitend

## Fotos — weitgehend erledigt

Die Praxisfotos sind eingebaut. Aufbereitet aus den Originalen in
`design_handoff_physiofabrik/assets/` mit `werkzeuge/bilder.py`: EXIF-Daten
entfernt (die Originale enthalten Geräte- und teils GPS-Angaben), auf die
tatsächlich gebrauchte Breite gerechnet, als WebP gespeichert. 1,7 MB → 768 KB.

| Datei | Wo |
|---|---|
| `trainingsflaeche-hoch.webp` | Leistungen, linke Spalte |
| `manuelle-therapie.webp` | Team, Band über den Karten — **Stockfoto**, siehe unten |
| `nils-fischer.webp` | Team, Porträtkarte Nils Fischer — echtes Foto, 3:4 direkt aus dem Handy |
| `trainingsflaeche-weit.webp` | Praxis, großes Bild |
| `behandlungszimmer.webp`, `behandlungszimmer-liege.webp`, `praxis-flur.webp`, `sitzecke.webp` | Praxis, Galerie (vier Kacheln) |

Drei weitere Aufnahmen von Nils liegen unbearbeitet in
`design_handoff_physiofabrik/assets/` als `nils_fischer_alt1.jpeg` bis
`_alt3.jpeg`, falls ein anderer Ausschnitt gewünscht ist — dafür in
`werkzeuge/bilder.py` den Dateinamen im `nils-fischer`-Job tauschen und das
Skript erneut laufen lassen. Zusätzlich liegen dort zwei weitere
Behandlungsraum-Fotos (`behandlungsraum_orange.jpeg`,
`behandlungsraum_vellmax.jpeg`), noch nicht in die Galerie aufgenommen — bei
Letzterem ist im Hintergrund die Glastür mit dem Vellmax-Schriftzug zu sehen.

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

**Erledigt:** Porträt von Nils Fischer eingebaut. Die Team-Sektion zeigt aktuell
nur ihn plus eine Stellenanzeige-Karte, weil keine weiteren Teammitglieder
namentlich bekannt sind. Kommt echtes Personal dazu: neues `<li class="team__member">`
mit `<figure class="frame team__photo">` (Bild 3:4) nach demselben Muster wie
bei Nils ergänzen.

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
- ~~**Anfahrt/Karte.**~~ Erledigt: Kein iframe, stattdessen ein Link
  „In Google Maps öffnen" im Kontaktblock (öffnet Google Maps erst nach Klick,
  siehe Datenschutzerklärung).
