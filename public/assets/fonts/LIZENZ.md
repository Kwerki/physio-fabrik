# Schriften — Herkunft und Lizenz

Beide Familien stehen unter der **SIL Open Font License 1.1** (OFL-1.1).
Das erlaubt kommerzielle Nutzung, Einbettung in Websites und Self-Hosting
ohne Gebühr und ohne Namensnennung auf der Seite. Untersagt ist der Verkauf
der Schriftdateien für sich genommen; Weitergabe nur zusammen mit dem
Lizenztext.

| Familie | Urheber | Lizenz | Quelle |
|---|---|---|---|
| Archivo | Omnibus-Type | OFL-1.1 | <https://github.com/Omnibus-Type/Archivo> |
| IBM Plex Mono | IBM / Mike Abbink, Bold Monday | OFL-1.1 | <https://github.com/IBM/plex> |

## Dateien

Bezogen aus dem Google-Fonts-CDN, dort dauerhaft gecachte Subsets. Sie liegen
jetzt lokal — die ausgelieferte Seite baut **keine** Verbindung zu Google auf.

| Datei | Inhalt |
|---|---|
| `archivo-var-latin.woff2` | Variable Font, Gewichte 100–900, Subset latin |
| `archivo-var-latin-ext.woff2` | dito, Subset latin-ext |
| `ibm-plex-mono-400-latin.woff2` | Regular, Subset latin |
| `ibm-plex-mono-400-latin-ext.woff2` | Regular, Subset latin-ext |
| `ibm-plex-mono-500-latin.woff2` | Medium, Subset latin |
| `ibm-plex-mono-500-latin-ext.woff2` | Medium, Subset latin-ext |

Zusammen rund 124 KB, davon lädt ein deutschsprachiger Besuch typischerweise
nur die drei latin-Dateien (~64 KB). Die latin-ext-Dateien holt der Browser
nur, wenn ein Zeichen daraus vorkommt (z. B. ein Name mit `ł` oder `ř`).

Archivo deckt als Variable Font alle vier verwendeten Gewichte (400/500/600/700)
mit einer Datei ab — deshalb `font-weight: 100 900` im `@font-face`.

## Vollständiger Lizenztext

Die OFL verlangt, dass der Lizenztext mitgeliefert wird, wenn die Schriftdateien
weitergegeben werden. Für die reine Auslieferung als Webfont auf der eigenen
Seite ist das nicht nötig; wer das Bündel weiterreicht, legt `OFL.txt` aus den
oben genannten Repositories dazu.
