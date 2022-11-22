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
		"joints" : [],
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
			this.applyConstraints();
			this.checkCollisions();
			this.applyJoints();
			for (let body of this.bodies) {
				if (body.fixed) continue;

				body.update(dt);
				body.acceleration = new Vector(0, 200);
			}
			
		},
		"applyConstraints" : function() {
			/**
			 * The constraint in this demo are horizontal and vertical corresponding
			 * to the canvas edges. These can be implemented explicitly by checking
			 * the x and y coordinates of a body w.r.t. to the canvas width and height
			 * respectively, but also taking into account the body radius.
			 */
			for (let body of this.bodies) {
				if (body.position.x > width - body.radius)
					body.position.x = width  - body.radius;
				if (body.position.y > height - body.radius)
					body.position.y = height - body.radius;
				if (body.position.x < body.radius)
					body.position.x = body.radius;
				if (body.position.y < body.radius)
					body.position.y = body.radius;
			}
		},
		"applyJoints" : function() {
			for (let joint of this.joints) {
				let bodyA = this.bodies[joint.i];
				let bodyB = this.bodies[joint.j];
				
				let diff = bodyA.position.sum(bodyB.position.mult(-1));
				let dist = diff.length();

				if (dist > joint.distance) {
					let t = diff.mult(1 / dist);
					let delta = joint.distance - dist;
					if (!bodyA.fixed)
						bodyA.position = bodyA.position.sum(t.mult(0.5 * delta));
					if (!bodyB.fixed)
						bodyB.position = bodyB.position.sum(t.mult(-0.5 * delta));
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
		},
		"createJoint" : function(i, j, distance) {
			this.joints.push({i: i, j: j, distance: distance});
		}
	};
}