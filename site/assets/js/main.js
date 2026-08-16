/* PhysioFabrik — Richtung 1b
   Wenig JS mit Absicht: Overlay-Menü, Formularvalidierung, Jahreszahl.
   Die Seite funktioniert ohne JS vollständig (native Validierung greift dann). */

(function () {
  "use strict";

  /* --- Overlay-Menü ------------------------------------------------------ */

  var menu = document.getElementById("menu");
  var openBtn = document.getElementById("menu-open");
  var closeBtn = document.getElementById("menu-close");

  if (menu && openBtn && closeBtn) {
    var openMenu = function () {
      menu.hidden = false;
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-locked");
      closeBtn.focus();
      document.addEventListener("keydown", onKeydown);
    };

    var closeMenu = function (returnFocus) {
      menu.hidden = true;
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKeydown);
      if (returnFocus !== false) openBtn.focus();
    };

    var onKeydown = function (e) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      // Fokus im Overlay halten
      var items = menu.querySelectorAll("a[href], button");
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", function () {
      closeMenu();
    });

    // Sprungmarke angeklickt -> Menü schließen, Fokus beim Ziel lassen
    menu.querySelectorAll('.menu__nav a, .menu__foot a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    // Beim Wechsel auf Desktop-Breite schließen
    var desktop = window.matchMedia("(min-width: 1024px)");
    var onBreakpoint = function (e) {
      if (e.matches && !menu.hidden) closeMenu(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
    else desktop.addListener(onBreakpoint);
  }

  /* --- Formular ---------------------------------------------------------- */

  var form = document.getElementById("kontaktformular");

  if (form) {
    var status = document.getElementById("form-status");

    var meldungen = {
      name: {
        valueMissing: "Bitte tragen Sie Ihren Namen ein."
      },
      telefon: {
        valueMissing: "Bitte tragen Sie eine Telefonnummer für den Rückruf ein.",
        typeMismatch: "Diese Telefonnummer sieht nicht gültig aus.",
        custom: "Bitte tragen Sie eine gültige Telefonnummer ein."
      },
      email: {
        typeMismatch: "Diese E-Mail-Adresse sieht nicht gültig aus."
      },
      anliegen: {
        valueMissing: "Bitte beschreiben Sie kurz Ihr Anliegen."
      },
      datenschutz: {
        valueMissing: "Ohne Ihre Einwilligung dürfen wir die Anfrage nicht bearbeiten."
      }
    };

    var fehlerFeld = function (feld) {
      var beschreibung = feld.getAttribute("aria-describedby");
      return beschreibung ? document.getElementById(beschreibung) : null;
    };

    var texteFuer = function (feld) {
      var t = meldungen[feld.name] || {};
      if (feld.validity.valueMissing) return t.valueMissing || "Bitte füllen Sie dieses Feld aus.";
      if (feld.validity.typeMismatch) return t.typeMismatch || "Bitte prüfen Sie diese Eingabe.";
      if (feld.validity.customError) return t.custom || feld.validationMessage;
      return feld.validationMessage || "Bitte prüfen Sie diese Eingabe.";
    };

    // Telefon: mindestens 6 Ziffern, sonst ist das kein Rückrufweg
    var pruefeTelefon = function (feld) {
      var ziffern = (feld.value.match(/\d/g) || []).length;
      feld.setCustomValidity(
        feld.value.trim() !== "" && ziffern < 6 ? "zu kurz" : ""
      );
    };

    var zeigeFehler = function (feld) {
      if (feld.name === "telefon") pruefeTelefon(feld);

      var ziel = fehlerFeld(feld);
      var ok = feld.checkValidity();

      if (ok) {
        feld.removeAttribute("aria-invalid");
        if (ziel) ziel.textContent = "";
      } else {
        feld.setAttribute("aria-invalid", "true");
        if (ziel) ziel.textContent = texteFuer(feld);
      }
      return ok;
    };

    var felder = form.querySelectorAll("input[name], textarea[name]");

    felder.forEach(function (feld) {
      if (feld.name === "website") return; // Honeypot nicht validieren

      feld.addEventListener("blur", function () {
        if (feld.value !== "" || feld.hasAttribute("required")) zeigeFehler(feld);
      });

      // Nach dem ersten Fehler live korrigieren
      feld.addEventListener("input", function () {
        if (feld.getAttribute("aria-invalid") === "true") zeigeFehler(feld);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: still verwerfen, Bots bekommen keine Rückmeldung
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value !== "") return;

      var ersterFehler = null;

      felder.forEach(function (feld) {
        if (feld.name === "website") return;
        if (!zeigeFehler(feld) && !ersterFehler) ersterFehler = feld;
      });

      if (ersterFehler) {
        if (status) {
          status.dataset.state = "";
          status.textContent = "";
        }
        ersterFehler.focus();
        return;
      }

      /* TODO Mailversand:
         Hier den POST an den Mail-Endpoint einsetzen (z. B. Cloudflare Worker,
         Netlify Function oder eigenes PHP-Skript in der EU). Bis dahin nur Hinweis. */
      if (status) {
        status.dataset.state = "todo";
        status.textContent =
          "Der Formularversand ist noch nicht angeschlossen. " +
          "Bitte rufen Sie uns an oder schreiben Sie an physio.fabrik@outlook.de.";
      }
    });
  }

  /* --- Hero: Raster folgt dem Zeiger -------------------------------------
     Schreibt nur zwei Custom Properties; das Aussehen steckt komplett im
     CSS (.hero::after). Faellt das hier aus, bleibt der Hero wie zuvor.
     Ausgelassen bei Touch und bei reduzierter Bewegung. */

  var hero = document.querySelector(".hero");
  var feinerZeiger = window.matchMedia("(hover: hover) and (pointer: fine)");
  var wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (hero && feinerZeiger.matches && !wenigerBewegung.matches) {
    var x = 0;
    var y = 0;
    var angefordert = false;

    var schreibePosition = function () {
      angefordert = false;
      hero.style.setProperty("--mx", x + "px");
      hero.style.setProperty("--my", y + "px");
    };

    hero.addEventListener("pointermove", function (e) {
      // Nur echte Zeiger — ein Finger soll kein Licht anmachen
      if (e.pointerType === "touch") return;

      var box = hero.getBoundingClientRect();
      x = e.clientX - box.left;
      y = e.clientY - box.top;
      hero.classList.add("is-lit");

      // Pro Frame einmal schreiben, nicht pro Mausereignis
      if (!angefordert) {
        angefordert = true;
        window.requestAnimationFrame(schreibePosition);
      }
    });

    hero.addEventListener("pointerleave", function () {
      hero.classList.remove("is-lit");
    });
  }

  /* --- Leistungszeilen: Aufklappen animieren -----------------------------
     <details> klappt von Haus aus hart um, und keine der CSS-Loesungen
     laeuft in beiden Engines (siehe Kommentar in style.css). Deshalb hier
     ueber die Web Animations API. Reine Zutat: ohne dieses Skript klappen
     die Zeilen nativ auf und zu, nur eben ohne Fahrt. */

  var akkordeons = document.querySelectorAll(".rows--acc details");

  if (akkordeons.length && !wenigerBewegung.matches) {
    var DAUER = 240;
    /* Nicht ease-out: das kriecht am Ende in Sub-Pixel-Schritten, und genau
       dort faellt jede Textumbruch-Neuberechnung als Stocken auf. Diese
       Kurve kommt zuegig an und bleibt bis zum Schluss in Bewegung. */
    var KURVE = "cubic-bezier(0.32, 0.72, 0, 1)";

    akkordeons.forEach(function (details) {
      var inhalt = details.querySelector(".rows__text");
      var knopf = details.querySelector("summary");
      if (!inhalt || !knopf) return;

      var laufend = null;
      var faehrtZu = false;

      var aufraeumen = function () {
        inhalt.style.height = "";
        inhalt.style.paddingBottom = "";
        inhalt.style.overflow = "";
      };

      var wechsle = function (oeffnen) {
        if (laufend) {
          laufend.cancel();
          laufend = null;
        }

        // Vor dem Messen alle eigenen Inline-Werte raeumen, sonst misst man
        // den Zwischenstand einer abgebrochenen Fahrt.
        aufraeumen();

        /* Das Polster muss mitfahren. Bei box-sizing: border-box — global
           gesetzt — kann eine Box nicht unter ihr eigenes Polster schrumpfen:
           height: 0 ergibt bei padding-bottom: 24px eine 24px hohe Box. Die
           Fahrt endete also bei 24px, und die verschwanden erst schlagartig
           mit open = false. Das war das Hacken kurz vorm Zuklappen. */
        var polster = window.getComputedStyle(inhalt).paddingBottom;

        var start;
        var ziel;

        if (oeffnen) {
          // Erst oeffnen, sonst ist die Zielhoehe nicht messbar
          details.open = true;
          start = 0;
          ziel = inhalt.offsetHeight;
        } else {
          start = inhalt.offsetHeight;
          ziel = 0;
        }

        faehrtZu = !oeffnen;
        inhalt.style.overflow = "hidden";

        /* Hoehe, Polster UND Deckkraft. Die Hoehe allein sieht hakelig aus,
           weil beim Zusammenfahren die Textzeilen einzeln unter die
           Klippkante rutschen. Die Deckkraft laeuft auf dem Compositor,
           kostet also nichts, und verdeckt genau dieses Zeilenspringen. */
        var fahrt = inhalt.animate(
          {
            height: [start + "px", ziel + "px"],
            paddingBottom: oeffnen ? ["0px", polster] : [polster, "0px"],
            opacity: oeffnen ? [0, 1] : [1, 0]
          },
          { duration: DAUER, easing: KURVE }
        );
        laufend = fahrt;

        /* Basiswerte gleich den Zielwerten setzen — und zwar erst jetzt, wo
           die laufende Animation sie ohnehin ueberschreibt. Ohne das faellt
           das Element in dem Frame, in dem die Animation endet, auf seine
           natuerlichen Werte zurueck, bevor open = false greift. */
        inhalt.style.height = ziel + "px";
        inhalt.style.paddingBottom = oeffnen ? polster : "0px";

        fahrt.addEventListener("finish", function () {
          // Erst am Ende der Fahrt wirklich schliessen, sonst waere der
          // Text schon im ersten Frame weg
          if (!oeffnen) details.open = false;
          aufraeumen();
          faehrtZu = false;
          laufend = null;
        });

        fahrt.addEventListener("cancel", function () {
          // cancel() meldet sich verzoegert. Hat inzwischen eine neue Fahrt
          // uebernommen, darf hier nichts mehr zurueckgesetzt werden.
          if (laufend !== fahrt) return;
          aufraeumen();
          faehrtZu = false;
          laufend = null;
        });
      };

      knopf.addEventListener("click", function (e) {
        // Natives Umschalten abloesen; Enter und Leertaste auf dem
        // <summary> loesen ebenfalls ein click aus, Tastatur bleibt also
        // bedienbar.
        e.preventDefault();

        // Waehrend einer laufenden Schliessfahrt ist details.open noch
        // true — ein Klick dort hinein meint trotzdem "wieder aufklappen".
        wechsle(!details.open || faehrtZu);
      });
    });
  }

  /* --- Jahreszahl im Footer ---------------------------------------------- */

  var jahr = document.getElementById("jahr");
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
