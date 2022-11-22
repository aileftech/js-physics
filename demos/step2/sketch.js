/**
 * Canvas width and height in pixels
 */
const WIDTH = 500;
const HEIGHT = 500;

var lastUpdate = Date.now();

let engine = Engine();

function setup() {
	noStroke();
	let c = createCanvas(WIDTH, HEIGHT);

	c.mousePressed(function () {
		engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY);
	});
}

function draw() {

	background(255);

	for (let body of engine.bodies) {
		fill(body.color);
		ellipse(body.position.x, body.position.y, body.radius * 2, body.radius * 2);
	}
	
	let delta = (Date.now() - lastUpdate) / 1000;
	engine.step(delta);
	lastUpdate = Date.now();
}
