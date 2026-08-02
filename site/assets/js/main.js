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
          "Bitte rufen Sie uns an oder schreiben Sie an praxis@physiofabrik.de.";
      }
    });
  }

  /* --- Jahreszahl im Footer ---------------------------------------------- */

  var jahr = document.getElementById("jahr");
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
