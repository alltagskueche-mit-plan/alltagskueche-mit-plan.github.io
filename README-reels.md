# Rezepte aus den Reels

Kurzanleitung für die Übersicht unter `/reels/`.
Stand: 22.11.2026, Europe/Vienna.

Die Seite ist das gemeinsame Ziel der Bio-Links (Instagram und TikTok, jeweils mit `?src=`).
Pinterest-Pins zeigen weiter direkt auf den jeweiligen Plan, nicht auf diese Übersicht.

## Einen neuen Plan ergänzen

1. Die Plan-Unterseite anlegen, zum Beispiel `/plan/neuer-slug/index.html` (Aufbau wie `/plan/sonntag-vier-schritte/`).
2. Ein Vorschaubild ins Verzeichnis `assets/img/reels/` legen (JPG und nach Möglichkeit WebP, nur eigenes Material oder bereits freigegebene Reel-Standbilder). Dateiname zum Beispiel `plan-02-kurzname.jpg`.
3. In `reels/reels.json` einen neuen Eintrag anlegen, mit der nächsten freien `nr` und dem Datum des Reels (`YYYY-MM-DD`). Die Seite sortiert automatisch neuestes Datum bzw. höchste Nummer nach oben.
4. Dieselbe Karte zusätzlich in `reels/index.html` einfügen:
   - im eingebetteten Block `#reels-data` (Fallback ohne Abruf von `reels.json`)
   - und als sichtbare HTML-Karte in `#reels-list` (damit die Seite auch ohne JavaScript vollständig ist)
5. Bildnachweis in der Fußzeile von `reels/index.html` ergänzen, falls das neue Bild eine Quellenangabe braucht.
6. Auf der neuen Plan-Seite oben den Link „Alle Rezepte aus den Reels“ setzen (`../../reels/`, mit `data-keep-src`).
7. Lokal mit einem einfachen HTTP-Server prüfen (nicht über `file://`, sonst lädt `reels.json` nicht), danach committen und pushen.

Felder in `reels.json`:

- `nr`, `titel`, `slug`, `datum`, `datum_anzeige`
- `beschreibung` (ein Satz)
- `bild`, `bild_webp`, `bild_breite`, `bild_hoehe`, `bild_alt`, `bildnachweis`
- `plan_url` (relativ zu `/reels/`, zum Beispiel `../plan/sonntag-vier-schritte/`)

`?src=tiktok`, `?src=instagram` oder `?src=pinterest` darf an der URL hängen bleiben. Die statische Seite ignoriert den Parameter; `assets/js/amazon-links.js` und `assets/js/reels-list.js` erhalten ihn auf internen Links mit `data-keep-src`.

## Bio-Links

- Instagram: `https://alltagskueche-mit-plan.github.io/reels/?src=instagram`
- TikTok (Website-Feld, falls vorhanden): `https://alltagskueche-mit-plan.github.io/reels/?src=tiktok`

In den Reel-Beschreibungen reicht der Hinweis „Plan Nr. … über den Link in meinem Profil“.
