var CELL_SIZE = 50;
var WORLD_WIDTH = 11;
var WORLD_HEIGHT = 10;
var DEAD = false;
var LIVE = true;

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


function isAlive(thing) { return thing === LIVE; }

function render(world, canvas) {
	world.forEach(function(x, y, cell) {
	  drawCell(x, y, cell, canvas);
	});
}

function renderNeighborCounts(world, canvas) {
	world.forEach(function(x, y, cell) {
		drawNeighborCounts(x, y, countNeighbors(x, y, world), canvas);
	});
}

function createWorld(width, height) {
	var rows = [];
	for(var i = 0; i < height; i++) {
		rows[i] = [];
		for(var j=0; j < width; j++) {
			rows[i][j] = LIVE;
		}
	}
	return {
		width: width,
		height: height,
		get: function(x, y) {
			if(rows[y] === undefined || rows[y][x] === undefined) {
				return DEAD;
			}
			return rows[y][x];
		},
		set: function(x, y, heartbeat) {
			rows[y][x] = heartbeat;
		},
		forEach: function(fn) {
			rows.forEach(function(row, y) {
				row.forEach(function(cell, x) {
					fn(x, y, cell);
				});
			});
		}
	};
}

function countNeighbors(x, y, world){
	var top = y-1;
	var bottom = y+1;
	var midY = y;
	var left = x-1;
	var right = x+1;
	var midX = x;

	var add = function(a, b) {
		return a + b;
	}

	return [
		world.get(left, top),
		world.get(left, midY),
		world.get(left, bottom),
		world.get(midX, top),
		world.get(midX, bottom),
		world.get(right, top),
		world.get(right, midY),
		world.get(right, bottom),
	].map(x => isAlive(x) ? 1 : 0).reduce(add, 0);
}

function survive(neighborCount) {
	return LIVE;
}

function progress(oldWorld) {
	var newWorld = createWorld(oldWorld.width, oldWorld.height);
	oldWorld.forEach(function(x, y, cell) {
		newWorld.set(x, y, cell);
	});
	return newWorld;
}

function init(){
	var canvasTag = document.getElementById("world");
	canvasTag.height = CELL_SIZE * WORLD_HEIGHT;
	canvasTag.width = CELL_SIZE * WORLD_WIDTH;

	var canvas = canvasTag.getContext("2d");

	var world = createWorld(WORLD_WIDTH, WORLD_HEIGHT);
	world.set(5, 1, DEAD);
	world = progress(world);
	render(world, canvas);
	renderNeighborCounts(world, canvas);
}

window.onload = init;