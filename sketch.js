//Tahle fuknce zajišťuje počet sloupců a řádků
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
//Globální proměnné do všech souborů js
var grid;
var cols;
var rows;
var w = 50;
var totalMines = 40;
var canvas;
var h2;
var h3;


//Hlavní funkce kde se odehrává v podstarě uplně všechno
function setup() {
  canvas = createCanvas(601, 601);
  canvas.position(450);
  h2 = createElement("h2", ["Klasická hra miny jak ji všichni dobře známe. Odhal všechny pole kde nejsou miny. Když na jednu šlápneš musíš dát refresh(f5) pro novou hru. GL :D"])
  h2.position(1070);
//výpočet kolik bude řádků a sloupců
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols,rows);
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j] = new Cell(i,j,w);
    }
  }
//projede všechny políčka a zjišťuje zda-li je políčko prázdné nebo zabrané
var options = [];
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      options.push([i, j]);
    }
  }
  
  //Tahle funkce zajišťuje pozici min a to že nmůžou být dvě na stejném místě
  for (var n = 0; n < totalMines; n++){
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid[i][j].mine = true;
  }
//projede všechny pollíčka a zjistí kolik je min
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j].countMines();
    }
  }
}
//Tady je to že pokud kliknu na minu tak se odhalí všechny políčka
function gameOver(){
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j].revealed = true;
    }
  }
}
//Po kliku myší se odhalí pole na které kliknu je to díky téhle funkci
function mousePressed() {
   for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
     if(grid[i] [j].contains(mouseX,mouseY)){
       grid[i][j].reveal();
       
       if(grid[i][j].mine){
         gameOver();
       }
     }
    }
  }
  
}

//tahle fuknce ukazuje tu mřížku
function draw() {
  background(160);
   for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i] [j].show();
    }
  }
}