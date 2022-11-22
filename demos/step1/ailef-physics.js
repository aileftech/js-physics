var Engine = function() {
	return {
		"bodies" : [],
		"createCircle" : function(radius, x, y) {
			let newCircle = {
				"radius" : radius,
				"position": new Vector(x, y),
				"previousPosition" : new Vector(x, y),
				"acceleration" : new Vector(0, 0),
				"color" : "#FF0000"
			};
			this.bodies.push(newCircle);
			return newCircle;
		},
	};
}