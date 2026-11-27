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
| ~~`telefon`~~ | Hero, Menü, Kontakt, Footer, Impressum | Erledigt: 0561 82020145, Link `tel:+4956182020145` (einzige Nummer, seit Commit 922b03d; Vellmax-Hinweis bewusst weggelassen, siehe unten) |
| ~~`email`~~ | Kontakt, Footer, Impressum | Erledigt: physio.fabrik@outlook.de |
| ~~`adresse`~~ | Kontakt, Footer, Impressum, Datenschutz | Erledigt: Brüder-Grimm-Straße 32, 2. OG, 34246 Vellmar |
| ~~`oeffnungszeiten`~~ | Infoleiste unter dem Hero, Kontakt | Erledigt: Mo 10–18, Di 8–16, Mi 12–20, Do 10–18, Fr 10–14, Sa/So geschlossen. Die Infoleiste nennt bewusst keine Uhrzeit („MO–FR NACH VEREINBARUNG"), weil die Zeiten täglich wechseln — Details nur im Kontaktabschnitt |
| ~~`kennzahlen`~~ | Praxis | Erledigt: 7 Jahre / 25 min / „Alle Kassen und Privat" |
| ~~`team`~~ | Team | Erledigt für Nils Fischer (Praxisleitung/Inhaber) mit echtem Foto. Die zwei fiktiven Kolleg:innen sind raus, stattdessen eine Stellenanzeige-Karte — die Praxis sucht aktiv Personal |
| `foto-angelo-nolte` | Team | Portrait von Angelo Nolte fehlt noch (Praxislogo als Platzhalter). Als `assets/img/angelo-nolte.webp`, 600×800, Hochformat 3:4 ablegen — Austausch-Anleitung steht im Kommentar über dem Block in index.html |
| ~~`impressum-*`~~ | Impressum | Erledigt: Anbieter/Kontakt/Verantwortlich = Nils Fischer, Aufsichtsbehörde = Gesundheitsamt Kassel. Keine USt-IdNr vorhanden — § 5 DDG verlangt sie nur „soweit vorhanden", der Absatz nennt daher nur die Steuerbefreiung nach § 4 Nr. 14 UStG |
| ~~`aufsichtsbehoerde`~~, ~~`stand`~~, ~~`datenschutzbeauftragter`~~ | Datenschutz | Erledigt: HBDI Wiesbaden (Praxissitz Hessen), Stand August 2026. DSB-Abschnitt entfernt — bei dieser Praxisgröße nicht erforderlich |
| `hoster` | Datenschutz | Hoster ist benannt (GitHub Pages, GitHub Inc., USA, EU-U.S. DPF). **Offen und anwaltlich zu prüfen:** ob für GitHub Pages ein wirksamer AVV nach Art. 28 DSGVO vorliegt. Der Absatz behauptet bewusst keinen — siehe unten |
| — | index.html | **Behoben:** `canonical` und `og:image` zeigten auf `www.physiofabrik.de` — eine **fremde** Domain ohne Bindestrich, auf der eine Verkaufsseite liegt. Die eigene Domain ist `physio-fabrik.de` (siehe [CNAME](CNAME)). Beide zeigen jetzt dorthin. Wird die Domain je gewechselt, müssen `canonical`, `og:url`, `og:image` und die drei `hreflang`-Zeilen mit |
| — | Datenschutz | **Von der Praxis zu bestätigen:** Löschfrist für Kontaktanfragen. Steht jetzt auf sechs Monaten (Vorschlag der Vorlage, üblicher Wert). Vorher stand dort sichtbar „[z. B. 6 Monaten]" auf der Live-Seite. Wird eine andere Frist gelebt, muss der Satz angepasst werden — die Erklärung muss die tatsächliche Praxis beschreiben |

**Telefonnummer:** Angezeigt wird nur eine Nummer, 0561 82020145 (bis August
2026 stand hier 0561 8200615). Der Hinweis „(Vellmax, macht Terminvergabe)" aus
der Vorlage ist auf Wunsch der Praxis weggelassen. Achtung beim Ändern: Der
`tel:`-Link muss Ziffer für Ziffer zur angezeigten Nummer passen
(0561 82020145 → `+4956182020145`) — zeitweise fehlte dort eine Ziffer und
der Anruf-Knopf wählte eine fremde Nummer. Auch die strukturierten Daten
(JSON-LD im `<head>` von index.html) enthalten die Nummer.

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
| `behandlungszimmer.webp`, `behandlungsraum-orange.webp`, `behandlungsraum-balkon.webp`, `praxis-flur.webp`, `sitzecke.webp` | Praxis, Galerie (fünf Kacheln) |

Bei `behandlungsraum-balkon.webp` ist im Hintergrund durch die Balkontür der
Schriftzug „VellmaX Fitness & Reha-Sport“ zu sehen — auf Rückfrage bewusst so
mit aufgenommen, nicht zugeschnitten.

Drei weitere Aufnahmen von Nils liegen unbearbeitet in
`design_handoff_physiofabrik/assets/` als `nils_fischer_alt1.jpeg` bis
`_alt3.jpeg`, falls ein anderer Ausschnitt gewünscht ist — dafür in
`werkzeuge/bilder.py` den Dateinamen im `nils-fischer`-Job tauschen und das
Skript erneut laufen lassen.

Die Galerie zeigt bewusst nur noch Räume. „Training am Gerät" und „Beinpresse"
sind entfernt, ebenso `behandlungszimmer-liege.webp` — das war laut Praxis
derselbe Raum wie `behandlungszimmer.webp`, nur aus anderer Richtung, und ließ
die Praxis größer wirken, als sie ist. Die drei Behandlungsräume sind
entsprechend neu durchnummeriert.

Aktuell **fünf** Kacheln. Die Anzahl ist inzwischen egal: Die Trennlinien hängen
an den Kacheln selbst, nicht mehr am Containerhintergrund. Vorher zeichnete ein
grauer Container mit 1px-Lücken die Linien — jede leere Zelle der letzten Reihe
stand dadurch als grauer Block auf der Seite, und die Kachelzahl musste zur
Spaltenzahl passen. Diese Kopplung ist weg; Kacheln lassen sich jetzt ergänzen
oder entfernen, ohne das Raster nachzurechnen.

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
- ~~**EN-Fassung.**~~ Erledigt als vollständige Spiegelung unter
  [en/index.html](en/index.html) — siehe eigener Abschnitt unten.
- ~~**Anfahrt/Karte.**~~ Erledigt: Kein iframe, stattdessen ein statisches
  Kartenbild aus OpenStreetMap-Daten (`assets/img/anfahrt-karte.svg`, erzeugt mit
  `werkzeuge/karte.py`) plus Link „In Google Maps öffnen" im Kontaktblock (öffnet
  Google Maps erst nach Klick, siehe Datenschutzerklärung).

## Englische Seite — und was bei Änderungen mitmuss

[en/index.html](en/index.html) ist seit November 2026 eine **vollständige
Spiegelung** der deutschen Startseite: gleicher Aufbau, gleiche Bilder, gleiche
Abschnitte (Treatments, Team, Practice, Careers, Contact), alles übersetzt.
Vorher war es eine einzelne abgespeckte Infoseite — auf Wunsch der Praxis
umgestellt. Der Preis: **Jede inhaltliche Änderung an [index.html](index.html)
muss auch in [en/index.html](en/index.html) nachgezogen werden.** Sonst steht dort
irgendwann eine alte Nummer oder falsche Öffnungszeiten.

**Die deutsche Seite ist die Quelle der Wahrheit** (von der Praxis so
festgelegt). Widersprechen sich beide Fassungen, gilt Deutsch, und die
englische Seite wird angepasst — nie umgekehrt.

Impressum und Datenschutz bleiben deutsch; für eine deutsche Praxis genügt das.

`assets/js/main.js` erkennt die Sprache am `lang`-Attribut von `<html>` und
liefert Formularmeldungen, Mail-Vorlage und Kopier-Hinweis auf Englisch. Neue
sichtbare Texte im Skript deshalb immer über `t("deutsch", "english")`.

Die Anker-IDs sind auf Englisch (`#treatments`, `#team`, `#practice`,
`#careers`, `#contact`); die Formular-IDs sind dieselben wie auf Deutsch, weil
main.js sie braucht.

**Besonders leicht vergessen:**

| Angabe | Steht auf der englischen Seite |
|---|---|
| Telefon `0561 82020145` | Menü, Hero, Careers, Contact, Footer |
| E-Mail `physio.fabrik@outlook.de` | Careers, Contact (3×), Footer |
| Adresse Brüder-Grimm-Straße 32, 2. OG | Contact, Footer |
| Öffnungszeiten | Contact |
| Behandlungszeit 25 min, Massage 20 min | Practice (Kennzahlen), Treatments |
| Teammitglieder + Qualifikationen | Team |
| Stellenanzeige | Careers |

**Behandlung auf Englisch** ist von der Praxis bestätigt und steht im Hero der
englischen Seite. Ändert sich das — etwa weil künftig jemand behandelt, der
kein Englisch spricht —, muss der Satz sofort raus.

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
