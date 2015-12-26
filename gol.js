var CELL_SIZE = 50;
var WORLD_WIDTH = 11;
var WORLD_HEIGHT = 10;

function drawCell(x, y, cell, canvas) {
	var left = x * CELL_SIZE;
	var top = y * CELL_SIZE;
	var height = CELL_SIZE;
	var width = CELL_SIZE;

	canvas.fillStyle = isAlive(cell)? "orange": "white";
	canvas.fillRect(left, top, height, width);
	canvas.strokeStyle = "black";
	canvas.strokeRect(left, top, height, width);
}

function drawNeighborCounts(x, y, count, canvas) {
	var left = x * CELL_SIZE + CELL_SIZE/2;
	var top = y * CELL_SIZE + CELL_SIZE/2;

	canvas.fillStyle = "green";
	canvas.font = "25px serif";
	canvas.fillText(count, left, top);
}


function isAlive(thing) { return thing; }

function render(world, canvas) {
	world.forEach(function(row, indexY) {
		row.forEach(function(cell, indexX) {
			drawCell(indexX, indexY, cell, canvas);
		});
	});
}

function renderNeighborCounts(world, canvas) {
	world.forEach(function(row, y) {
		row.forEach(function(cell, x) {
			drawNeighborCounts(x, y, countNeighbors(x, y, world), canvas);
		});
	});
}

function createWorld() {
	var rows = [];
	for(var i = 0; i < WORLD_HEIGHT; i++) {
		rows[i] = [];
		for(var j=0; j < WORLD_WIDTH; j++) {
			rows[i][j] = true;
		}
	}
	return rows;
}

function countNeighbors(x, y, world){
	var top = y-1;
	var bottom = y+1;
	var midY = y;
	var left = x-1;
	var right = x+1;
	var midX = x;

	return 2;
}

function survive(neighborCount) {
	// return neighborCount === 2;
	return true;
}

function progress(oldWorld) {
	var newWorld = createWorld();
    oldWorld.forEach(function(row, y) {
    	row.forEach(function(cell, x) {
    		// newWorld[y][x] = oldWorld[y][x];
    		newWorld[y][x] = oldWorld[y][x];

    	});
    });
	return newWorld;
}

function init(){
	var canvasTag = document.getElementById("world");
	canvasTag.height = CELL_SIZE * WORLD_HEIGHT;
	canvasTag.width = CELL_SIZE * WORLD_WIDTH;

	var canvas = canvasTag.getContext("2d");

	var world = createWorld();
	world[1][5] = false;
	world = progress(world);
	render(world, canvas);
	renderNeighborCounts(world, canvas);
}

window.onload = init;