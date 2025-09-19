class Expense {
    constructor(svg, x, y, height, width, color, label, spacing) {
      this.form = SVG(svg, "rect", {});
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.color = color;
      this.label = label;
      this.spacing = spacing;
    }
  
    draw() {
      // Dessiner le rectangle (la barre)
      setattr(this.form, {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        fill: this.color
      });
  
      // Affichage d’un petit texte au survol
      this.form.onmousemove = function (event) {
        let texte = this.label + " : " + this.height + " €";
        zeigeTooltip(texte, event);
      }.bind(this);
  
      this.form.onmouseleave = function () {
        versteckeTooltip();
      };
    }
  }
  