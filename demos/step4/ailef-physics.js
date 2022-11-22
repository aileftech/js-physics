var bodyUpdate = function(dt) {
	let velocity = this.position.sum(this.previousPosition.mult(-1));
	this.previousPosition = this.position;
	this.position = this.position.sum(velocity).sum(this.acceleration.mult(dt * dt));
	this.acceleration = new Vector(0, 0);
}

var Engine = function(width, height) {
	return {
		"width" : width,
		"height" : height,
		"bodies" : [],
		"createCircle" : function(radius, x, y, options) {
			let newCircle = {
				"type" : "circle",
				"radius" : radius,
				"position": new Vector(x, y),
				"previousPosition" : new Vector(x, y),
				"acceleration" : new Vector(0, 0),
				"update" : bodyUpdate,
				"color" : "#FF0000",
				...options
			};
			this.bodies.push(newCircle);
			return newCircle;
		},
		"step" : function(dt) {
			for (let body of this.bodies) {
				body.acceleration = new Vector(0, 200);
				body.update(dt);
			}
			this.applyConstraints();
			this.checkCollisions();
		},
		"applyConstraints" : function() {
			let radius = this.width / 2 * 0.95;
			let center = new Vector(this.width / 2, this.height / 2);

			for (let body of this.bodies) {
				let diff = body.position.sum(center.mult(-1));
				let dist = diff.length();
				
				if (dist > radius - body.radius) {
					let t = diff.mult(1 / dist).mult(radius - body.radius);
					body.position = center.sum(t);
				}
			}
		},
		"checkCollisions" : function() {
			for (let i = 0; i < this.bodies.length; i++) {
				for (let k = 0; k < this.bodies.length; k++) {
					if (i == k) continue;

					let bodyA = this.bodies[i];
					let bodyB = this.bodies[k];

					let diff = bodyA.position.sum(bodyB.position.mult(-1));
					let dist = diff.length();

					if (dist < bodyA.radius + bodyB.radius) {
						let t = diff.mult(1 / dist);
						let delta = bodyA.radius + bodyB.radius - dist;
						if (!bodyA.fixed)
							bodyA.position = bodyA.position.sum(t.mult(0.5 * delta));
						if (!bodyB.fixed)
							bodyB.position = bodyB.position.sum(t.mult(-0.5 * delta));
					}
				}
			}
		}
	};
}