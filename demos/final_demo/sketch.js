const WIDTH = 700;
const HEIGHT = 700;

var lastUpdate = Date.now();

let engine = Engine(WIDTH, HEIGHT);

function setup() {
	noStroke();

	let c = createCanvas(WIDTH, WIDTH);

	for (let i = 0; i < 6; i++) {
		let numBodies = 7 + parseInt(Math.random() * 9);
		let noise = Math.random() * 60 - 30;
		createFixedBodies(numBodies, new Vector(30 + i*100, 140 + noise), true);
		createFixedBodies(numBodies, new Vector(70 + i*100, 240 + noise), true);
	}
	
	createFixedBodies(18, new Vector(40, 440));
	createFixedBodies(12, new Vector(370, 440));
	createFixedBodies(18, new Vector(160, 540), false, -1);
	createFixedBodies(12, new Vector(510, 540), false, -1);

	c.mousePressed(function() {
		let num = parseInt(document.getElementById('numBodies').value);
		for (let i = 0; i < num; i++) {
			engine.createCircle(
				5 + Math.random() * 10, 
				mouseX + Math.random() * 60 - 30,
				mouseY + Math.random() * 60 - 30, 
				{
					color: PALETTE[parseInt(Math.random() * PALETTE.length)]
				}
			);
		}
	});
}

function createFixedBodies(maxBodies, startPosition, onlyFirstFixed=false, sign=1) {
	let radius = 5;
	let previousPoint = startPosition;
	let countCreated = 0;
	let luminance = 50;
	
	for (let i = 0; i < 350; i += 0.1) {
		let currentPoint = new Vector(startPosition.x + i, startPosition.y - Math.sin(i / 80) * 30 * sign);
		let diff = currentPoint.sum(previousPoint.mult(-1));
		
		if (diff.length() > radius * 2) {
			let isFixed = onlyFirstFixed ? countCreated == 0 : true;
			luminance += 3;
			if (luminance > 80) luminance = 80;
			let currentColor = color(`hsl(217, 100%, ${luminance}%)`);

			engine.createCircle(
				radius, 
				currentPoint.x, 
				currentPoint.y, 
				{
					fixed: isFixed,
					color: isFixed ? "#999" : currentColor
				}
			);
			previousPoint = currentPoint;
			countCreated++;

			if (countCreated > 1) {
				let offset = engine.bodies.length;
				engine.createJoint(offset - 1, offset - 2, radius*2);
			}
		}

		if (countCreated == maxBodies)
			return;
	}

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
