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
| ~~`oeffnungszeiten`~~ | Infoleiste unter dem Hero, Kontakt | Erledigt: Mo 10–18, Di 8–16, Mi 12–20, Do 10–18, Fr 10–14, Sa/So geschlossen. Die Infoleiste nennt bewusst keine Uhrzeit („MO–FR NACH VEREINBARUNG"), weil die Zeiten täglich wechseln — Details nur im Kontaktabschnitt |
| ~~`kennzahlen`~~ | Praxis | Erledigt: 7 Jahre / 20 min / „Alle Kassen und Privat" |
| ~~`team`~~ | Team | Erledigt für Nils Fischer (Praxisleitung/Inhaber) mit echtem Foto. Die zwei fiktiven Kolleg:innen sind raus, stattdessen eine Stellenanzeige-Karte — die Praxis sucht aktiv Personal |
| ~~`impressum-*`~~ | Impressum | Erledigt: Anbieter/Kontakt/Verantwortlich = Nils Fischer, Aufsichtsbehörde = Gesundheitsamt Kassel. Keine USt-IdNr vorhanden — § 5 DDG verlangt sie nur „soweit vorhanden", der Absatz nennt daher nur die Steuerbefreiung nach § 4 Nr. 14 UStG |
| ~~`aufsichtsbehoerde`~~, ~~`stand`~~, ~~`datenschutzbeauftragter`~~ | Datenschutz | Erledigt: HBDI Wiesbaden (Praxissitz Hessen), Stand August 2026. DSB-Abschnitt entfernt — bei dieser Praxisgröße nicht erforderlich |
| `hoster` | Datenschutz | Hoster ist benannt (GitHub Pages, GitHub Inc., USA, EU-U.S. DPF). **Offen und anwaltlich zu prüfen:** ob für GitHub Pages ein wirksamer AVV nach Art. 28 DSGVO vorliegt. Der Absatz behauptet bewusst keinen — siehe unten |

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
| `behandlungszimmer.webp`, `behandlungszimmer-liege.webp`, `behandlungsraum-orange.webp`, `behandlungsraum-balkon.webp`, `praxis-flur.webp`, `sitzecke.webp` | Praxis, Galerie (sechs Kacheln) |

Bei `behandlungsraum-balkon.webp` ist im Hintergrund durch die Balkontür der
Schriftzug „VellmaX Fitness & Reha-Sport“ zu sehen — auf Rückfrage bewusst so
mit aufgenommen, nicht zugeschnitten.

Drei weitere Aufnahmen von Nils liegen unbearbeitet in
`design_handoff_physiofabrik/assets/` als `nils_fischer_alt1.jpeg` bis
`_alt3.jpeg`, falls ein anderer Ausschnitt gewünscht ist — dafür in
`werkzeuge/bilder.py` den Dateinamen im `nils-fischer`-Job tauschen und das
Skript erneut laufen lassen.

Die Galerie zeigt bewusst nur noch Räume. „Training am Gerät" und „Beinpresse"
sind entfernt. Aktuell sechs Kacheln (2 Spalten mobil = drei volle Reihen, ab Desktop bei
vier Spalten eine volle Reihe + eine halbe). Bei weiteren Ergänzungen: acht
bleibt sauber, bei fünf oder sieben bricht die letzte Reihe an.

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

- **Echter Mailversand** des Kontaktformulars. Zwischenlösung steht (siehe
  unten), aber sie hängt am Mailprogramm des Besuchers. Sobald ein Endpoint da
  ist (Cloudflare Worker, Netlify Function oder eigenes Skript in der EU):
  in [assets/js/main.js](assets/js/main.js) den mit `TODO Mailversand`
  markierten mailto-Zweig gegen den POST tauschen, in
  [index.html](index.html) die stillgelegte Formularfassung wieder aktivieren
  und die mailto-Fassung entfernen. Danach gehören in
  [datenschutz.html](datenschutz.html) der Absatz „Kontaktformular" zurück auf
  echte Übertragung und der Abschnitt „Spamschutz" (Honeypot) wieder hinein —
  beide Stellen sind dort kommentiert.
- **EN-Fassung.** Der Umschalter zeigt EN auf 30 % Deckkraft als inaktiven
  `<span>`. Sobald `/en/` existiert: in allen drei HTML-Dateien zu
  `<a href="/en/" hreflang="en" lang="en">EN</a>` machen (Kommentar steht im Markup).
- ~~**Anfahrt/Karte.**~~ Erledigt: Kein iframe, stattdessen ein Link
  „In Google Maps öffnen" im Kontaktblock (öffnet Google Maps erst nach Klick,
  siehe Datenschutzerklärung).

## Kontaktformular: aktuell mailto

Das Formular verschickt nichts selbst. „E-Mail vorbereiten" baut einen
`mailto:`-Link mit Name, Telefon und Anliegen und öffnet damit das
E-Mail-Programm des Besuchers — abgeschickt wird die Mail von ihm.

Das ist bewusst eine Zwischenlösung mit einer bekannten Schwäche: Wer Webmail
im Browser nutzt (GMX, Web.de, Gmail ohne registrierten Handler), bei dem
öffnet sich unter Umständen gar nichts. **Deshalb steht die Adresse darunter
im Klartext, ist per Klick vollständig markierbar (`user-select: all`) und hat
einen Kopierknopf.** Dieser Rückfallweg ist kein Beiwerk — er ist der Grund,
warum die mailto-Fassung vertretbar ist. Er darf nicht wegoptimiert werden,
solange kein echter Versand existiert.

Ebenfalls bewusst: Der Knopf heißt „E-Mail vorbereiten", nicht „Anfrage
senden". Niemand soll glauben, die Anfrage sei raus, wenn sie es nicht ist.

Nicht in der mailto-Fassung enthalten und auch nicht nötig: Consent-Checkbox
und Honeypot. Beide setzen voraus, dass Daten an einen Server gehen. Sie
stehen im stillgelegten Block und kommen mit ihm zurück.
