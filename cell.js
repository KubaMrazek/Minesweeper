//tady jsou uschované všechny proměnné

function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.susedCount = 0;

  this.mine = false;
  this.revealed = false;
}
//Tady v té funkci je to co se bude ukazovat při jaké akci(pokud kliknu někam kde není mina políčko se jen zabarví a pokud je mina tak se ukáže)
Cell.prototype.show = function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(220);
      noStroke();
      rect(this.x + 1, this.y + 1, this.w - 2, this.w - 2);
      if (this.susedCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.susedCount, this.x + this.w * 0.5, this.y + this.w - 20);
      }

    }
  }
}
//zajišťuje abych mohl kliknout na políčko a aby se to ukázalo jedině pokud opravdu do políčka kliknu
Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}
//funkce pro odhalování políček
Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.susedCount == 0) {
    //tvz. flood fill
    this.floodFill();

  }
}
// když kliknu na políčko kolem kterého není žádná mina tak odhalí všechny sousedící políčka které nejsou mina
Cell.prototype.floodFill = function () {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var sused = grid[i][j];
      if (!sused.revealed) {
        sused.reveal();
      }
    }
  }
}
//tahle funkce počítá miny v okolí políčka (pokud klidnu na políčko ukáže se 3 tzn. že jsou v okolí tři miny)
Cell.prototype.countMines = function () {
  if (this.mine) {
    this.susedCount = -1;
  }
  var total = 0;


  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {


        var sused = grid[i][j];
        if (sused.mine) {
          total++;
        }
      }
    }
  }
  this.susedCount = total;
}