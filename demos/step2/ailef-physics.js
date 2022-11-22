var bodyUpdate = function(dt) {
	let velocity = this.position.sum(this.previousPosition.mult(-1));
	this.previousPosition = this.position;
	this.position = this.position.sum(velocity).sum(this.acceleration.mult(dt * dt));
	this.acceleration = new Vector(0, 0);
}

var Engine = function() {
	return {
		"bodies" : [],
		"createCircle" : function(radius, x, y) {
			let newCircle = {
				"radius" : radius,
				"position": new Vector(x, y),
				"previousPosition" : new Vector(x, y),
				"acceleration" : new Vector(0, 0),
				"update" : bodyUpdate,
				"color" : "#FF0000"
			};
			this.bodies.push(newCircle);
			return newCircle;
		},
		"step" : function(dt) {
			for (let body of this.bodies) {
				body.acceleration = new Vector(0, 200);
				body.update(dt);
			}
		},
	};
};