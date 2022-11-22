/**
 * Canvas width and height in pixels
 */
const WIDTH = 500;
const HEIGHT = 500;

var lastUpdate = Date.now();


let engine = Engine(WIDTH, HEIGHT);

function setup() {
	let c = createCanvas(WIDTH, HEIGHT);
	noStroke();

	c.mousePressed(function () {
		engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY);
	});

	for (let i = 0; i < 10; i++) {
		engine.createCircle(DEFAULT_RADIUS, 40 + i*DEFAULT_RADIUS*2, 300, {fixed: i == 0 || i == 9});
		if (i > 0)
			engine.createJoint(i - 1, i, DEFAULT_RADIUS*2);
	}
}


function draw() {
	background(0);
	fill('#FFFFFF');
	ellipse(WIDTH/2, HEIGHT/2, WIDTH * 0.95, WIDTH * 0.95);

	for (let body of engine.bodies) {
		fill(body.color);
		ellipse(body.position.x, body.position.y, body.radius * 2, body.radius * 2);
	}

	let delta = (Date.now() - lastUpdate) / 1000;
	engine.step(delta);
	lastUpdate = Date.now();
}
