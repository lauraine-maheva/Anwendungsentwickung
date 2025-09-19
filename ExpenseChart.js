class ExpenseChart {
  constructor(data) {
    this.data = data;
    this.svg = SVG(document.body, "svg", { width: 1700, height: 1000, id: "SVG" });
    this.x = 100;
    this.baseLine = 700;
    this.Width = 160;
    this.spacing = 50;
    this.columnHeight = 0;
    this.maxHeight = 0;
    this.summe = 0;
    this.min = parseFloat(data[0].betrag);
    this.max = parseFloat(data[0].betrag);
  }

  sortieren() {
  for (let i = 0; i < this.data.length - 1; i++) {
    for (let j = 0; j < this.data.length - 1 - i; j++) {
      let montantA = parseFloat(this.data[j].betrag);
      let montantB = parseFloat(this.data[j + 1].betrag);

      if (montantA < montantB) {
        // Wir tauschen die Elemente aus
        let temp = this.data[j];
        this.data[j] = this.data[j + 1];
        this.data[j + 1] = temp;
      }
    }
  }
}


  maxBerechnen() {
  // On commence avec un maximum à 0
  //this.maxHeight = 0;

  // Durchlaufen jede Ausgabe in der Tabelle
  for (let d of this.data) {
    let montant = parseFloat(d.betrag);

    // Wenn dieseer Betrag größer als das aktuelle Maximum ist
    if (montant > this.maxHeight) {
      // neu max
      this.maxHeight = montant;
    }
  }
}

  zeichnen() {
    this.sortieren();//Daten vom größten zum kleinsten sortieren
    this.maxBerechnen();// maximale Höhe finden
    
    //alle Daten Durchlaufen(chaque depenses)
    for (let d of this.data) {
      let betrag = parseFloat(d.betrag);
      let height = betrag;//die Höhe der Rechteck entspricht der Betrag 

      this.summe += height; //summe berechnen
      if (betrag < this.min) this.min = height;//Kleiner Betrag
      if (betrag > this.max) this.max = height;//großer Betrag

      if (this.columnHeight + height + this.spacing > this.maxHeight) {
        this.x += this.Width + this.spacing;
        this.columnHeight = 0;
      }

      let y = this.baseLine - this.columnHeight - height;

      let bar = new Expense(
        this.svg,
        this.x,
        y,
        height,
        this.Width,
        d.farbe,
        d.Kategorie,
        this.spacing
      );
      bar.draw();

      this.columnHeight += height + this.spacing;
    }

    this.afficherInfos();
  }

  afficherInfos() {
    SVG(this.svg, "circle", { cx: 1300, cy: 55, r: 50, fill: "green" });
    SVG(this.svg, "circle", { cx: 1300, cy: 160, r: 50, fill: "red" });
    SVG(this.svg, "polygon", {
      points: "1300,145 1306,156 1318,156 1308,164 1312,176 1300,169 1288,176 1292,164 1282,156 1294,156",
      fill: "yellow"
    });
    SVG(this.svg, "circle", { cx: 1300, cy: 265, r: 50, fill: "yellow" });

    let offsetX = 1360;
    SVG(this.svg, "text", {
      x: offsetX, y: 55, fill: "black", "font-size": "30px"
    }).textContent = "Somme : " + this.summe + " €";

    SVG(this.svg, "text", {
      x: offsetX, y: 160, fill: "black", "font-size": "30px"
    }).textContent = "Minimum : " + this.min + " €";

    SVG(this.svg, "text", {
      x: offsetX, y: 265, fill: "black", "font-size": "30px"
    }).textContent = "Maximum : " + this.max + " €";
  }
}

function load() {
  let file = document.getElementById("inputfile").files[0];
  if (!file) return;

  let reader = new FileReader();
  reader.onload = function (data) {
    const text = data.target.result;
    const rows = text.split("\r\n");
    let Data = [];

    for (let i = 1; i < rows.length; i++) {
      const bar = rows[i].split(";");
      if (bar.length >= 3) {
        Data.push({
          Kategorie: bar[0].trim(),
          betrag: bar[1].trim(),
          farbe: bar[2].trim()
        });
      }
    }

    let chart = new ExpenseChart(Data);
    chart.zeichnen();
  };

  reader.readAsText(file);
}
//Wenn ich mit dem Maus über ein rechteck fahre
function zeigeTooltip(text, event) {
  const tooltip = document.getElementById("tooltip");
  const tooltipText = document.getElementById("tooltipText");

  tooltipText.textContent = text;
  //pour placer le toolip pres de la sourie  a 10 horizontalement et -25 verticalement
  tooltip.style.left = event.pageX + 10 + "px";
  tooltip.style.top = event.pageY - 25 + "px";
  tooltip.style.visibility = "visible";//pour afficher le cadre
}
//Versteckt das Tooltip wieder
function versteckeTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "hidden";//pour cacher le cadre
}