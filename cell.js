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

Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.susedCount == 0) {
    //tvz. flood fill
    this.floodFill();

  }
}

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