"""Anfahrtskarte als statisches SVG aus OpenStreetMap-Daten erzeugen.

Aufruf aus dem Projektwurzelverzeichnis:

    python3 werkzeuge/karte.py

Warum so und nicht Google-Maps-iframe: Ein eingebetteter Kartendienst baut
schon beim Seitenaufruf eine Verbindung zu Google auf (IP-Adresse in die USA,
Zugriff aufs Endgeraet) und braeuchte deshalb eine Einwilligung bzw. einen
Cookie-Banner. Diese Karte ist eine eigene Datei auf unserem Server, der
Besucher laedt nichts von Dritten. Erst der Link darunter fuehrt zu Google.

Daten: (c) OpenStreetMap-Mitwirkende, ODbL 1.0. Die Quellenangabe muss sichtbar
neben der Karte stehen (steht in index.html als Bildunterschrift) - bitte nicht
entfernen.

Benoetigt nur die Python-Standardbibliothek. Die Overpass-Antwort wird in
werkzeuge/.karte-cache.json zwischengespeichert; zum Neuladen loeschen.
"""

import base64
import json
import math
import os
import urllib.parse
import urllib.request

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIEL = os.path.join(WURZEL, "public", "assets", "img", "anfahrt-karte.svg")
CACHE = os.path.join(WURZEL, "werkzeuge", ".karte-cache.json")
SCHRIFT = os.path.join(WURZEL, "site", "assets", "fonts", "ibm-plex-mono-400-latin.woff2")

# Brueder-Grimm-Strasse 32, Vellmar (Nominatim). Die Koordinaten in der alten
# Google-Einbettung lagen rund 11 km daneben.
LAT, LON = 51.3534008, 9.4693369
PRAXIS_GEBAEUDE = 643859368  # OSM-Way des Gebaeudes, in dem die Adresse liegt

# Ausschnitt in Metern und Ausgabegroesse (4:3)
BREITE_M, HOEHE_M = 620, 465
BREITE_PX, HOEHE_PX = 800, 600
# Praxis etwas rechts unterhalb der Mitte, damit das Label Platz hat
VERSATZ_M = (-40, 30)

STRASSEN_LABELS = ["Brüder-Grimm-Straße", "Warburger Straße", "Holländische Straße", "Lange Wender"]

# Farben passend zur dunklen Kontaktsektion (Tokens aus style.css)
FARBEN = {
    "grund": "#121412",
    "gruen": "#152019",
    "gebaeude": "#1d201d",
    "weg": "#252825",
    "anlieger": "#2f332f",
    "wohnstrasse": "#3a3e3a",
    "hauptstrasse": "#4b504b",
    "bahn": "#3a3e3a",
    "akzent": "#5ebf78",  # --green, oklch(0.74 0.12 150)
    "ink": "#0e0f0e",
    "text": "#8a8f8a",
    "text_hell": "#fafaf8",
}

ABFRAGE = """[out:json][timeout:60];
(
  way(around:{r},{lat},{lon})[highway];
  way(around:{r},{lat},{lon})[building];
  way(around:{r},{lat},{lon})[landuse];
  way(around:{r},{lat},{lon})[leisure];
  way(around:{r},{lat},{lon})[natural];
  way(around:{r},{lat},{lon})[railway];
);
out geom tags;"""


def osm_laden():
    if os.path.exists(CACHE):
        with open(CACHE, encoding="utf-8") as f:
            return json.load(f)
    radius = int(math.hypot(BREITE_M, HOEHE_M) / 2 + 150)
    daten = urllib.parse.urlencode(
        {"data": ABFRAGE.format(r=radius, lat=LAT, lon=LON)}
    ).encode()
    anfrage = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=daten,
        headers={"User-Agent": "physiofabrik-website-karte/1.0"},
    )
    with urllib.request.urlopen(anfrage, timeout=90) as antwort:
        osm = json.load(antwort)
    with open(CACHE, "w", encoding="utf-8") as f:
        json.dump(osm, f)
    return osm


# Lokale Web-Mercator-Naeherung, fuer 600 m voellig ausreichend
M_PRO_GRAD_LAT = 111_320
M_PRO_GRAD_LON = 111_320 * math.cos(math.radians(LAT))
SKALA = BREITE_PX / BREITE_M


def projizieren(lat, lon):
    x = (lon - LON) * M_PRO_GRAD_LON - VERSATZ_M[0]
    y = (LAT - lat) * M_PRO_GRAD_LAT - VERSATZ_M[1]
    return (BREITE_PX / 2 + x * SKALA, HOEHE_PX / 2 + y * SKALA)


def pfad(punkte, schliessen=False):
    teile = []
    for i, (x, y) in enumerate(punkte):
        teile.append(("M" if i == 0 else "L") + f"{x:.1f} {y:.1f}")
    return "".join(teile) + ("Z" if schliessen else "")


def im_bild(punkte, rand=60):
    return any(-rand < x < BREITE_PX + rand and -rand < y < HOEHE_PX + rand for x, y in punkte)


STRASSENKLASSE = {
    "trunk": "hauptstrasse", "trunk_link": "hauptstrasse",
    "primary": "hauptstrasse", "primary_link": "hauptstrasse",
    "secondary": "hauptstrasse", "secondary_link": "hauptstrasse",
    "tertiary": "hauptstrasse", "tertiary_link": "hauptstrasse",
    "residential": "wohnstrasse", "unclassified": "wohnstrasse",
    "living_street": "wohnstrasse",
    "service": "anlieger",
    "footway": "weg", "path": "weg", "cycleway": "weg", "pedestrian": "weg",
    "steps": "weg", "track": "weg",
}
STRICHSTAERKE = {"hauptstrasse": 9, "wohnstrasse": 6, "anlieger": 3, "weg": 1.4}
GRUEN = {"grass", "meadow", "park", "wood", "scrub", "pitch", "playground",
         "forest", "village_green", "recreation_ground", "garden", "allotments"}


def label_position(wege, laenge_px, sperrflaechen):
    """Ein fast gerades Stueck Strasse finden, auf das der Name passt.

    Kurvige Strassen bestehen in OSM aus vielen kurzen Segmenten, deshalb
    werden aufeinanderfolgende Punkte zusammengefasst, solange sie nah an der
    Sehne zwischen Anfang und Ende bleiben.
    """
    bester = None
    for punkte in wege:
        for i in range(len(punkte) - 1):
            laenge = 0
            for j in range(i + 1, len(punkte)):
                laenge += math.dist(punkte[j - 1], punkte[j])
                if laenge >= laenge_px:
                    break
            else:
                continue
            (x1, y1), (x2, y2) = punkte[i], punkte[j]
            sehne = math.dist((x1, y1), (x2, y2))
            abweichung = max(
                abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / sehne
                for x, y in punkte[i:j + 1]
            )
            if abweichung > 5:
                continue
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            if not (laenge_px / 2 + 10 < mx < BREITE_PX - laenge_px / 2 - 10 and 40 < my < HOEHE_PX - 40):
                continue
            # die ganze Textlaenge pruefen, nicht nur die Mitte
            stichproben = [(x1 + (x2 - x1) * k / 8, y1 + (y2 - y1) * k / 8 - 8) for k in range(9)]
            if any(ax < x < bx and ay < y < by
                   for x, y in stichproben for ax, ay, bx, by in sperrflaechen):
                continue
            # mittige Lage bevorzugen, dort schaut man zuerst hin
            wert = abweichung + math.dist((mx, my), (BREITE_PX / 2, HOEHE_PX / 2)) / 40
            if bester is None or wert < bester[0]:
                bester = (wert, (x1, y1), (x2, y2))
    if bester is None:
        return None
    _, (x1, y1), (x2, y2) = bester
    if x2 < x1:  # Text immer von links nach rechts lesbar
        x1, y1, x2, y2 = x2, y2, x1, y1
    winkel = math.degrees(math.atan2(y2 - y1, x2 - x1))
    return ((x1 + x2) / 2, (y1 + y2) / 2, winkel)


def main():
    osm = osm_laden()
    ebenen = {k: [] for k in ["gruen", "gebaeude", "weg", "anlieger", "wohnstrasse", "hauptstrasse", "bahn"]}
    praxis = None
    benannt = {}

    for e in osm["elements"]:
        if "geometry" not in e:
            continue
        t = e.get("tags", {})
        punkte = [projizieren(g["lat"], g["lon"]) for g in e["geometry"]]
        if not im_bild(punkte):
            continue
        geschlossen = len(punkte) > 2 and e["geometry"][0] == e["geometry"][-1]

        if e["id"] == PRAXIS_GEBAEUDE:
            praxis = punkte
        elif "building" in t:
            ebenen["gebaeude"].append(pfad(punkte, True))
        elif t.get("highway") in STRASSENKLASSE and t.get("area") != "yes":
            ebenen[STRASSENKLASSE[t["highway"]]].append(pfad(punkte))
            if t.get("name") in STRASSEN_LABELS and STRASSENKLASSE[t["highway"]] in ("hauptstrasse", "wohnstrasse"):
                benannt.setdefault(t["name"], []).append(punkte)
        elif t.get("railway") in ("rail", "tram"):
            ebenen["bahn"].append(pfad(punkte))
        elif geschlossen and (t.get("landuse") in GRUEN or t.get("leisure") in GRUEN or t.get("natural") in GRUEN):
            ebenen["gruen"].append(pfad(punkte, True))

    if praxis is None:
        raise SystemExit("Praxisgebaeude nicht in den OSM-Daten gefunden")

    with open(SCHRIFT, "rb") as f:
        schrift = base64.b64encode(f.read()).decode()

    F = FARBEN
    s = []
    s.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BREITE_PX} {HOEHE_PX}" '
        f'width="{BREITE_PX}" height="{HOEHE_PX}">'
    )
    # Schrift eingebettet: Als <img> geladen darf ein SVG keine externen Dateien nachladen.
    s.append(
        "<style>@font-face{font-family:Plex;src:url(data:font/woff2;base64,"
        + schrift
        + ") format('woff2')}"
        "text{font-family:Plex,ui-monospace,Menlo,Consolas,monospace}</style>"
    )
    s.append(f'<rect width="100%" height="100%" fill="{F["grund"]}"/>')
    s.append(f'<path fill="{F["gruen"]}" d="{"".join(ebenen["gruen"])}"/>')
    s.append(f'<path fill="{F["gebaeude"]}" d="{"".join(ebenen["gebaeude"])}"/>')
    s.append(
        f'<path fill="none" stroke="{F["bahn"]}" stroke-width="1.5" '
        f'stroke-dasharray="6 4" d="{"".join(ebenen["bahn"])}"/>'
    )
    for klasse in ["weg", "anlieger", "wohnstrasse", "hauptstrasse"]:
        s.append(
            f'<path fill="none" stroke="{F[klasse]}" stroke-width="{STRICHSTAERKE[klasse]}" '
            f'stroke-linecap="round" stroke-linejoin="round" d="{"".join(ebenen[klasse])}"/>'
        )

    # Praxis: Gebaeude in Gruen, darueber eckiger Marker im Stil der Seite
    s.append(f'<path fill="{F["akzent"]}" d="{pfad(praxis, True)}"/>')
    px = sum(p[0] for p in praxis[:-1]) / (len(praxis) - 1)
    py = sum(p[1] for p in praxis[:-1]) / (len(praxis) - 1)
    lx, ly = px + 26, py - 70
    s.append(
        f'<path fill="none" stroke="{F["akzent"]}" stroke-width="1.5" '
        f'd="M{px:.1f} {py:.1f}L{px:.1f} {ly:.1f}L{lx:.1f} {ly:.1f}"/>'
    )
    s.append(f'<rect x="{px - 5:.1f}" y="{py - 5:.1f}" width="10" height="10" fill="{F["ink"]}" stroke="{F["akzent"]}" stroke-width="3"/>')
    s.append(f'<rect x="{lx:.1f}" y="{ly - 29:.1f}" width="250" height="58" fill="{F["akzent"]}"/>')
    s.append(f'<text x="{lx + 14:.1f}" y="{ly - 5:.1f}" font-size="19" fill="{F["ink"]}">PHYSIOFABRIK</text>')
    s.append(f'<text x="{lx + 14:.1f}" y="{ly + 17:.1f}" font-size="14" fill="{F["ink"]}">2. OG · IM VELLMAX</text>')

    # Markerbox, Marker und bereits gesetzte Labels nicht ueberschreiben
    sperrflaechen = [(lx - 20, ly - 45, lx + 270, ly + 45), (px - 40, py - 40, px + 40, py + 40)]

    for name in STRASSEN_LABELS:
        groesse = 15
        pos = label_position(benannt.get(name, []), len(name) * groesse * 0.66, sperrflaechen)
        if pos is None:
            print(f"Kein Platz fuer Label: {name}")
            continue
        x, y, w = pos
        sperrflaechen.append((x - 60, y - 30, x + 60, y + 30))
        s.append(
            f'<text x="{x:.1f}" y="{y:.1f}" transform="rotate({w:.1f} {x:.1f} {y:.1f})" '
            f'font-size="{groesse}" fill="{F["text"]}" text-anchor="middle" dy="-8" '
            f'letter-spacing=".04em">{name.upper()}</text>'
        )

    s.append("</svg>")

    with open(ZIEL, "w", encoding="utf-8") as f:
        f.write("\n".join(s) + "\n")
    print(f"{ZIEL}: {os.path.getsize(ZIEL) // 1024} KB")


if __name__ == "__main__":
    main()
