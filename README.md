# 📊 Ausgaben-Diagramm (Proportional Area / “Squares”) – README

Ein kleines Visualisierungsprojekt, das studentische Monats­ausgaben als proportionale Rechtecke in einer SVG-Grafik darstellt.

---

## Ziel des Projekts

Ziel ist es, die **monatlichen Ausgaben eines Studenten** mithilfe eines **Proportional Area Charts (Quadrate/Rechtecke)** anschaulich zu visualisieren.

---

## Projektstruktur

```
.
├── expencediagram.html       # Einstiegspunkt (lädt Skripte & Styles)
├── ExpenseChart.js           # Chart-Logik (Layout, Kennzahlen, Rendering)
├── Expense.js                # Rechteck-/Tooltip-Komponente
├── svgg.js                   # Kleine SVG-Helferfunktionen
├── Expensediagram.css        # Styles (Hintergrund etc.)   ← siehe Hinweis unten
└── data.csv                  # Beispieldaten (CSV)
```

> **Hinweis:** In `expencediagram.html` wird aktuell `zweiteVersion.css` referenziert. Die mitgelieferte Datei heißt jedoch `Expensediagram.css`. Bitte den Link im HTML anpassen oder die CSS-Datei umbenennen (siehe Abschnitt **Bekannte Abweichungen**).

---

## Technologien

* **HTML5**
* **CSS3**
* **JavaScript**
* **SVG**
* **CSV-Datenverarbeitung (FileReader im Browser)**

---

## Installation & Start

Es ist **keine** Build-Toolchain nötig.

1. Stelle sicher, dass alle Dateien im gleichen Ordner liegen.
2. Öffne die Datei **`expencediagram.html`** direkt im Browser *(Doppelklick)*.

   * Alternativ über einen lokalen Server (empfohlen für strengere Browser-Sicherheitsrichtlinien).
3. Klicke auf **„Datei hochladen“** und wähle deine **CSV**.

> Unterstützte Browser: aktuelle Versionen von Chrome, Edge, Firefox, Safari.

---

## CSV-Format

* **Trennzeichen:** Semikolon `;`
* **Spalten:** `Kategorie;Betrag;Farbe`
* **Reihenfolge:** Kopfzeile gefolgt von beliebig vielen Datensätzen
* **Farben:** Hex-Farben (z. B. `#f3722c`)

**Beispiel (aus der Aufgabenbeschreibung):**

```
Kategorie;Betrag;Farbe
Miete;500;#f94144
Lebensmittel;350;#f3722c
Transport;58;#f8961e
Freizeit;150;#90be6d
Versicherung;250;#577590
```

**Beispiel (mitgelieferte `data.csv`):**

```
kategorie;       betrag;        farbe;
Miete;            100;    #f9ff44;
Lebensmittel;     350;    #f3722c;
Transport;        58;     #f8961e;
Freizeit;         150;     #90be6d;
Versicherung;     250;    #577590;
```

> **Wichtig:**
>
> * Leerzeichen um Werte werden toleriert und per `trim()` entfernt.
> * Achte auf **eine** Kopfzeile. Zusätzliche Semikolons am Zeilenende sind unschädlich, sollten aber nach Möglichkeit entfernt werden.
> * Dezimaltrennzeichen: Punkt `.` (z. B. `58.5`), nicht Komma.

---

## Funktionsweise

1. **Datenerfassung**

   * Die CSV wird im Browser über den **FileReader** eingelesen.
   * Jede Zeile enthält **Kategorie**, **Betrag**, **Farbe**.

2. **Visualisierung**

   * Rendering mit **JavaScript + SVG**.
   * Für jede Ausgabe wird ein **Rechteck** gezeichnet.
   * **Höhe = Betrag** (Pixel). Der größte Betrag bestimmt die maximale Spaltenhöhe. Kleinere Beträge werden **proportional** dargestellt.

3. **Layout-Logik (Spalten)**

   * Rechtecke werden **von oben nach unten** in Spalten gesetzt.
   * Ist die Spalte „voll“ (Summe der Höhen + Abstände > maximale Höhe), beginnt **rechts** eine neue Spalte.
   * **Farbe** pro Kategorie gemäß CSV.

4. **Interaktion**

   * **Tooltip** beim Hover: `„Kategorie : Betrag €“`.

5. **Kennzahlen**

   * Neben der Grafik werden automatisch angezeigt:

     * **Summe** aller Ausgaben
     * **Minimum** (kleinster Betrag)
     * **Maximum** (größter Betrag)

---

## Bedienung

1. Seite öffnen → **Datei hochladen**.
2. CSV auswählen → Diagramm wird **sofort** gezeichnet.
3. Mit der Maus über ein Rechteck fahren → **Tooltip** erscheint.

---

## Code-Überblick

* **`ExpenseChart.js`**

  * Sortiert Daten **absteigend** nach Betrag (Bubble-Sort).
  * Ermittelt **maximale Höhe**, **Summe**, **Minimum**, **Maximum**.
  * Steuert Spaltenfluss (`columnHeight`, `Width`, `spacing`).
  * Zeichnet Kennzahlen (Symbole + Text) rechts neben dem Chart.

* **`Expense.js`**

  * Erstellt ein SVG-`rect` mit `x`, `y`, `width`, `height`, `fill`.
  * Bindet **Mousemove/Mouseleave** für Tooltips.

* **`svgg.js`**

  * `SVG(parent, tag, attrs)` zum Anlegen von SVG-Elementen.
  * `setattr(el, attrs)` zum Setzen mehrerer Attribute.

* **`Expensediagram.css`**

  * Grundlegende Styles (u. a. **Hintergrundfarbe** für `svg`).

---

## Ergebnisse (laut Aufgabenbeschreibung)

* **Klare Infografik** der studentischen Ausgaben.
* Hervorgehobene Kennwerte:

  * **Summe:** `1558 €` *(für das Beispiel mit 500/350/58/150/250)*
  * **Minimum:** `58 €`
  * **Maximum:** `500 €`
* **Farbcodierung** macht Kategorien leicht unterscheidbar.

> **Hinweis:** In der mitgelieferten `data.csv` ist **Miete = 100** statt **500**. Dadurch ändern sich Summe/Maximum entsprechend. Die Kennzahlen berechnet das Skript **automatisch** aus deiner CSV.

---

## Anpassungen

* **Maximale SVG-Größe:** in `ExpenseChart`-Konstruktor (`width`, `height`) anpassen.
* **Spaltenbreite/Abstand:** `this.Width` / `this.spacing`.
* **Baseline (untere Ausrichtung):** `this.baseLine`.
* **Tooltips:** Textformat in `Expense.draw()`.

---

## Bekannte Abweichungen / To-dos

* **CSS-Dateiname:**
  In `expencediagram.html` wird `zweiteVersion.css` eingebunden, vorhanden ist `Expensediagram.css`.
  ➜ **Lösung:** Im `<head>` ändern zu

  ```html
  <link rel="stylesheet" href="Expensediagram.css" />
  ```

  *oder* die CSS-Datei umbenennen.
* **`lang`-Attribut im HTML:** aktuell `lang="en"`. Für Deutsch gerne zu `lang="de"` ändern.
* **CSV-Header-Schreibweise:** Code erwartet `Kategorie`, `betrag`, `farbe` (Case-Mix wird toleriert, führende/trailende Leerzeichen werden getrimmt). Einheitliche Kopfzeile empfohlen:

  ```
  Kategorie;Betrag;Farbe
  ```
* **Robustheit:** Für sehr große Datenmengen wäre ein effizienteres Sortierverfahren sinnvoll (statt Bubble-Sort).

---

## Kontakt

Fragen oder Verbesserungsvorschläge? Einfach melden 😊
