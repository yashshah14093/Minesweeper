
function make2DArray(rows,cols) {
	// body...
	var arr = new Array(rows);
	for(var i=0;i<rows;i++){
		arr[i] = new Array(cols);
	}
	return arr;
}


var grid;
var cols;
var rows;
var w = 45;


function setup() {
	// body...
	createCanvas(451,451);
	cols = floor(450/w);
	rows = floor(450/w);
	grid = make2DArray(rows,cols);
	
	for(var i=0;i<rows;i++){
		for(var j=0;j<cols;j++){
			grid[i][j] = new Cell(i,j,w);
		}
	}

	// Bombs Placement
	var numOfBombs = 18;

	var array = [];
	for(var i=0;i<cols;i++){
		for(var j=0;j<rows;j++){
			array.push([i,j]);
		}
	}



	for(var k=0;k<numOfBombs;k++){
		var index = floor(random(array.length));
		var choice = array[index];
		array.splice(index,1);
		var x = choice[0];
		var y = choice[1];
		grid[x][y].bomb = true;
	}

	for(var i=0;i<rows;i++){
		for(var j=0;j<cols;j++){
			grid[i][j].countBombs();
		}
	}
}



function gameover() {
	// body...
	for(var i=0;i<cols;i++){
		for(var j=0;j<rows;j++)
		{
			grid[i][j].visited = true;
		}
	}
}



function mousePressed() {
	// body...
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if(grid[i][j].contains(mouseX,mouseY)){
				grid[i][j].visit();
				if(grid[i][j].bomb === true){
					gameover();
					console.log(i+" "+j);
				}
			}
		}
	}
}



function draw() {
	// body...
	background(0);
	for(var i=0;i<rows;i++){
		for(var j=0;j<cols;j++){
			grid[i][j].show();
		}
	}
}


