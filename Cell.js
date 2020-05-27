// Cell of MineSweeper Canvas

function Cell(i,j,w) {
	// body...
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.neighbourbomb = 0 ;
	this.bomb = false;
	this.visited = false;
}



Cell.prototype.show = function() {
	// body...
	fill(255);
	rect(this.x,this.y,this.w,this.w);

	if(this.visited == true){
		if(this.bomb){
			stroke(0);
			fill(51);
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
		}
		else{
			stroke(0);
			fill(204);
			rect(this.x,this.y,this.w,this.w);
			if(this.neighbourbomb > 0){
				textSize(40);
				fill(0);
				text(this.neighbourbomb,this.x+this.w*0.25,this.y+this.w*0.85);
			}
		}
	}
}



Cell.prototype.countBombs = function() {
	// body...
	if(this.bomb){
		this.neighbourbomb = -1;
	}

	var count = 0 ;
	for(var i=-1;i<=1;i++){
		for(var j=-1;j<=1;j++){
			var x = this.i + i;
			var y = this.j + j;
			if(x>=0 && x<cols && y>=0 && y<rows && grid[x][y].bomb){
				count = count + 1;
			}
		}
	}
	this.neighbourbomb = count;
};



Cell.prototype.floodFill = function() {
	// body...
	for(var i=-1;i<=1;i++){
		for(var j=-1;j<=1;j++){
			var x = this.i + i;
			var y = this.j + j;
			if(x>=0 && x<cols && y>=0 && y<rows){
				if(!grid[x][y].visited){
					grid[x][y].visit();
				}
			}
		}
	}
};


Cell.prototype.contains = function(x,y) {
	// body...
	if(x>this.x && x<this.x+this.w && y>this.y && y<this.y+this.w){
		return true;
	}
	return false;
};


Cell.prototype.visit = function() {
	// body...
	this.visited = true;
	if(this.neighbourbomb == 0){
		this.floodFill();
	}
};