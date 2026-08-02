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
    ("behandlung_am_mensch.jpeg", "behandlung", 1200),
    ("behandlungszimmer.jpeg", "behandlungszimmer", 800),
    ("behandlungszimmer_liege.jpeg", "behandlungszimmer-liege", 800),
    ("praxis_flur.jpeg", "praxis-flur", 800),
    ("sitzecke.jpeg", "sitzecke", 800),
    ("mensch_macht_übung.jpeg", "uebung-am-geraet", 800),
    ("beinpresse.jpeg", "beinpresse", 800),
]


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
