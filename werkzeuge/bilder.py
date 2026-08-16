"""Praxisfotos fuer die Website aufbereiten.

Aufruf aus dem Projektwurzelverzeichnis:

    python werkzeuge/bilder.py

Was passiert:
- EXIF-Orientierung anwenden, danach saemtliche Metadaten verwerfen. Die
  Originale aus dem Handy tragen Geraeteangaben und teils GPS-Koordinaten;
  die haben auf einer Praxis-Website nichts zu suchen.
- auf die tatsaechlich benoetigte Breite herunterrechnen
- als WebP speichern

Benoetigt Pillow:  pip install Pillow
"""

import os
from PIL import Image, ImageOps

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(WURZEL, "design_handoff_physiofabrik", "assets")
DST = os.path.join(WURZEL, "site", "assets", "img")

# Quelldatei -> (Zielname ohne Endung, maximale Breite in Pixeln)
# Die Breiten richten sich nach der groessten Flaeche, in der das Bild im
# Layout tatsaechlich erscheint - groesser bringt nichts ausser Ladezeit.
JOBS = [
    ("trainings_bereich_1.jpeg", "trainingsflaeche-hoch", 1200),
    ("trainings_bereich_2.jpeg", "trainingsflaeche-weit", 1600),
    # Stockfoto (Unsplash-Lizenz, Edward Muntinga), bereits auf 3:4 beschnitten.
    # Ersetzt das Handyfoto behandlung_am_mensch.jpeg, das fuer die Flaeche im
    # Team-Band zu eng geschnitten war. Quelle steht in site/PLATZHALTER.md.
    ("manuelle_therapie_stock.jpeg", "manuelle-therapie", 1200),
    # Portraet Nils Fischer, Praxisleitung. 3:4 direkt aus dem Handy, keine
    # weitere Beschneidung noetig. Drei Alternativaufnahmen liegen daneben
    # als nils_fischer_alt1-3.jpeg, falls ein anderer Ausschnitt gewuenscht ist.
    ("nils_fischer.jpeg", "nils-fischer", 600),
    ("behandlungszimmer.jpeg", "behandlungszimmer", 800),
    ("behandlungszimmer_liege.jpeg", "behandlungszimmer-liege", 800),
    ("behandlungsraum_orange.jpeg", "behandlungsraum-orange", 800),
    ("behandlungsraum_vellmax.jpeg", "behandlungsraum-balkon", 800),
    ("praxis_flur.jpeg", "praxis-flur", 800),
    ("sitzecke.jpeg", "sitzecke", 800),
]

# Bewusst nicht mehr aufbereitet: mensch_macht_übung.jpeg ("Training am Gerät")
# und beinpresse.jpeg. Die Galerie zeigt nur noch die Raeume. Die Originale
# liegen weiter im Handoff-Ordner, falls sie zurueckkommen sollen — dann hier
# wieder eintragen und die <li> in der Galerie ergaenzen.


def main():
    gesamt = 0
    for quelle, ziel, maxw in JOBS:
        pfad = os.path.join(SRC, quelle)
        if not os.path.exists(pfad):
            print("uebersprungen (fehlt): %s" % quelle)
            continue

        with Image.open(pfad) as im:
            im = ImageOps.exif_transpose(im)
            if im.width > maxw:
                hoehe = round(im.height * maxw / im.width)
                im = im.resize((maxw, hoehe), Image.LANCZOS)

            # neues Bild anlegen, damit garantiert keine Metadaten mitwandern
            sauber = Image.new("RGB", im.size)
            sauber.paste(im.convert("RGB"))

            out = os.path.join(DST, ziel + ".webp")
            sauber.save(out, "WEBP", quality=82, method=6)

        kb = os.path.getsize(out) / 1024
        gesamt += kb
        print("%-28s -> %4dx%-4d %7.1f KB  %s.webp"
              % (quelle, sauber.width, sauber.height, kb, ziel))

    print("\ngesamt %.0f KB" % gesamt)


if __name__ == "__main__":
    main()
