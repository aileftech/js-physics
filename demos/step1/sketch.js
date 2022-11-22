/**
 * Canvas width and height in pixels
 */
const WIDTH = 500;
const HEIGHT = 500;

let engine = Engine();

function setup() {
	noStroke();
	let c = createCanvas(WIDTH, HEIGHT);

	c.mousePressed(function () {
		engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY);
	});
}

/**
 * This method is the main rendering loop of p5js and gets called to draw every frame.
 * We reset the background and then just use p5js to draw a circle for each body, according
 * to its parameters (color).
 */
function draw() {
	background(255);

	for (let body of engine.bodies) {
		fill(body.color);
		ellipse(body.position.x, body.position.y, body.radius * 2, body.radius * 2);
	}
}
